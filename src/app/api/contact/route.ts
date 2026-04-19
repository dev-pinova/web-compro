import { NextResponse } from "next/server";
import { db, rawSqlite } from "@/lib/db";
import { inquiry } from "@/lib/db/schema";
import { sql } from "drizzle-orm";

export async function POST(request: Request) {
  const body = await request.json(); // Store body once
  try {
    console.log("Received Inquiry Payload:", body);
    const { name, email, phone, projectType, serviceType, budget, location, designStyle, message, website_url } = body;
    
    // 1. Honeypot check for bots
    if (website_url) {
      console.warn("Spam detected: Honeypot field filled.");
      return NextResponse.json({ success: true, message: "Inquiry received (spam filtered)." });
    }

    // 2. Data Sanitization & Basic Validation
    const cleanName = name?.trim().replace(/<[^>]*>?/gm, '');
    const cleanEmail = email?.trim().toLowerCase();

    if (!cleanName || !cleanEmail || !cleanEmail.includes("@")) {
      console.log("Validation Failed: Invalid name or email format");
      return NextResponse.json(
        { error: "Nama dan Email valid harus diisi." },
        { status: 400 }
      );
    }

    // Insert into database
    console.log("Inserting into database...");
    await db.insert(inquiry).values({
      name,
      email,
      phone,
      projectType,
      serviceType,
      budget,
      location,
      designStyle: Array.isArray(designStyle) ? designStyle.join(", ") : designStyle,
      message,
    });
    console.log("Insertion successful!");

    // Send Email Notification
    try {
      const { sendEmail, generateInquiryEmailTemplate } = await import("@/lib/email");
      const { siteSettings } = await import("@/lib/db/schema");
      
      const [settings] = await db.select().from(siteSettings);
      const adminEmail = settings?.email || "tonygroup8111@gmail.com";

      await sendEmail({
        to: adminEmail,
        subject: `[AJ-Inquiry] Proyek baru dari ${name}`,
        html: generateInquiryEmailTemplate(body),
      });
    } catch (emailErr) {
      console.error("Failed to send notification email:", emailErr);
      // We don't return error here because the DB insert was successful
    }

    return NextResponse.json({ success: true, message: "Inquiry berhasil dikirim." });
  } catch (error: any) {
    // Auto-migration for missing column
    const errorMsg = error.message || "";
    if (errorMsg.includes('service_type')) {
      try {
        console.log("API: Auto-migrating missing service_type column via raw driver...");
        if (rawSqlite) {
          rawSqlite.prepare('ALTER TABLE inquiry ADD COLUMN service_type TEXT').run();
        } else {
          await db.run(sql`ALTER TABLE inquiry ADD COLUMN service_type TEXT`);
        }
        
        // Retry insertion using stored body
        const { name, email, phone, projectType, serviceType, budget, location, designStyle, message } = body;
        await db.insert(inquiry).values({
          name,
          email,
          phone,
          projectType,
          serviceType,
          budget,
          location,
          designStyle: Array.isArray(designStyle) ? designStyle.join(", ") : designStyle,
          message,
        });
        return NextResponse.json({ success: true, message: "Inquiry berhasil dikirim setelah pembaruan database." });
      } catch (migError) {
        console.error("Auto-migration failed:", migError);
      }
    }

    console.error("Inquiry Error:", error);
    return NextResponse.json(
      { 
        error: "Terjadi kesalahan pada server.", 
        details: error.message || "Unknown error" 
      },
      { status: 500 }
    );
  }
}
