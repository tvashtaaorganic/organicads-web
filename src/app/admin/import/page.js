"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ImportPage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [duplicates, setDuplicates] = useState([]); // Store duplicate messages
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.type !== "text/csv") {
      setMessage("Please upload a valid CSV file.");
      return;
    }

    setFile(selectedFile);
    setMessage(""); // Clear previous messages
    setDuplicates([]); // Clear previous duplicates
  };

  const handleFileUpload = async () => {
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    setIsLoading(true);
    setMessage("");
    setDuplicates([]);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/import", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message || "Import successful!");
        setDuplicates(result.duplicates || []); // Store duplicate messages
      } else {
        setMessage(result.error || "Failed to import.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("An error occurred while uploading.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Import Pages</h2>

      <Input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="w-full mb-4"
      />

      <Button onClick={handleFileUpload} className="w-full" disabled={isLoading}>
        {isLoading ? "Uploading..." : "Import"}
      </Button>

      {message && (
        <div className="text-center text-sm mt-4">
          <p>{message}</p>
          {Array.isArray(duplicates) && duplicates.length > 0 && (
            <ul className="text-red-500 mt-2">
              {duplicates.map((msg, index) => (
                <li key={index}>{msg}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
