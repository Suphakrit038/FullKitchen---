"use client"
import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { addRecipe } from '../lib/recipes'
import { useRouter } from 'next/navigation'

export default function RecipeForm() {
  const [name, setName] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [steps, setSteps] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = { name, ingredients, steps }
    await addRecipe(payload)
    router.push('/')
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="ชื่อเมนู" value={name} onChange={(e) => setName(e.target.value)} required />
      <TextField label="ส่วนผสม" value={ingredients} onChange={(e) => setIngredients(e.target.value)} multiline rows={3} required />
      <TextField label="วิธีทำ" value={steps} onChange={(e) => setSteps(e.target.value)} multiline rows={6} required />
      <Button type="submit" variant="contained">บันทึก</Button>
    </Box>
  )
}
