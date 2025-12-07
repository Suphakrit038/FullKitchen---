/**
 * ========================================
 * app/api/recipes/route.js - API Route สำหรับ recipes
 * ========================================
 * GET /api/recipes - ดึงรายการสูตรทั้งหมด
 * POST /api/recipes - เพิ่มสูตรใหม่
 */

import { NextResponse } from 'next/server';
const { getAllRecipes, addRecipe } = require('../../../lib/recipes');

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const options = {
      q: searchParams.get('q'),
      sort: searchParams.get('sort'),
      filter: searchParams.get('filter')
    };
    
    const recipes = await getAllRecipes(options);
    return NextResponse.json(recipes);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const recipe = await addRecipe(data);
    return NextResponse.json(recipe);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
