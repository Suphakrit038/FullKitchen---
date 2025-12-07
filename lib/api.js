/**
 * ========================================
 * lib/api.js - API Client Functions
 * ========================================
 * 
 * Client-side API calls สำหรับเรียกใช้ API routes
 * ใช้แทนการ import lib/recipes.js โดยตรงในcompponents
 */

// ====== RECIPES ======

export async function getAllRecipes(options = {}) {
  const params = new URLSearchParams();
  if (options.q) params.append('q', options.q);
  if (options.sort) params.append('sort', options.sort);
  if (options.filter) params.append('filter', options.filter);
  
  const url = `/api/recipes${params.toString() ? '?' + params.toString() : ''}`;
  const res = await fetch(url);
  
  if (!res.ok) {
    throw new Error('Failed to fetch recipes');
  }
  
  return res.json();
}

export async function getRecipeById(id) {
  const res = await fetch(`/api/recipes/${id}`);
  
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error('Failed to fetch recipe');
  }
  
  return res.json();
}

export async function addRecipe(data) {
  const res = await fetch('/api/recipes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to add recipe');
  }
  
  return res.json();
}

export async function updateRecipe(id, data) {
  const res = await fetch(`/api/recipes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to update recipe');
  }
  
  return res.json();
}

export async function deleteRecipe(id) {
  const res = await fetch(`/api/recipes/${id}`, {
    method: 'DELETE'
  });
  
  if (!res.ok) {
    throw new Error('Failed to delete recipe');
  }
  
  return res.json();
}

// ====== NOTES ======

export async function addNoteToRecipe(recipeId, text) {
  const res = await fetch(`/api/recipes/${recipeId}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to add note');
  }
  
  return res.json();
}

export async function updateNote(recipeId, noteId, text) {
  const res = await fetch(`/api/recipes/${recipeId}/notes/${noteId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to update note');
  }
  
  return res.json();
}

export async function deleteNote(recipeId, noteId) {
  const res = await fetch(`/api/recipes/${recipeId}/notes/${noteId}`, {
    method: 'DELETE'
  });
  
  if (!res.ok) {
    throw new Error('Failed to delete note');
  }
  
  return res.json();
}
