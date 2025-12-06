"use client"
import React from 'react'
import Link from 'next/link'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { timeAgo } from '../lib/utils'

export default function RecipeCard({ recipe }) {
  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0)

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          {recipe.name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <AccessTimeIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">
            {totalTime > 0 ? `${totalTime} นาที` : 'ไม่ระบุ'}
          </Typography>
          {recipe.difficulty && (
            <Chip 
              label={recipe.difficulty} 
              size="small" 
              color={
                recipe.difficulty === 'ง่าย' ? 'success' : 
                recipe.difficulty === 'ยาก' ? 'error' : 
                'default'
              }
            />
          )}
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          ส่วนผสม {recipe.ingredients?.length || 0} รายการ
        </Typography>

        {recipe.tags && recipe.tags.length > 0 && (
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 1 }}>
            {recipe.tags.slice(0, 3).map((tag, index) => (
              <Chip key={index} label={tag} size="small" variant="outlined" />
            ))}
          </Box>
        )}

        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
          {timeAgo(recipe.createdAt)}
        </Typography>
      </CardContent>

      <CardActions>
        <Button 
          size="small" 
          component={Link} 
          href={`/recipes/${recipe.id}`}
          fullWidth
          variant="contained"
        >
          ดูสูตร
        </Button>
      </CardActions>
    </Card>
  )
}
