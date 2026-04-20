import { MetadataRoute } from 'next';
import { db } from '@/lib/db';
import { post } from '@/lib/db/schema';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.BETTER_AUTH_URL || 'http://localhost:3000';

  // Get all blog posts - using all columns for compatibility
  const posts = await db.select().from(post);

  const blogUrls = posts.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: new Date(p.updatedAt),
  }));

  const staticUrls = [
    '',
    '/about',
    '/portfolio',
    '/blog',
    '/contact',
    '/services',
    '/about/kata-mereka',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  return [...staticUrls, ...blogUrls];
}
