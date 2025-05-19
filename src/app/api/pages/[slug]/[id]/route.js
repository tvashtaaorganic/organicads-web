// src/app/api/pages/[slug]/[id]/route.js
import { NextResponse } from 'next/server';
import { deletePageById } from '@/lib/db';

export async function DELETE(req, { params }) {
  const { id } = params;

  // Validate the ID
  if (!id) {
    return NextResponse.json(
      { error: 'Page ID is required' },
      { status: 400 }
    );
  }

  try {
    const result = await deletePageById(id);

    if (!result) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Page deleted successfully' });
  } catch (error) {
    console.error('Error deleting page:', error);
    return NextResponse.json(
      { error: 'Failed to delete page' },
      { status: 500 }
    );
  }
}