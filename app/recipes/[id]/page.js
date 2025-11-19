"use client"
import React, { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { getRecipeById, deleteRecipe } from '../../../lib/recipes'

export default function RecipeDetail() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id
  const [recipe, setRecipe] = useState(null)

  useEffect(() => {
    if (!id) return
    getRecipeById(id).then(r => setRecipe(r)).catch(() => setRecipe(null))
  }, [id])

  if (!recipe) return <Typography>Loading...</Typography>

  const handleDelete = async () => {
    if (!confirm('แน่ใจว่าต้องการลบสูตรนี้หรือไม่?')) return
    await deleteRecipe(recipe.id)
    router.push('/')
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>{recipe.name}</Typography>
      <Typography variant="h6">ส่วนผสม</Typography>
      <Typography paragraph style={{ whiteSpace: 'pre-line' }}>{recipe.ingredients}</Typography>
      <Typography variant="h6">วิธีทำ</Typography>
      <Typography paragraph style={{ whiteSpace: 'pre-line' }}>{recipe.steps}</Typography>
      <Button color="secondary" variant="contained" onClick={handleDelete}>ลบสูตร</Button>
    </Box>
  )
}
