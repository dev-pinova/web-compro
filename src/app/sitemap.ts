import { MetadataRoute } from 'next';
import { db } from '@/lib/db';
import { post } from '@/lib/db/schema';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://anugrahjayadesain.com'; // Replace with real domain

  // Get all blog posts
  const posts = await db.select({ slug: post.slug, updatedAt: post.updatedAt }).from(post);

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
