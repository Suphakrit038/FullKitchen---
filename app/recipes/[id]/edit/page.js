"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import RecipeForm from '../../../../../components/RecipeForm'
import { getRecipeById } from '../../../../../lib/recipes'

export default function EditRecipePage() {
  const params = useParams()
  const id = params?.id
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    async function loadRecipe() {
      try {
        const data = await getRecipeById(id)
        setRecipe(data)
      } catch (error) {
        console.error('Error loading recipe:', error)
      } finally {
        setLoading(false)
      }
    }

    loadRecipe()
  }, [id])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (!recipe) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5">ไม่พบสูตรนี้</Typography>
      </Box>
    )
  }

  return (
    <main>
      <RecipeForm recipe={recipe} mode="edit" />
    </main>
  )
}
