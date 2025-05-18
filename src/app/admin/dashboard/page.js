"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Dashboard() {
  const [counts, setCounts] = useState({ domestic: 0, international: 0 });

  useEffect(() => {
    async function fetchCounts() {
      try {
        console.log("Fetching from /api/admin/getCounts...");
        const res = await fetch("/api/admin/getCounts", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Failed to fetch counts: ${res.status} - ${errorText}`);
        }

        const data = await res.json();
        console.log("Fetched Data:", data);

        // Use the data directly since it's already formatted
        setCounts(data);
      } catch (error) {
        console.error("Fetch Error:", error.message);
        setCounts({ domestic: 0, international: 0 }); // Fallback to zeros
      }
    }
    fetchCounts();
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-4">
      <Card className="w-full max-w-lg text-center font-poppins shadow-md aspect-video rounded-xl bg-muted/50 items-center">
        <CardHeader>
          <CardTitle>OrganicAds SEO Stats</CardTitle>
        </CardHeader>
        <CardContent className="text-lg">
          <p>📌 Domestic: <strong>{counts.domestic || 0}</strong></p>
          <p>🌍 International: <strong>{counts.international || 0}</strong></p>
        </CardContent>
      </Card>
    </div>
  );
}