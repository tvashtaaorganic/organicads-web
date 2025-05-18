import { NextResponse } from 'next/server';
import db from '@/lib/db'; // Adjust the path if needed

export async function PUT(req) {
  try {
    const {
      id, name, locationin, cityin, countryin, descpost, cat, titletag, descriptiontag, keywordstag, slug, servicename
    } = await req.json();

    // Log incoming request data for debugging
    console.log("Incoming data:", { id, name, locationin, cityin, countryin, descpost, cat, titletag, descriptiontag, keywordstag, slug, servicename });

    // Check if any required fields are missing
    if (!id || !name || !locationin || !cityin || !countryin || !descpost || !cat || !titletag || !descriptiontag || !keywordstag || !slug || !servicename) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Find the page by ID in the database and update the fields
    const page = await db.query('SELECT * FROM pages WHERE id = ?', [id]);

    if (!page[0]) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    const updatedPage = await db.query(
      'UPDATE pages SET name = ?, locationin = ?, cityin = ?, countryin = ?, descpost = ?, cat = ?, titletag = ?, descriptiontag = ?, keywordstag = ?, slug = ?, servicename = ? WHERE id = ?',
      [name, locationin, cityin, countryin, descpost, cat, titletag, descriptiontag, keywordstag, slug, servicename, id]
    );

    // Return the updated page data
    return NextResponse.json(updatedPage);

  } catch (error) {
    console.error("Error in PUT /api/pages/update:", error);
    return NextResponse.json({ error: "Failed to update page" }, { status: 500 });
  }
}
