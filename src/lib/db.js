import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // Add your MySQL password here
  database: 'pikmeorg',
});

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

export default db;