"use client"
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import CircularProgress from '@mui/material/CircularProgress'
import SearchIcon from '@mui/icons-material/Search'
import RecipeCard from './RecipeCard'
import { getAllRecipes } from '../lib/recipes'

export default function RecipeList() {
  const [recipes, setRecipes] = useState([])
  const [filteredRecipes, setFilteredRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    loadRecipes()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredRecipes(recipes)
    } else {
      const query = searchQuery.toLowerCase()
      const filtered = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(query) ||
        recipe.tags?.some(tag => tag.toLowerCase().includes(query)) ||
        recipe.ingredients?.some(ing => ing.toLowerCase().includes(query))
      )
      setFilteredRecipes(filtered)
    }
  }, [searchQuery, recipes])

  async function loadRecipes() {
    try {
      setLoading(true)
      const data = await getAllRecipes({ sort: 'newest' })
      setRecipes(data)
      setFilteredRecipes(data)
    } catch (error) {
      console.error('Error loading recipes:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
        สูตรอาหารทั้งหมด
      </Typography>

      <TextField
        fullWidth
        placeholder="ค้นหาสูตร, ส่วนผสม, หรือแท็ก..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {filteredRecipes.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            {searchQuery ? 'ไม่พบสูตรที่ค้นหา' : 'ยังไม่มีสูตรอาหาร'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {!searchQuery && 'เริ่มต้นเพิ่มสูตรแรกของคุณได้เลย!'}
          </Typography>
        </Box>
      ) : (
        <>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            พบ {filteredRecipes.length} สูตร
          </Typography>

          <Grid container spacing={3}>
            {filteredRecipes.map((recipe) => (
              <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                <RecipeCard recipe={recipe} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  )
}
