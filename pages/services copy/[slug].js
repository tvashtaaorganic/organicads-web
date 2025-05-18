import * as React from "react";
import db from "@/lib/db";
import { useRouter } from "next/router";
import Head from "next/head";
import dynamic from "next/dynamic";

export async function getServerSideProps({ params }) {
    const { slug } = params;

    const [rows] = await db.query("SELECT * FROM pages WHERE slug = ?", [slug]);

    if (rows.length === 0) {
        return { notFound: true }; // Show 404 if slug doesn't exist
    }

    // Ensure all Date objects are converted to strings
    const service = rows[0];

    // If your `service.date` is a Date object, you can convert it like this:
    if (service.date) {
        service.date = service.date.toISOString(); // Convert Date to string
    }

    return {
        props: { service },
    };
}

export default function ServicePage({ service }) {
    const router = useRouter();

    if (router.isFallback) {
        return <h1>Loading...</h1>;
    }

    // Dynamically import the component based on the `Servicename`
    const ServiceComponent = dynamic(
        () => import(`@/components/services/${service.Servicename}.jsx`), // Ensure the filename is correct
        {
            loading: () => <p>Loading Service...</p>,
            ssr: true, // Ensure it loads on the server
        }
    );

    return (
        <>
            <Head>
                <title>{service.titletag} | Best {service.cityin} Services</title>
                <meta name="description" content={service.descriptiontag} />
            </Head>
            <h1>Hello</h1>
            <ServiceComponent service={service} />
        </>
    );
}
