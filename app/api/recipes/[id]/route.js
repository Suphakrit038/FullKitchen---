/**
 * ========================================
 * app/api/recipes/[id]/route.js - API Route สำหรับสูตรเดียว
 * ========================================
 * GET /api/recipes/[id] - ดึงสูตรเดียว
 * PUT /api/recipes/[id] - แก้ไขสูตร
 * DELETE /api/recipes/[id] - ลบสูตร
 */

import { NextResponse } from 'next/server';
const { getRecipeById, updateRecipe, deleteRecipe } = require('../../../../lib/recipes');

export async function GET(request, { params }) {
  try {
    const recipe = await getRecipeById(params.id);
    if (!recipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }
    return NextResponse.json(recipe);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const recipe = await updateRecipe(params.id, data);
    return NextResponse.json(recipe);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await deleteRecipe(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
