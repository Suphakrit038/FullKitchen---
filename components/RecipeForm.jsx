/**
 * ========================================
 * components/RecipeForm.jsx - Add/Edit Recipe Form
 * ========================================
 * 
 * 📝 คำอธิบาย:
 * Form component สำหรับเพิ่มหรือแก้ไขสูตรอาหาร
 * รองรับทั้ง mode="add" และ mode="edit"
 * มีระบบ validation, auto-save draft, dynamic arrays
 * 
 * 🎯 Fields:
 * - ชื่อเมนู (required)
 * - ส่วนผสม (array - dynamic add/remove)
 * - ขั้นตอน (array - dynamic add/remove)
 * - tags (array - add by enter key)
 * - เวลาเตรียม (นาที)
 * - เวลาทำ (นาที)
 * - ระดับความยาก (dropdown)
 * 
 * 💡 Tips สำหรับพัฒนาต่อ:
 * 1. เพิ่ม thumbnail field (image upload)
 * 2. แทน alert() ด้วย Toast notifications
 * 3. เพิ่ม rich text editor สำหรับขั้นตอน
 * 4. เพิ่ม ingredient suggestions (autocomplete)
 * 5. เพิ่ม drag-to-reorder สำหรับขั้นตอน
 * 6. เพิ่ม preview mode ก่อน save
 * 
 * ⚠️ สิ่งที่ต้องระวัง:
 * - auto-save ไปยัง localStorage ทุกครั้งที่ formData เปลี่ยน (อาจช้า)
 * - ไม่มี unsaved changes warning เมื่อออกจากหน้า
 * - validation แค่ฝั่ง client - ต้อง validate server side ด้วย
 * - arrays เปล่าจะผ่าน validation (ควรเช็ค length > 0)
 * ========================================
 */

"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import { addRecipe, updateRecipe } from '../lib/recipes'

export default function RecipeForm({ recipe = null, mode = 'add' }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    ingredients: [''],
    steps: [''],
    tags: [],
    prepTime: '',
    cookTime: '',
    difficulty: 'ปานกลาง'
    // TODO: เพิ่ม thumbnail field สำหรับอัปโหลดรูป
  })
  const [tagInput, setTagInput] = useState('')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (recipe) {
      setFormData({
        name: recipe.name || '',
        ingredients: recipe.ingredients || [''],
        steps: recipe.steps || [''],
        tags: recipe.tags || [],
        prepTime: recipe.prepTime || '',
        cookTime: recipe.cookTime || '',
        difficulty: recipe.difficulty || 'ปานกลาง'
      })
    }

    // Load from localStorage if adding new recipe
    if (mode === 'add' && !recipe) {
      const draft = localStorage.getItem('recipe-draft')
      if (draft) {
        try {
          const parsed = JSON.parse(draft)
          setFormData(parsed)
        } catch (e) {
          console.error('Failed to load draft:', e)
        }
      }
    }
  }, [recipe, mode])

  // Auto-save draft
  useEffect(() => {
    if (mode === 'add' && formData.name) {
      localStorage.setItem('recipe-draft', JSON.stringify(formData))
    }
  }, [formData, mode])

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]]
    newArray[index] = value
    handleChange(field, newArray)
  }

  const addArrayItem = (field) => {
    handleChange(field, [...formData[field], ''])
  }

  const removeArrayItem = (field, index) => {
    if (formData[field].length > 1) {
      const newArray = formData[field].filter((_, i) => i !== index)
      handleChange(field, newArray)
    }
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      handleChange('tags', [...formData.tags, tagInput.trim()])
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove) => {
    handleChange('tags', formData.tags.filter(tag => tag !== tagToRemove))
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'กรุณาระบุชื่อเมนู'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'ชื่อเมนูต้องมีอย่างน้อย 2 ตัวอักษร'
    }

    const validIngredients = formData.ingredients.filter(i => i.trim())
    if (validIngredients.length === 0) {
      newErrors.ingredients = 'กรุณาระบุส่วนผสมอย่างน้อย 1 รายการ'
    }

    const validSteps = formData.steps.filter(s => s.trim())
    if (validSteps.length === 0) {
      newErrors.steps = 'กรุณาระบุขั้นตอนอย่างน้อย 1 ขั้นตอน'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    try {
      setLoading(true)

      const recipeData = {
        ...formData,
        ingredients: formData.ingredients.filter(i => i.trim()),
        steps: formData.steps.filter(s => s.trim()),
        prepTime: parseInt(formData.prepTime) || 0,
        cookTime: parseInt(formData.cookTime) || 0
      }

      if (mode === 'edit' && recipe) {
        await updateRecipe(recipe.id, recipeData)
        // TODO: แสดง success Toast
        router.push(`/recipes/${recipe.id}`)
      } else {
        const newRecipe = await addRecipe(recipeData)
        localStorage.removeItem('recipe-draft')
        // TODO: แสดง success Toast
        router.push(`/recipes/${newRecipe.id}`)
      }
    } catch (error) {
      console.error('Error saving recipe:', error)
      // TODO: แสดง error Toast แทน error state
      setErrors({ submit: error.message || 'เกิดข้อผิดพลาดในการบันทึก' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
        {mode === 'edit' ? 'แก้ไขสูตร' : 'เพิ่มสูตรใหม่'}
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>ข้อมูลพื้นฐาน</Typography>

        <TextField
          fullWidth
          label="ชื่อเมนู"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
          margin="normal"
          required
        />

        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <TextField
            label="เวลาเตรียม (นาที)"
            type="number"
            value={formData.prepTime}
            onChange={(e) => handleChange('prepTime', e.target.value)}
            sx={{ flex: 1 }}
          />
          <TextField
            label="เวลาปรุง (นาที)"
            type="number"
            value={formData.cookTime}
            onChange={(e) => handleChange('cookTime', e.target.value)}
            sx={{ flex: 1 }}
          />
          <FormControl sx={{ flex: 1 }}>
            <InputLabel>ระดับความยาก</InputLabel>
            <Select
              value={formData.difficulty}
              onChange={(e) => handleChange('difficulty', e.target.value)}
              label="ระดับความยาก"
            >
              <MenuItem value="ง่าย">ง่าย</MenuItem>
              <MenuItem value="ปานกลาง">ปานกลาง</MenuItem>
              <MenuItem value="ยาก">ยาก</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>ส่วนผสม</Typography>
        {errors.ingredients && (
          <Typography color="error" variant="body2" sx={{ mb: 1 }}>
            {errors.ingredients}
          </Typography>
        )}
        {formData.ingredients.map((ingredient, index) => (
          <Box key={index} sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              fullWidth
              label={`ส่วนผสม ${index + 1}`}
              value={ingredient}
              onChange={(e) => handleArrayChange('ingredients', index, e.target.value)}
            />
            <IconButton
              color="error"
              onClick={() => removeArrayItem('ingredients', index)}
              disabled={formData.ingredients.length === 1}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
        <Button
          startIcon={<AddIcon />}
          onClick={() => addArrayItem('ingredients')}
          variant="outlined"
        >
          เพิ่มส่วนผสม
        </Button>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>ขั้นตอนการทำ</Typography>
        {errors.steps && (
          <Typography color="error" variant="body2" sx={{ mb: 1 }}>
            {errors.steps}
          </Typography>
        )}
        {formData.steps.map((step, index) => (
          <Box key={index} sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              fullWidth
              label={`ขั้นตอน ${index + 1}`}
              value={step}
              onChange={(e) => handleArrayChange('steps', index, e.target.value)}
              multiline
              rows={2}
            />
            <IconButton
              color="error"
              onClick={() => removeArrayItem('steps', index)}
              disabled={formData.steps.length === 1}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
        <Button
          startIcon={<AddIcon />}
          onClick={() => addArrayItem('steps')}
          variant="outlined"
        >
          เพิ่มขั้นตอน
        </Button>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>แท็ก</Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField
            fullWidth
            label="เพิ่มแท็ก"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addTag()
              }
            }}
          />
          <Button onClick={addTag} variant="outlined">เพิ่ม</Button>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {formData.tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              onDelete={() => removeTag(tag)}
              color="primary"
              variant="outlined"
            />
          ))}
        </Box>
      </Paper>

      {errors.submit && (
        <Typography color="error" sx={{ mb: 2 }}>
          {errors.submit}
        </Typography>
      )}

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          type="submit"
          variant="contained"
          size="large"
          startIcon={<SaveIcon />}
          disabled={loading}
          fullWidth
        >
          {loading ? 'กำลังบันทึก...' : mode === 'edit' ? 'บันทึกการแก้ไข' : 'บันทึกสูตร'}
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={() => router.back()}
          disabled={loading}
        >
          ยกเลิก
        </Button>
      </Box>
    </Box>
  )
}
