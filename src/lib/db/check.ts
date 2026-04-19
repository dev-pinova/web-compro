import { db } from "./index";
import { inquiry } from "./schema";

async function check() {
  const data = await db.select().from(inquiry);
  console.log("Current inquiries in DB:", JSON.stringify(data, null, 2));
}

check().catch(console.error);
