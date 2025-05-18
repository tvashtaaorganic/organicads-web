import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// Database connection
const db = mysql.createPool({
  host: "localhost", // Change if necessary
  user: "root",      // Your MySQL username
  password: "",      // Your MySQL password
  database: "pikmeorg",
});

// Test connection
db.execute("SELECT 1").catch(err => console.error("DB Connection Error:", err));

export async function GET(req, context) {
  // ✅ Validate context before accessing params
  if (!context || !context.params) {
    return NextResponse.json({ error: "Invalid context" }, { status: 400 });
  }

  const { params } = context; // Destructure after validation
  const slug = params?.slug;  // Safely access slug

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  try {
    const [rows] = await db.execute("SELECT * FROM pages WHERE slug = ?", [slug]);

    if (!rows.length) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}