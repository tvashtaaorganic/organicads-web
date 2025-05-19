// src/lib/db.js
import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // Add your MySQL password here
  database: 'pikmeorg',
});

// Test the database connection
db.query("SELECT 1").catch(err => console.error("DB Connection Error:", err));

export async function getSlugs() {
  try {
    const [rows] = await db.execute('SELECT slug FROM pages'); // Replace 'pages' with your table name
    return rows.map(row => row.slug);
  } catch (error) {
    console.error('Error fetching slugs:', error);
    return [];
  }
}

export async function deletePageById(id) {
  try {
    const [result] = await db.execute('DELETE FROM pages WHERE id = ?', [id]);
    // Check if any rows were affected (i.e., if a page was deleted)
    if (result.affectedRows === 0) {
      return null; // Return null if no page was found
    }
    return { success: true }; // Return success indicator
  } catch (error) {
    console.error('Error deleting page:', error);
    throw error; // Throw error to be handled by the API route
  }
}

export default db;