import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";

// User table for authentication
export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).notNull().default(false),
  image: text("image"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", { mode: "timestamp" }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", { mode: "timestamp" }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("token").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
});

// Portfolio table for projects
export const portfolio = sqliteTable("portfolio", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text("title").notNull(),
  category: text("category").notNull(), // e.g., Bangun Rumah, Desain Rumah, etc.
  imageUrl: text("image_url").notNull(),
  gallery: text("gallery"), // JSON array of additional image URLs
  description: text("description"),
  location: text("location"), // Physical location of the project
  year: text("year"), // Completion year
  createdAt: integer("created_at").notNull().$defaultFn(() => Date.now()),
  updatedAt: integer("updated_at").notNull().$defaultFn(() => Date.now()),
});

// Inquiry table for contact form submissions
export const inquiry = sqliteTable("inquiry", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  projectType: text("project_type"),
  serviceType: text("service_type"),
  budget: text("budget"),
  location: text("location"),
  designStyle: text("design_style"),
  message: text("message"),
  createdAt: integer("created_at").notNull().$defaultFn(() => Date.now()),
  updatedAt: integer("updated_at").notNull().$defaultFn(() => Date.now()),
});

// Blog table for articles
export const post = sqliteTable("post", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content"), // Optional for now, but good for future
  category: text("category").notNull(),
  author: text("author").notNull(),
  date: text("date").notNull(),
  imageUrl: text("image_url").notNull(),
  createdAt: integer("created_at").notNull().$defaultFn(() => Date.now()),
  updatedAt: integer("updated_at").notNull().$defaultFn(() => Date.now()),
});

// Testimonial table
export const testimonial = sqliteTable("testimonial", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  role: text("role").notNull(),
  comment: text("comment").notNull(),
  avatarUrl: text("avatar_url"),
  stars: integer("stars").notNull().default(5),
  createdAt: integer("created_at").notNull().$defaultFn(() => Date.now()),
  updatedAt: integer("updated_at").notNull().$defaultFn(() => Date.now()),
});

// Types for inferred types
export const siteSettings = sqliteTable("site_settings", {
  id: text("id").primaryKey().$defaultFn(() => "global"),
  siteName: text("site_name").notNull().default("Anugrah Jaya Desain"),
  email: text("email").notNull().default("tonygroup8111@gmail.com"),
  phone: text("phone").notNull().default("+62 851-0093-0009"),
  address: text("address").notNull().default("Jl. Adi Sucipto No.154, Surakarta"),
  whatsapp: text("whatsapp").notNull().default("6285100930009"),
  siteDescription: text("site_description"),
  keywords: text("keywords"),
  ogImage: text("og_image"),
  instagram: text("instagram"),
  facebook: text("facebook"),
  tiktok: text("tiktok"),
  youtube: text("youtube"),
  linkedin: text("linkedin"),
  updatedAt: integer("updated_at").notNull().$defaultFn(() => Date.now()),
});

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
export type Portfolio = typeof portfolio.$inferSelect;
export type NewPortfolio = typeof portfolio.$inferInsert;
export type Inquiry = typeof inquiry.$inferSelect;
export type NewInquiry = typeof inquiry.$inferInsert;
export type Post = typeof post.$inferSelect;
export type NewPost = typeof post.$inferInsert;
export type Testimonial = typeof testimonial.$inferSelect;
export type NewTestimonial = typeof testimonial.$inferInsert;
export type SiteSettings = typeof siteSettings.$inferSelect;