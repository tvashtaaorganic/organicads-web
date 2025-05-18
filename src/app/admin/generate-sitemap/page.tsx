// app/admin/generate-sitemap/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function GenerateSitemap() {
  const [status, setStatus] = useState<string | null>(null);

  const handleGenerateSitemap = async () => {
    setStatus('Generating sitemap...');
    try {
      const response = await fetch('/api/generate-sitemap', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setStatus(`Sitemap generated successfully! View at: ${data.sitemapIndex}`);
      } else {
        setStatus(`Error generating sitemap: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      setStatus(`Error generating sitemap: ${error instanceof Error ? error.message : 'Unknown error'}`);
      console.error('Sitemap generation error:', error);
    }
  };

  return (
    <div className="p-6" role="region" aria-label="Sitemap Generation Panel">
      <h1 className="text-xl font-bold mb-4">Generate Sitemap Now</h1>
      <Button
        onClick={handleGenerateSitemap}
        className="bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        aria-label="Generate sitemap"
      >
        Generate Sitemap
      </Button>
      {status && (
        <p className="mt-4 text-gray-700" role="alert">
          {status}
        </p>
      )}
    </div>
  );
}