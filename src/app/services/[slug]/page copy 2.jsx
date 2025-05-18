import { notFound } from "next/navigation";
import Head from "next/head";

// ✅ Fetch SEO data from the database
async function fetchPageData(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/pages/${slug}`, {
    cache: "force-cache",
  });

  if (!res.ok) return null;
  return res.json();
}

// ✅ Page Component (Server Component)
export default async function Page({ params }) {
  // ✅ Ensure params are awaited properly before using them
  if (!params || !params.slug) {
    console.error("Missing params or slug");
    return notFound();
  }

  const data = await fetchPageData(params.slug);
  console.log("Fetched Data:", data); // Debugging output

  if (!data) return notFound();

  console.log("Service Name:", data.servicename); // Debugging output

  let ServiceComponent;
  try {
    // ✅ Dynamically import the correct service component
    ServiceComponent = (await import(`@/components/services/${data.servicename}/page`)).default;
  } catch (error) {
    console.error(`Service component not found for: ${data.servicename}`, error);
    return notFound();
  }

  return (
    <>
      <Head>
        <title>{data.titletag}</title>
        <meta name="description" content={data.descriptiontag || data.content.slice(0, 160)} />

        {/* ✅ Open Graph Meta Tags (For Social Media Sharing) */}
        <meta property="og:title" content={data.titletag} />
        <meta property="og:description" content={data.descriptiontag || data.content.slice(0, 160)} />
        <meta property="og:image" content={data.imageUrl} />

        {/* ✅ Twitter Meta Tags */}
        <meta name="twitter:title" content={data.titletag} />
        <meta name="twitter:description" content={data.descriptiontag || data.content.slice(0, 160)} />
        <meta name="twitter:image" content={data.imageUrl} />

        {/* ✅ Structured Data (JSON-LD) for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": data.titletag,
            "description": data.descriptiontag || data.content.slice(0, 150),
            "image": data.imageUrl,
            "author": { "@type": "Person", "name": "Your Name" },
            "datePublished": data.datePublished,
          })}
        </script>
      </Head>

      <div className="max-w-4xl mx-auto p-6">
        {/* ✅ Render the correct service page dynamically */}
        <ServiceComponent service={data} />
      </div>
    </>
  );
}
