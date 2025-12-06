"use client"
import React, { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import CircularProgress from '@mui/material/CircularProgress'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import { getRecipeById, deleteRecipe } from '../../../lib/recipes'
import { formatDate } from '../../../lib/utils'
import NotesSection from '../../../components/NotesSection'

export default function RecipeDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadRecipe()
  }, [id])

  async function loadRecipe() {
    if (!id) return
    
    try {
      setLoading(true)
      const data = await getRecipeById(id)
      setRecipe(data)
    } catch (error) {
      console.error('Error loading recipe:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('แน่ใจว่าต้องการลบสูตรนี้หรือไม่?')) return

    try {
      await deleteRecipe(recipe.id)
      router.push('/')
    } catch (error) {
      console.error('Error deleting recipe:', error)
      alert('เกิดข้อผิดพลาดในการลบ')
    }
  }

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
        <Typography variant="h5" gutterBottom>
          ไม่พบสูตรนี้
        </Typography>
        <Button variant="contained" onClick={() => router.push('/')}>
          กลับหน้าหลัก
        </Button>
      </Box>
    )
  }

  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0)

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
            {recipe.name}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => router.push(`/recipes/${recipe.id}/edit`)}
            >
              แก้ไข
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
            >
              ลบ
            </Button>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
          {recipe.difficulty && (
            <Chip 
              label={recipe.difficulty}
              color={
                recipe.difficulty === 'ง่าย' ? 'success' : 
                recipe.difficulty === 'ยาก' ? 'error' : 
                'default'
              }
            />
          )}
          {totalTime > 0 && (
            <Chip 
              icon={<AccessTimeIcon />}
              label={`${totalTime} นาที`}
            />
          )}
          {recipe.prepTime > 0 && (
            <Chip 
              label={`เตรียม ${recipe.prepTime} นาที`}
              variant="outlined"
            />
          )}
          {recipe.cookTime > 0 && (
            <Chip 
              label={`ปรุง ${recipe.cookTime} นาที`}
              variant="outlined"
            />
          )}
        </Box>

        {recipe.tags && recipe.tags.length > 0 && (
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
            {recipe.tags.map((tag, index) => (
              <Chip key={index} label={tag} size="small" variant="outlined" />
            ))}
          </Box>
        )}

        <Typography variant="caption" color="text.secondary">
          สร้างเมื่อ {formatDate(recipe.createdAt)}
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <RestaurantIcon color="primary" />
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            ส่วนผสม
          </Typography>
        </Box>
        <List>
          {recipe.ingredients.map((ingredient, index) => (
            <ListItem key={index} sx={{ py: 0.5 }}>
              <ListItemText 
                primary={`${index + 1}. ${ingredient}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          วิธีทำ
        </Typography>
        <List>
          {recipe.steps.map((step, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                <Box
                  sx={{
                    minWidth: 36,
                    height: 36,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    mr: 2,
                    flexShrink: 0
                  }}
                >
                  {index + 1}
                </Box>
                <ListItemText
                  primary={step}
                  sx={{ m: 0 }}
                />
              </ListItem>
              {index < recipe.steps.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>

      <NotesSection 
        recipeId={recipe.id} 
        notes={recipe.notes || []} 
        onUpdate={loadRecipe}
      />
    </Box>
  )
}
