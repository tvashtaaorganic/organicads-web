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
    // Extract query parameters
    const params = Object.fromEntries(req.nextUrl.searchParams);
    const search = params.search || "";
    const page = Number(params.page) || 0;
    const limit = Number(params.limit) || 10;
    const descpost = params.descpost || "";

    // Calculate pagination offset
    const offset = page * limit;

    // Construct SQL query
    let query = `SELECT * FROM pages WHERE name LIKE ?`;
    let countQuery = `SELECT COUNT(*) as total FROM pages WHERE name LIKE ?`;
    let queryParams = [`%${search}%`];

    // Apply descpost filter if provided
    if (descpost) {
      query += ` AND descpost = ?`;
      countQuery += ` AND descpost = ?`;
      queryParams.push(descpost);
    }

    // Apply pagination
    query += ` LIMIT ? OFFSET ?`;
    queryParams.push(limit, offset);

    // Execute queries
    const [rows] = await db.query(query, queryParams);
    const [[{ total }]] = await db.query(countQuery, queryParams.slice(0, -2)); // Remove LIMIT & OFFSET for count

    if (rows.length === 0) {
      return NextResponse.json({ error: "No pages found" }, { status: 404 });
    }

    return NextResponse.json({
      items: rows,
      totalPages: Math.ceil(total / limit),
      totalRows: total,
    });
  } catch (error) {
    console.error("Error fetching pages:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
