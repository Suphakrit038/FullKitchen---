"use client"
import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import RecipeCard from './RecipeCard'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { getRecipes } from '../lib/recipes'

export default function RecipeList() {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    getRecipes().then(data => setRecipes(data || []))
  }, [])

  return (
    <Box>
      <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Typography variant="h5">สูตรอาหารทั้งหมด</Typography>
      </Box>
      <Grid container spacing={2}>
        {recipes.map(r => (
          <Grid item key={r.id} xs={12} sm={6} md={4}>
            <RecipeCard recipe={r} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
