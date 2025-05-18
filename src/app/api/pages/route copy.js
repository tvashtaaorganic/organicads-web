// src/app/api/pages/route.js

import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// Database connection
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "pikmeorg",
});

export async function GET(req) {
  try {
    const { search = "", page = 0, limit = 10 } = req.nextUrl.searchParams;

    // Calculate pagination offset
    const offset = page * limit;

    // SQL query with pagination and search filtering
    const query = `
      SELECT * FROM pages 
      WHERE name LIKE ? 
      LIMIT ? OFFSET ?
    `;
    const [rows] = await db.query(query, [`%${search}%`, Number(limit), Number(offset)]);

    // Get total count of rows (for pagination)
    const [[{ total }]] = await db.query("SELECT COUNT(*) as total FROM pages WHERE name LIKE ?", [`%${search}%`]);

    if (rows.length === 0) {
      return NextResponse.json({ error: "No pages found" }, { status: 404 });
    }

    return NextResponse.json({
      items: rows,
      totalPages: Math.ceil(total / limit), // Calculate total pages
      totalRows: total, // Total rows for pagination
    });
  } catch (error) {
    console.error("Error fetching pages:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
