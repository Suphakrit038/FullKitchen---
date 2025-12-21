/**
 * ========================================
 * lib/recipes.js - Business Logic with Supabase
 * ========================================
 * 
 * Supabase version ของ recipes service
 * ใช้แทน recipes.js เดิมที่ใช้ JSON file
 * 
 * 🔄 แก้ไขหลัก:
 * - prepTime → prep_time (snake_case)
 * - cookTime → cook_time  
 * - createdAt → created_at
 * - updatedAt → updated_at
 * - notes เป็นตารางแยก (not embedded array)
 */

import { supabase } from './supabase'
const { generateId, generateSlug, normalizeArray, validateRecipe } = require('./utils')

/**
 * Helper: แปลง DB format (snake_case) → Client format (camelCase)
 */
function transformRecipeFromDB(dbRecipe) {
  if (!dbRecipe) return null
  
  return {
    id: dbRecipe.id,
    name: dbRecipe.name,
    slug: dbRecipe.slug,
    ingredients: dbRecipe.ingredients || [],
    steps: dbRecipe.steps || [],
    tags: dbRecipe.tags || [],
    thumbnail: dbRecipe.thumbnail || '',
    prepTime: dbRecipe.prep_time || 0,
    cookTime: dbRecipe.cook_time || 0,
    difficulty: dbRecipe.difficulty || 'ง่าย',
    createdAt: dbRecipe.created_at,
    updatedAt: dbRecipe.updated_at,
    notes: (dbRecipe.notes || []).map(note => ({
      id: note.id,
      text: note.text,
      createdAt: note.created_at
    }))
  }
}

/**
 * Helper: แปลง Client format → DB format
 */
function transformRecipeToDB(clientRecipe) {
  return {
    id: clientRecipe.id,
    name: clientRecipe.name,
    slug: clientRecipe.slug,
    ingredients: clientRecipe.ingredients || [],
    steps: clientRecipe.steps || [],
    tags: clientRecipe.tags || [],
    thumbnail: clientRecipe.thumbnail || '',
    prep_time: clientRecipe.prepTime || 0,
    cook_time: clientRecipe.cookTime || 0,
    difficulty: clientRecipe.difficulty || 'ง่าย',
    created_at: clientRecipe.createdAt || new Date().toISOString(),
    updated_at: clientRecipe.updatedAt || new Date().toISOString()
  }
}

/**
 * ดึงรายการสูตรทั้งหมด
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

    // Search
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
      query = query.order('created_at', { ascending: false })
    }

    const { data, error } = await query

    if (error) throw error

    return (data || []).map(transformRecipeFromDB)
  } catch (error) {
    console.error('Error in getAllRecipes:', error)
    throw error
  }
}

/**
 * ดึงสูตรตาม ID
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
      if (error.code === 'PGRST116') return null
      throw error
    }

    return transformRecipeFromDB(data)
  } catch (error) {
    console.error('Error in getRecipeById:', error)
    throw error
  }
}

/**
 * เพิ่มสูตรใหม่
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
      tags: normalizeArray(data.tags || []),
      thumbnail: data.thumbnail || '',
      prep_time: parseInt(data.prepTime) || 0,
      cook_time: parseInt(data.cookTime) || 0,
      difficulty: data.difficulty || 'ปานกลาง',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    const { data: insertedRecipe, error } = await supabase
      .from('recipes')
      .insert(newRecipe)
      .select()
      .single()

    if (error) throw error

    return transformRecipeFromDB(insertedRecipe)
  } catch (error) {
    console.error('Error in addRecipe:', error)
    throw error
  }
}

/**
 * อัปเดตสูตร
 */
async function updateRecipe(id, data) {
  const validation = validateRecipe(data)
  if (!validation.valid) {
    throw new Error(validation.errors.join(', '))
  }

  try {
    const updateData = {
      name: data.name.trim(),
      slug: generateSlug(data.name),
      ingredients: normalizeArray(data.ingredients),
      steps: normalizeArray(data.steps),
      tags: normalizeArray(data.tags || []),
      thumbnail: data.thumbnail || '',
      prep_time: parseInt(data.prepTime) || 0,
      cook_time: parseInt(data.cookTime) || 0,
      difficulty: data.difficulty || 'ปานกลาง',
      updated_at: new Date().toISOString()
    }

    const { data: updatedRecipe, error } = await supabase
      .from('recipes')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return transformRecipeFromDB(updatedRecipe)
  } catch (error) {
    console.error('Error in updateRecipe:', error)
    throw error
  }
}

/**
 * ลบสูตร
 */
async function deleteRecipe(id) {
  try {
    // Notes จะถูกลบอัตโนมัติด้วย ON DELETE CASCADE
    const { error } = await supabase
      .from('recipes')
      .delete()
      .eq('id', id)

    if (error) throw error

    return true
  } catch (error) {
    console.error('Error in deleteRecipe:', error)
    throw error
  }
}

/**
 * เพิ่มโน้ตในสูตร
 */
async function addNoteToRecipe(recipeId, text) {
  try {
    const newNote = {
      id: generateId(),
      recipe_id: recipeId,
      text: text.trim(),
      created_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('notes')
      .insert(newNote)
      .select()
      .single()

    if (error) throw error

    return {
      id: data.id,
      text: data.text,
      createdAt: data.created_at
    }
  } catch (error) {
    console.error('Error in addNoteToRecipe:', error)
    throw error
  }
}

/**
 * แก้ไขโน้ต
 */
async function updateNote(recipeId, noteId, text) {
  try {
    const { data, error } = await supabase
      .from('notes')
      .update({ text: text.trim() })
      .eq('id', noteId)
      .eq('recipe_id', recipeId)
      .select()
      .single()

    if (error) throw error

    return {
      id: data.id,
      text: data.text,
      createdAt: data.created_at
    }
  } catch (error) {
    console.error('Error in updateNote:', error)
    throw error
  }
}

/**
 * ลบโน้ต
 */
async function deleteNote(recipeId, noteId) {
  try {
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', noteId)
      .eq('recipe_id', recipeId)

    if (error) throw error

    return true
  } catch (error) {
    console.error('Error in deleteNote:', error)
    throw error
  }
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
}
