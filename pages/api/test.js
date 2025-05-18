import db from "@/lib/db";

export default async function handler(req, res) {
    try {
        const [rows] = await db.query("SELECT * FROM pages"); // Make sure 'pages' is your table name
        res.status(200).json(rows);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
