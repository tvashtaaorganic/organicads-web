import { NextResponse } from 'next/server';
import { deletePageById } from '@/lib/db'; // Import the function to delete from the DB

export async function DELETE(req, { params }) {
  const { id } = params; // Extract the 'id' from the URL parameters

  try {
    // Attempt to delete the page from the database by ID
    const result = await deletePageById(id);

    if (result) {
      // If successful, send a success response
      return NextResponse.json({ message: "Page deleted successfully" });
    } else {
      // If the page was not found, send a 404 response
      return NextResponse.json(
        { error: "Page not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error deleting page:", error);
    return NextResponse.json(
      { error: "Failed to delete page" },
      { status: 500 }
    );
  }
}
