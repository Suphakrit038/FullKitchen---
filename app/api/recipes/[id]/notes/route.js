/**
 * ========================================
 * app/api/recipes/[id]/notes/route.js - API Route สำหรับ notes
 * ========================================
 * POST /api/recipes/[id]/notes - เพิ่มโน้ต
 */

import { NextResponse } from 'next/server';
const { addNoteToRecipe } = require('../../../../../lib/recipes');

export async function POST(request, { params }) {
  try {
    const { text } = await request.json();
    const note = await addNoteToRecipe(params.id, text);
    return NextResponse.json(note);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
