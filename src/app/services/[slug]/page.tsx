import { notFound } from "next/navigation";

// ✅ Fetch SEO data from the database
async function fetchPageData(slug: string): Promise<any | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/pages/${slug}`, {
    cache: "force-cache",
  });

  if (!res.ok) return null;
  return res.json();
}

// ✅ Generate Dynamic Metadata
export async function generateMetadata({ params }: { params: { slug: string } }) {
  // Validate params as a whole to avoid sync access to properties
  if (!params || Object.keys(params).length === 0) {
    console.error("Missing or empty params in generateMetadata");
    return {
      title: "Page Not Found",
      description: "This page does not exist.",
    };
  }

  const slug = params.slug; // Access slug after validation
  const data = await fetchPageData(slug); // Await the fetch here

  if (!data) {
    return {
      title: "Page Not Found",
      description: "This page does not exist.",
    };
  }

  return {
    title: data.titletag,
    description: data.descriptiontag,
  };
}

// ✅ Page Component (Server Component)
export default async function Page({ params }: { params: { slug: string } }) {
  if (!params || typeof params.slug === "undefined") {
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
    <div className="w-full mx-auto">
      {/* ✅ Render the correct service page dynamically */}
      <ServiceComponent service={data} />
    </div>
  );
}