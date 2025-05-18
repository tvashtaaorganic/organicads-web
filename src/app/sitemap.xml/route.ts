import { NextResponse } from 'next/server';

async function generateSitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'; // Replace with your site URL
  const staticPages = [
    '/',
    '/about',
    '/contactus',
    '/career-at-organicads',
    '/digital-marketing-agency-services-in-bangalore',
    '/seo-services-company-in-bangalore',
    '/ecommerce-services-company-in-bangalore',
    '/social-media-marketing-agency-in-bangalore',
    '/pay-per-click-ppc-management-company-in-bangalore',
    '/online-reputation-management-services-in-bangalore',
    '/website-design-services',
    '/website-development-services',
    '/wordpress-website-development-services',
    '/mobile-app-development-services',
    '/software-development-services',
    '/creative-graphics-design-services',
    '/seo-packages',
    '/web-design-development-packages',
    '/social-media-marketing-package',
    '/ppc-packages',
    '/ourclients',
    '/seo-results-from-organic-ads',
    '/get-quote',
    '/website-cost-calculator',
    '/privacy-policy',
    '/seo-training-bangalore',
    '/outsource-seo-services-bangalore',
    '/seo-cost-calculator',

  ];

  // Example: Fetch dynamic routes (e.g., blog posts from a database or API)
  // const dynamicRoutes = [
  //   { url: '/blog/post-1', lastModified: new Date().toISOString() },
  //   { url: '/blog/post-2', lastModified: new Date().toISOString() },
  // ];

  // Combine static and dynamic URLs
  const urls = [
    ...staticPages.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'Weekly',
      priority: 0.7,
    })),
   //  ...dynamicRoutes,
  ];

  // Generate XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls
        .map(
          ({ url, lastModified, changeFrequency, priority }) => `
        <url>
          <loc>${url}</loc>
          ${lastModified ? `<lastmod>${lastModified}</lastmod>` : ''}
          ${changeFrequency ? `<changefreq>${changeFrequency}</changefreq>` : ''}
          ${priority ? `<priority>${priority}</priority>` : ''}
        </url>`
        )
        .join('')}
    </urlset>`;

  return sitemap;
}

export async function GET() {
  const sitemap = await generateSitemap();
  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate', // Cache for 1 day
    },
  });
}