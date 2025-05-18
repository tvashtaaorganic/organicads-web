import db from "@/lib/db";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const [rows] = await db.query("SELECT * FROM pages"); // Change 'pages' to your table name
        res.status(200).json(rows);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
