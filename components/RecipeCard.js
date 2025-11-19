"use client"
import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardActionArea from '@mui/material/CardActionArea'
import Box from '@mui/material/Box'
import { useRouter } from 'next/navigation'

export default function RecipeCard({ recipe }) {
  const router = useRouter()
  return (
    <Card>
      <CardActionArea onClick={() => router.push(`/recipes/${recipe.id}`)}>
        <Box style={{ height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
          <Typography variant="h6">{recipe.name}</Typography>
        </Box>
        <CardContent>
          <Typography variant="body2" color="text.secondary">{recipe.ingredients?.split(',').length || 0} วัตถุดิบ</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
