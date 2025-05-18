// app/api/generate-sitemap/route.ts
import { NextResponse } from 'next/server';
import { getSlugs } from '@/lib/db';
import fs from 'fs';
import path from 'path';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const SITEMAP_DIR = path.join(process.cwd(), 'public', 'sitemaps-services');
const MAX_URLS_PER_SITEMAP = 1000;

async function generateSitemap(slugs: string[], sitemapIndex: number) {
  const start = (sitemapIndex - 1) * MAX_URLS_PER_SITEMAP;
  const end = start + MAX_URLS_PER_SITEMAP;
  const sitemapSlugs = slugs.slice(start, end);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapSlugs
        .map((slug) => `
        <url>
          <loc>${BASE_URL}/services/${slug}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>`)
        .join('')}
    </urlset>`;

  const fileName = `sitemap-services-${sitemapIndex}.xml`;
  const filePath = path.join(SITEMAP_DIR, fileName);
  if (!fs.existsSync(SITEMAP_DIR)) {
    fs.mkdirSync(SITEMAP_DIR, { recursive: true });
  }
  fs.writeFileSync(filePath, sitemap);
  return `${BASE_URL}/sitemaps-services/${fileName}`;
}

async function generateSitemapIndex(sitemapUrls: string[]) {
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapUrls
        .map((url) => `
        <sitemap>
          <loc>${url}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
        </sitemap>`)
        .join('')}
    </sitemapindex>`;

  const filePath = path.join(SITEMAP_DIR, 'sitemap_index.xml');
  fs.writeFileSync(filePath, sitemapIndex);
  return `${BASE_URL}/sitemaps-services/sitemap_index.xml`;
}

export async function POST() {
  const slugs = await getSlugs();
  if (slugs.length === 0) {
    return NextResponse.json({ error: 'No slugs found' }, { status: 404 });
  }

  const totalSitemaps = Math.ceil(slugs.length / MAX_URLS_PER_SITEMAP);
  const sitemapUrls = [];

  for (let i = 1; i <= totalSitemaps; i++) {
    const sitemapUrl = await generateSitemap(slugs, i);
    sitemapUrls.push(sitemapUrl);
  }

  const sitemapIndexUrl = await generateSitemapIndex(sitemapUrls);
  return NextResponse.json({ success: true, sitemapIndex: sitemapIndexUrl });
}