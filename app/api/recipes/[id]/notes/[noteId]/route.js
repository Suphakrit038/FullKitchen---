/**
 * ========================================
 * app/api/recipes/[id]/notes/[noteId]/route.js - API Route สำหรับโน้ตเดียว
 * ========================================
 * PUT /api/recipes/[id]/notes/[noteId] - แก้ไขโน้ต
 * DELETE /api/recipes/[id]/notes/[noteId] - ลบโน้ต
 */

import { NextResponse } from 'next/server';
const { updateNote, deleteNote } = require('../../../../../../lib/recipes');

export async function PUT(request, { params }) {
  try {
    const { text } = await request.json();
    const note = await updateNote(params.id, params.noteId, text);
    return NextResponse.json(note);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await deleteNote(params.id, params.noteId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
