import axios from 'axios'

const base = (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_API_BASE) || 'http://localhost:3001'
const api = axios.create({ baseURL: base })

export async function getRecipes() {
  const res = await api.get('/recipes')
  return res.data
}

export async function getRecipeById(id) {
  const res = await api.get(`/recipes/${id}`)
  return res.data
}

export async function addRecipe(payload) {
  const res = await api.post('/recipes', payload)
  return res.data
}

export async function deleteRecipe(id) {
  const res = await api.delete(`/recipes/${id}`)
  return res.data
}
