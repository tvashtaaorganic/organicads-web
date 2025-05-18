import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// Database Connection Config
const dbConfig = {
  host: "localhost",
  port: 3306, // Explicitly specify the default MySQL port
  user: "root",
  password: "", // Update if your root user has a password
  database: "pikmeorg",
};

export async function GET() {
  let connection;
  try {
    console.log("Attempting to connect to MySQL at localhost:3306...");
    connection = await mysql.createConnection(dbConfig);
    console.log("Database connection successful");

    const query = "SELECT descpost, COUNT(*) as count FROM pages GROUP BY descpost";
    console.log("Executing query:", query);
    const [rows] = await connection.execute(query);
    console.log("Query Result:", rows);

    // Ensure counts for 'domestic' and 'international' are included, even if zero
    const counts = {
      domestic: 0,
      international: 0,
    };
    rows.forEach(({ descpost, count }) => {
      if (descpost === "domestic" || descpost === "international") {
        counts[descpost] = count;
      }
    });

    return NextResponse.json(counts); // Return as an object instead of raw rows
  } catch (error) {
    console.error("API Error Details:", {
      message: error.message,
      code: error.code,
      errno: error.errno,
    });
    return NextResponse.json(
      { error: error.message || "Unknown server error" },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
      console.log("Database connection closed");
    }
  }
}