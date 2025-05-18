import db from "@/lib/db"; // Import your MySQL database connection

export async function DELETE(req) {
  try {
    const { id } = await req.json(); // Read the request body

    if (!id) {
      return new Response(JSON.stringify({ error: "ID is required" }), { status: 400 });
    }

    // Delete the record from MySQL database
    const [result] = await db.query("DELETE FROM pages WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return new Response(JSON.stringify({ error: "Page not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true, message: "Page deleted successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error deleting page:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
