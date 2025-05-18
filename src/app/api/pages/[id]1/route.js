// src/app/api/pages/[id]/route.js

import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// Database connection
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "pikmeorg",
});

export async function DELETE(req, { params }) {
  const { id } = params;  // `id` comes from the dynamic route parameter

  try {
    // Delete the page from the database
    const [result] = await db.query("DELETE FROM pages WHERE id = ?", [id]);

    // If no rows were affected, it means the page wasn't found
    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    // Return a successful response if the page was deleted
    return NextResponse.json({ success: true, message: "Page deleted successfully" });
  } catch (error) {
    console.error("Error deleting page:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
