/**
 * ========================================
 * lib/recipes.js - ชั้น Business Logic (Service Layer)
 * ========================================
 * 
 * 📝 คำอธิบาย:
 * ไฟล์นี้เป็นหัวใจของ business logic สำหรับจัดการสูตรอาหาร
 * รับผิดชอบ CRUD operations และ business rules ทั้งหมด
 * เป็นตัวกลางระหว่าง components (UI) กับ db.js (Data Access)
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
 * 💡 Tips สำหรับพัฒนาต่อ:
 * 1. เพิ่ม filter by difficulty, cookTime range
 * 2. เพิ่ม pagination สำหรับสูตรจำนวนมาก (offset, limit)
 * 3. เพิ่ม sort by popularity, rating
 * 4. เพิ่ม bulk operations (deleteMany, updateMany)
 * 5. เพิ่ม search ที่ซับซ้อนกว่า (full-text search)
 * 
 * ⚠️ สิ่งที่ต้องระวัง:
 * - ไม่มี transaction - ถ้า error ระหว่างทำงาน data อาจไม่ consistent
 * - search ใช้ .includes() ธรรมดา - ช้าถ้าข้อมูลเยอะ (ควรใช้ index)
 * - ไม่มี caching - query ทุกครั้งจะอ่าน file ใหม่
 * - sort ใช้ in-memory - ปัญหาถ้าข้อมูลเกิน RAM
 * ========================================
 */

const { readDB, writeDB } = require('./db');
import { generateId, generateSlug, normalizeArray, validateRecipe } from './utils';

/**
 * ดึงรายการสูตรทั้งหมด
 * @param {Object} options - { sort, filter, q }
 * @returns {Promise<Array>} array of recipes
 */
export async function getAllRecipes(options = {}) {
  const db = await readDB();
  let recipes = db.recipes || [];

  // Search
  if (options.q) {
    const query = options.q.toLowerCase();
    recipes = recipes.filter(r => 
      r.name.toLowerCase().includes(query) ||
      r.tags?.some(tag => tag.toLowerCase().includes(query))
    );
  }

  // Filter by tag
  if (options.filter) {
    recipes = recipes.filter(r => r.tags?.includes(options.filter));
  }

  // TODO: เพิ่ม filter by difficulty
  // TODO: เพิ่ม filter by cookTime range
  // TODO: เพิ่ม pagination support

  // Sort
  if (options.sort === 'name') {
    recipes.sort((a, b) => a.name.localeCompare(b.name, 'th'));
  } else if (options.sort === 'newest') {
    recipes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (options.sort === 'oldest') {
    recipes.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }

  return recipes;
}

/**
 * ดึงสูตรตาม ID
 * @param {string} id - recipe id
 * @returns {Promise<Object|null>} recipe or null
 */
export async function getRecipeById(id) {
  const db = await readDB();
  return db.recipes.find(r => r.id === id) || null;
}

/**
 * เพิ่มสูตรใหม่
 * @param {Object} data - recipe data
 * @returns {Promise<Object>} created recipe
 */
export async function addRecipe(data) {
  const validation = validateRecipe(data);
  if (!validation.valid) {
    throw new Error(validation.errors.join(', '));
  }

  const db = await readDB();
  
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
export async function updateRecipe(id, data) {
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
export async function deleteRecipe(id) {
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
export async function addNoteToRecipe(recipeId, text) {
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
export async function updateNote(recipeId, noteId, text) {
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
export async function deleteNote(recipeId, noteId) {
  const db = await readDB();
  const recipe = db.recipes.find(r => r.id === recipeId);
  
  if (!recipe) {
    throw new Error('ไม่พบสูตรนี้');
  }

  recipe.notes = recipe.notes.filter(n => n.id !== noteId);
  recipe.updatedAt = new Date().toISOString();
  
  await writeDB(db);
}
