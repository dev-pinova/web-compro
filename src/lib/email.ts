/**
 * Email Notification Service
 * 
 * To use this service with a real provider like Resend:
 * 1. npm install resend
 * 2. Add RESEND_API_KEY to your .env
 * 3. Uncomment the Resend code below
 */

// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailData {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailData) {
  console.log(`[Email Service] Mock sending email to: ${to}`);
  console.log(`[Email Service] Subject: ${subject}`);
  
  /**
   * REAL IMPLEMENTATION (Example with Resend):
   * 
   * try {
   *   await resend.emails.send({
   *     from: 'Anugrah Jaya Desain <notifications@yourdomain.com>',
   *     to,
   *     subject,
   *     html,
   *   });
   *   return { success: true };
   * } catch (error) {
   *   console.error("Email Error:", error);
   *   return { success: false, error };
   * }
   */

  return { success: true, mock: true };
}

export function generateInquiryEmailTemplate(data: any) {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
      <h2 style="color: #D4AF37;">Inquiry Proyek Baru</h2>
      <p>Ada calon klien baru yang menghubungi melalui website:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Nama</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.email}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Telepon</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.phone || '-'}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Tipe Proyek</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.projectType || '-'}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Lokasi</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.location || '-'}</td>
        </tr>
      </table>
      
      <p><strong>Pesan:</strong></p>
      <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #D4AF37;">
        ${data.message || 'Tidak ada pesan tambahan.'}
      </div>
      
      <div style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px; font-size: 12px; color: #888;">
        Email ini dikirim otomatis dari sistem Anugrah Jaya Desain CMS.
      </div>
    </div>
  `;
}
