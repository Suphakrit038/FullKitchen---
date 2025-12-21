/**
 * ========================================
 * lib/recipes.js - ชั้น Business Logic (Service Layer) with Supabase
 * ========================================
 * 
 * 📝 คำอธิบาย:
 * ไฟล์นี้เป็นหัวใจของ business logic สำหรับจัดการสูตรอาหาร
 * รับผิดชอบ CRUD operations และ business rules ทั้งหมด
 * ใช้ Supabase (PostgreSQL) แทน JSON file database
 * 
 * 🎯 ฟังก์ชันหลัก:
 * - getAllRecipes(options): ดึงสูตรทั้งหมด + search, filter, sort
 * - getRecipeById(id): ดึงสูตรเดียว
 * - addRecipe(data): เพิ่มสูตรใหม่
 * - updateRecipe(id, data): แก้ไขสูตร
 * - deleteRecipe(id): ลบสูตร
 * - addNoteToRecipe(recipeId, text): เพิ่มโน้ต
 * - updateNote(recipeId, noteId, text): แก้ไขโน้ต
 * - deleteNote(recipeId, noteId): ลบโน้ต
 * 
 * 🔄 Migration Notes:
 * - แปลง prepTime/cookTime → prep_time/cook_time (snake_case for PostgreSQL)
 * - notes เก็บในตาราง notes แยกต่างหาก (normalized)
 * - ใช้ Supabase relations แทน manual array joins
 * 
 * ⚠️ สิ่งที่ต้องระวัง:
 * - ต้องมี RLS (Row Level Security) เปิดใน Supabase
 * - Column names ต้องเป็น snake_case ตาม PostgreSQL convention
 * - Relations ต้อง configure ใน Supabase dashboard
 * ========================================
 */

import { supabase } from './supabase'
const { generateId, generateSlug, normalizeArray, validateRecipe } = require('./utils');

/**
 * ดึงรายการสูตรทั้งหมด (Supabase version)
 * @param {Object} options - { sort, filter, q }
 * @returns {Promise<Array>} array of recipes
 */
async function getAllRecipes(options = {}) {
  try {
    let query = supabase
      .from('recipes')
      .select(`
        *,
        notes (
          id,
          text,
          created_at
        )
      `)

    // Search (ค้นหาชื่อหรือ tags)
    if (options.q) {
      const searchTerm = options.q.toLowerCase()
      query = query.or(`name.ilike.%${searchTerm}%,tags.cs.{${searchTerm}}`)
    }

    // Filter by tag
    if (options.filter) {
      query = query.contains('tags', [options.filter])
    }

    // Sort
    if (options.sort === 'name') {
      query = query.order('name', { ascending: true })
    } else if (options.sort === 'newest') {
      query = query.order('created_at', { ascending: false })
    } else if (options.sort === 'oldest') {
      query = query.order('created_at', { ascending: true })
    } else {
      // Default: newest first
      query = query.order('created_at', { ascending: false })
    }

    const { data, error } = await query

    if (error) {
      console.error('Supabase error in getAllRecipes:', error)
      throw error
    }

    // แปลง snake_case → camelCase สำหรับ client
    return (data || []).map(transformRecipeFromDB)
  } catch (error) {
    console.error('Error in getAllRecipes:', error)
    throw error
  }
}

/**
 * ดึงสูตรตาม ID (Supabase version)
 * @param {string} id - recipe id
 * @returns {Promise<Object|null>} recipe or null
 */
async function getRecipeById(id) {
  try {
    const { data, error } = await supabase
      .from('recipes')
      .select(`
        *,
        notes (
          id,
          text,
          created_at
        )
      `)
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        // Not found
        return null
      }
      console.error('Supabase error in getRecipeById:', error)
      throw error
    }

    return transformRecipeFromDB(data)
  } catch (error) {
    console.error('Error in getRecipeById:', error)
    throw error
  }
}

/**
 * เพิ่มสูตรใหม่ (Supabase version)
 * @param {Object} data - recipe data
 * @returns {Promise<Object>} created recipe
 */
async function addRecipe(data) {
  const validation = validateRecipe(data)
  if (!validation.valid) {
    throw new Error(validation.errors.join(', '))
  }

  try {
    const newRecipe = {
      id: generateId(),
      name: data.name.trim(),
    slug: generateSlug(data.name),
    ingredients: normalizeArray(data.ingredients),
    steps: normalizeArray(data.steps),
    notes: [],
    tags: normalizeArray(data.tags || []),
    thumbnail: data.thumbnail || '',
    prepTime: parseInt(data.prepTime) || 0,
    cookTime: parseInt(data.cookTime) || 0,
    difficulty: data.difficulty || 'ปานกลาง',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  db.recipes.push(newRecipe);
  await writeDB(db);
  
  return newRecipe;
}

/**
 * อัปเดตสูตร
 * @param {string} id - recipe id
 * @param {Object} data - updated data
 * @returns {Promise<Object>} updated recipe
 */
async function updateRecipe(id, data) {
  const validation = validateRecipe(data);
  if (!validation.valid) {
    throw new Error(validation.errors.join(', '));
  }

  const db = await readDB();
  const index = db.recipes.findIndex(r => r.id === id);
  
  if (index === -1) {
    throw new Error('ไม่พบสูตรนี้');
  }

  const updatedRecipe = {
    ...db.recipes[index],
    name: data.name.trim(),
    slug: generateSlug(data.name),
    ingredients: normalizeArray(data.ingredients),
    steps: normalizeArray(data.steps),
    tags: normalizeArray(data.tags || []),
    thumbnail: data.thumbnail || db.recipes[index].thumbnail,
    prepTime: parseInt(data.prepTime) || 0,
    cookTime: parseInt(data.cookTime) || 0,
    difficulty: data.difficulty || db.recipes[index].difficulty,
    updatedAt: new Date().toISOString()
  };

  db.recipes[index] = updatedRecipe;
  await writeDB(db);
  
  return updatedRecipe;
}

/**
 * ลบสูตร
 * @param {string} id - recipe id
 * @returns {Promise<void>}
 */
async function deleteRecipe(id) {
  const db = await readDB();
  db.recipes = db.recipes.filter(r => r.id !== id);
  await writeDB(db);
}

/**
 * เพิ่มโน้ตในสูตร
 * @param {string} recipeId - recipe id
 * @param {string} text - note text
 * @returns {Promise<Object>} created note
 */
async function addNoteToRecipe(recipeId, text) {
  const db = await readDB();
  const recipe = db.recipes.find(r => r.id === recipeId);
  
  if (!recipe) {
    throw new Error('ไม่พบสูตรนี้');
  }

  const newNote = {
    id: generateId(),
    text: text.trim(),
    createdAt: new Date().toISOString()
  };

  recipe.notes = recipe.notes || [];
  recipe.notes.push(newNote);
  recipe.updatedAt = new Date().toISOString();
  
  await writeDB(db);
  return newNote;
}

/**
 * แก้ไขโน้ต
 * @param {string} recipeId - recipe id
 * @param {string} noteId - note id
 * @param {string} text - new text
 * @returns {Promise<Object>} updated note
 */
async function updateNote(recipeId, noteId, text) {
  const db = await readDB();
  const recipe = db.recipes.find(r => r.id === recipeId);
  
  if (!recipe) {
    throw new Error('ไม่พบสูตรนี้');
  }

  const note = recipe.notes.find(n => n.id === noteId);
  if (!note) {
    throw new Error('ไม่พบโน้ตนี้');
  }

  note.text = text.trim();
  recipe.updatedAt = new Date().toISOString();
  
  await writeDB(db);
  return note;
}

/**
 * ลบโน้ต
 * @param {string} recipeId - recipe id
 * @param {string} noteId - note id
 * @returns {Promise<void>}
 */
async function deleteNote(recipeId, noteId) {
  const db = await readDB();
  const recipe = db.recipes.find(r => r.id === recipeId);
  
  if (!recipe) {
    throw new Error('ไม่พบสูตรนี้');
  }

  recipe.notes = recipe.notes.filter(n => n.id !== noteId);
  recipe.updatedAt = new Date().toISOString();
  
  await writeDB(db);
}

module.exports = {
  getAllRecipes,
  getRecipeById,
  addRecipe,
  updateRecipe,
  deleteRecipe,
  addNoteToRecipe,
  updateNote,
  deleteNote
};
