/**
 * ========================================
 * app/recipes/[id]/page.js - หน้ารายละเอียดสูตร (Recipe Detail)
 * Route: /recipes/:id
 * ========================================
 * 
 * หน้าที่:
 * - แสดงรายละเอียดสูตรแบบเต็ม (route: /recipes/:id)
 * - ส่วนผสม, ขั้นตอน, notes, metadata
 * - ปุ่ม edit/delete
 * 
 * Components ที่ใช้:
 * - NotesSection: จัดการ notes ในสูตร
 * 
 * ถูกเรียกใช้โดย:
 * - RecipeCard (คลิกที่การ์ด)
 * - RecipeList (คลิกที่สูตร)
 * 
 * Service ที่เรียกใช้:
 * - getRecipeById(): ดึงข้อมูลสูตร
 * - deleteRecipe(): ลบสูตร
 * 
 * TODO List:
 * - [ ] แทน console.error ด้วย Toast
 * - [ ] แทน confirm() และ alert() ด้วย ConfirmDialog
 * - [ ] เพิ่ม loading skeleton
 * - [ ] เพิ่ม print button
 * - [ ] เพิ่ม share button
 * ========================================
 */

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
import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import { getRecipeById, deleteRecipe } from '../../../lib/api'
import { formatDate } from '../../../lib/utils.client'
import NotesSection from '../../../components/NotesSection'

export default function RecipeDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [imageDialogOpen, setImageDialogOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

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
      // TODO: แสดง Toast notification แทน console.error
      // TODO: เพิ่ม Error Boundary สำหรับจัดการ error
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    // TODO: ใช้ ConfirmDialog component แทน confirm()
    if (!confirm('แน่ใจว่าต้องการลบสูตรนี้หรือไม่?')) return

    try {
      await deleteRecipe(recipe.id)
      // TODO: แสดง success Toast แทน redirect ตรง
      router.push('/')
    } catch (error) {
      console.error('Error deleting recipe:', error)
      // TODO: แสดง error Toast แทน alert()
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

  // ถ้าไม่มีรูป ให้แสดง 3 รูป placeholder, ถ้ามีรูปให้แสดงรูปจริง
  const placeholderImages = [
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23e8f5e9" width="800" height="600"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-size="120"%3E🏢%3C/text%3E%3C/svg%3E',
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23fff3e0" width="800" height="600"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-size="120"%3E🏢%3C/text%3E%3C/svg%3E',
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23e3f2fd" width="800" height="600"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-size="120"%3E🏢%3C/text%3E%3C/svg%3E'
  ]
  const images = recipe.thumbnail ? [recipe.thumbnail] : placeholderImages

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', py: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Button 
          onClick={() => router.push('/')}
          sx={{ textTransform: 'none' }}
        >
          ← กลับหน้าหลัก
        </Button>
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={() => router.push(`/recipes/${recipe.id}/edit`)}
        >
          แก้ไข
        </Button>
      </Box>

      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          {recipe.name}
        </Typography>

        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 3 }}>
          สร้างเมื่อ {formatDate(recipe.createdAt)}
        </Typography>

        <Box sx={{ position: 'relative', mb: 4 }}>
          {/* Main Image */}
          <Box 
            sx={{ 
              borderRadius: 2, 
              overflow: 'hidden', 
              maxHeight: 400,
              cursor: 'pointer',
              position: 'relative',
              bgcolor: 'transparent',
              mb: 2,
              '&:hover': {
                '& .image-info-overlay': {
                  opacity: 1
                }
              }
            }}
            onClick={() => setImageDialogOpen(true)}
          >
            <img 
              src={images[currentImageIndex]} 
              alt={recipe.name} 
              style={{ width: '100%', height: 'auto', display: 'block' }} 
            />

            {/* Action Buttons - Top Right */}
            <Box
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                display: 'flex',
                gap: 1,
                zIndex: 2
              }}
            >
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation()
                  router.push(`/recipes/${recipe.id}/edit`)
                }}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.9)',
                  '&:hover': { bgcolor: 'white' }
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation()
                  handleDelete()
                }}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.9)',
                  '&:hover': { bgcolor: 'white' }
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Fullscreen Button - Top Left */}
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation()
                setImageDialogOpen(true)
              }}
              sx={{
                position: 'absolute',
                top: 12,
                left: 12,
                bgcolor: 'rgba(0,0,0,0.6)',
                color: 'white',
                '&:hover': { 
                  bgcolor: 'rgba(0,0,0,0.8)',
                  transform: 'scale(1.1)'
                },
                zIndex: 2
              }}
            >
              <FullscreenIcon fontSize="small" />
            </IconButton>

            {/* Image Info Overlay - Bottom */}
            <Box
              className="image-info-overlay"
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                bgcolor: 'rgba(0,0,0,0.7)',
                color: 'white',
                py: 1.5,
                px: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: 0.8,
                transition: 'opacity 0.3s'
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {currentImageIndex + 1} / {images.length}
              </Typography>
              <Typography variant="body2" sx={{ mx: 2, opacity: 0.7 }}>
                •
              </Typography>
              <Typography variant="body2">
                คลิกเพื่อดูขนาดเต็ม
              </Typography>
            </Box>
          </Box>

          {/* Thumbnail Gallery */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            {images.map((img, index) => (
              <Box
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                sx={{
                  width: 120,
                  height: 90,
                  borderRadius: 1,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: currentImageIndex === index ? '3px solid' : '3px solid transparent',
                  borderColor: currentImageIndex === index ? 'primary.main' : 'transparent',
                  opacity: currentImageIndex === index ? 1 : 0.6,
                  transition: 'all 0.3s',
                  '&:hover': {
                    opacity: 1,
                    transform: 'scale(1.05)'
                  }
                }}
              >
                <img
                  src={img}
                  alt={`${recipe.name} ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          ส่วนผสม
        </Typography>
        <Box component="ol" sx={{ pl: 2.5, mb: 4 }}>
          {recipe.ingredients.map((ingredient, index) => (
            <Box component="li" key={index} sx={{ mb: 0.5 }}>
              <Typography variant="body1">{ingredient}</Typography>
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          วิธีทำ
        </Typography>
        <Box component="ol" sx={{ pl: 2.5, mb: 4 }}>
          {recipe.steps.map((step, index) => (
            <Box component="li" key={index} sx={{ mb: 2 }}>
              <Typography variant="body1">{step}</Typography>
            </Box>
          ))}
        </Box>

        {recipe.tags && recipe.tags.length > 0 && (
          <>
            <Divider sx={{ my: 3 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Tag #
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
              {recipe.tags.map((tag, index) => (
                <Chip key={index} label={tag} size="small" />
              ))}
            </Box>
          </>
        )}
      </Paper>

      <Box sx={{ mt: 3 }}>
        <NotesSection 
          recipeId={recipe.id} 
          notes={recipe.notes || []} 
          onUpdate={loadRecipe}
        />
      </Box>

      <Dialog
        open={imageDialogOpen}
        onClose={() => setImageDialogOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <IconButton
          onClick={() => setImageDialogOpen(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'white',
            bgcolor: 'rgba(0,0,0,0.5)',
            zIndex: 1,
            '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ p: 0, position: 'relative', bgcolor: 'black', minHeight: 400 }}>
          <Box
            component="img"
            src={images[currentImageIndex]}
            alt={recipe.name}
            sx={{
              width: '100%',
              height: 'auto',
              maxHeight: '90vh',
              objectFit: 'contain'
            }}
          />
          <IconButton
            onClick={handlePrevImage}
            sx={{
              position: 'absolute',
              left: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'white',
              bgcolor: 'rgba(0,0,0,0.5)',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }
            }}
          >
            <ChevronLeftIcon fontSize="large" />
          </IconButton>
          <IconButton
            onClick={handleNextImage}
            sx={{
              position: 'absolute',
              right: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'white',
              bgcolor: 'rgba(0,0,0,0.5)',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }
            }}
          >
            <ChevronRightIcon fontSize="large" />
          </IconButton>
          <Box
            sx={{
              position: 'absolute',
              bottom: 16,
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'white',
              bgcolor: 'rgba(0,0,0,0.5)',
              px: 2,
              py: 0.5,
              borderRadius: 1
            }}
          >
            {currentImageIndex + 1} / {images.length}
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  )
}
