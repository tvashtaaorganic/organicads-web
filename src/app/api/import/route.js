import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { parse } from "papaparse";

export const config = {
  api: {
    bodyParser: false,
  },
};

const db = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "pikmeorg",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function POST(req) {
  try {
    console.log("Received POST request to /api/import");
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      console.log("No file uploaded");
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    console.log("File received:", file.name, file.type);
    let fileContent = await file.text();
    fileContent = fileContent.replace(/^\uFEFF/, "").trim();

    const correctHeaders = [
      "name",
      "locationin",
      "cityin",
      "countryin",
      "descpost",
      "cat",
      "titletag",
      "descriptiontag",
      "keywordstag",
      "slug",
      "servicename",
    ];

    console.log("Parsing CSV content...");
    const parsedData = parse(fileContent, {
      header: false,
      skipEmptyLines: true,
      transform: (value) => value.trim(),
    });

    if (!parsedData.data || parsedData.data.length === 0) {
      console.log("No data parsed from CSV");
      return NextResponse.json({ error: "No valid data found in the file." }, { status: 400 });
    }

    const dataWithHeaders = parsedData.data.map((row) =>
      Object.fromEntries(correctHeaders.map((key, i) => [key, row[i] || ""]))
    );
    console.log("Parsed data (first row):", dataWithHeaders[0]);
    console.log("Total rows parsed:", dataWithHeaders.length);

    let newRecordsCount = 0;
    const duplicateSlugs = [];
    const results = [];

    // Test database connection with detailed error capture
    console.log("Testing database connection...");
    try {
      const [testResult] = await db.query("SELECT 1 AS test");
      console.log("Connection test result:", testResult);
    } catch (dbTestError) {
      console.error("Database connection test failed:", {
        message: dbTestError.message,
        code: dbTestError.code,
        errno: dbTestError.errno,
        stack: dbTestError.stack,
      });
      throw dbTestError; // Re-throw to handle in outer catch
    }

    for (const row of dataWithHeaders) {
      const { name, locationin, cityin, countryin, descpost, cat, titletag, descriptiontag, keywordstag, slug, servicename } = row;

      if (!slug) {
        console.log(`Skipping row with missing slug: ${name}`);
        results.push({ message: `Skipping row with missing slug: ${name}` });
        continue;
      }

      console.log(`Processing row with slug: ${slug}`);
      const [existing] = await db.query("SELECT slug FROM pages WHERE slug = ?", [slug]);

      if (existing.length > 0) {
        console.log(`Duplicate slug found: ${slug}`);
        duplicateSlugs.push(slug);
        continue;
      }

      try {
        await db.query(
          `INSERT INTO pages (name, locationin, cityin, countryin, descpost, cat, titletag, descriptiontag, keywordstag, slug, servicename, date)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
          [name, locationin, cityin, countryin, descpost, cat, titletag, descriptiontag, keywordstag, slug, servicename]
        );
        newRecordsCount++;
        console.log(`Inserted: ${name} (slug: ${slug})`);
        results.push({ message: `Page ${name} inserted successfully.` });
      } catch (dbError) {
        console.error(`DB error for slug ${slug}:`, dbError.message);
        results.push({ message: `Error inserting ${name}: ${dbError.message}` });
      }
    }

    console.log("Processing complete. New records:", newRecordsCount, "Duplicates:", duplicateSlugs.length);

    const response = {
      message: newRecordsCount > 0 ? "File processed successfully." : "No new records inserted.",
      newRecords: newRecordsCount,
      duplicates: duplicateSlugs.map((slug) => `Slug "${slug}" already exists.`),
    };
    console.log("Response:", response);
    return NextResponse.json(response);
  } catch (err) {
    console.error("Error in /api/import:", {
      message: err.message || "No message",
      code: err.code || "No code",
      errno: err.errno || "No errno",
      stack: err.stack || "No stack",
    });
    return NextResponse.json(
      { error: "Server error", details: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}