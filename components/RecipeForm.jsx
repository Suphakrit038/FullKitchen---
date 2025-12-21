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
import Autocomplete from '@mui/material/Autocomplete'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import { addRecipe, updateRecipe, getAllRecipes } from '../lib/api'

export default function RecipeForm({ recipe = null, mode = 'add' }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    ingredients: [{ name: '', amount: '', unit: '' }],
    steps: [''],
    equipment: [''],
    tags: [],
    prepTime: '',
    cookTime: '',
    difficulty: 'ปานกลาง',
    thumbnail: '',
    images: []
  })
  const [errors, setErrors] = useState({})
  const [suggestions, setSuggestions] = useState({
    ingredientNames: [],
    units: [],
    equipment: [],
    tags: []
  })

  useEffect(() => {
    if (recipe) {
      setFormData({
        name: recipe.name || '',
        ingredients: recipe.ingredients?.length > 0 
          ? recipe.ingredients.map(ing => {
              if (typeof ing === 'string') {
                return { name: ing, amount: '', unit: '' }
              }
              return { name: ing.name || '', amount: ing.amount || '', unit: ing.unit || '' }
            })
          : [{ name: '', amount: '', unit: '' }],
        steps: recipe.steps || [''],
        equipment: recipe.equipment || [''],
        tags: recipe.tags || [],
        prepTime: recipe.prepTime || '',
        cookTime: recipe.cookTime || '',
        difficulty: recipe.difficulty || 'ปานกลาง',
        thumbnail: recipe.thumbnail || '',
        images: recipe.images || []
      })
    }

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

    async function loadSuggestions() {
      try {
        const recipes = await getAllRecipes()
        const allIngredientNames = new Set()
        const allUnits = new Set()
        const allEquipment = new Set()
        const allTags = new Set()

        recipes.forEach(r => {
          r.ingredients?.forEach(ing => {
            if (typeof ing === 'string') {
              allIngredientNames.add(ing)
            } else {
              if (ing.name) allIngredientNames.add(ing.name)
              if (ing.unit) allUnits.add(ing.unit)
            }
          })
          r.equipment?.forEach(e => allEquipment.add(e))
          r.tags?.forEach(t => allTags.add(t))
        })

        const commonUnits = ['กรัม', 'กิโลกรัม', 'ลิตร', 'มิลลิลิตร', 'ช้อนโต๊ะ', 'ช้อนชา', 'ถ้วย', 'ฟอง', 'แผ่น', 'ชิ้น', 'หัว', 'เส้น', 'ใบ', 'กิ่ง', 'ซอง', 'ขีด']
        commonUnits.forEach(u => allUnits.add(u))

        setSuggestions({
          ingredientNames: Array.from(allIngredientNames).sort(),
          units: Array.from(allUnits).sort(),
          equipment: Array.from(allEquipment).sort(),
          tags: Array.from(allTags).sort()
        })
      } catch (error) {
        console.error('Failed to load suggestions:', error)
      }
    }

    loadSuggestions()
  }, [recipe, mode])

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

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...formData.ingredients]
    newIngredients[index] = { ...newIngredients[index], [field]: value }
    handleChange('ingredients', newIngredients)
  }

  const addArrayItem = (field) => {
    if (field === 'ingredients') {
      handleChange(field, [...formData[field], { name: '', amount: '', unit: '' }])
    } else {
      handleChange(field, [...formData[field], ''])
    }
  }

  const removeArrayItem = (field, index) => {
    if (formData[field].length > 1) {
      const newArray = formData[field].filter((_, i) => i !== index)
      handleChange(field, newArray)
    }
  }

  const handleImageUrlAdd = () => {
    if (formData.images.length === 0) {
      handleChange('images', [''])
    } else {
      handleChange('images', [...formData.images, ''])
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    const files = Array.from(e.dataTransfer.files)
    const imageFiles = files.filter(file => file.type.startsWith('image/'))
    
    if (imageFiles.length > 0) {
      alert('การอัปโหลดรูปภาพต้องการ backend service\nกรุณาใช้ URL แทนในตอนนี้')
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'กรุณาระบุชื่อเมนู'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'ชื่อเมนูต้องมีอย่างน้อย 2 ตัวอักษร'
    }

    const validIngredients = formData.ingredients.filter(i => i.name.trim())
    if (validIngredients.length === 0) {
      newErrors.ingredients = 'กรุณาระบุส่วนผสมอย่างน้อย 1 รายการ'
    }

    const validSteps = formData.steps.filter(s => s.trim())
    if (validSteps.length === 0) {
      newErrors.steps = 'กรุณาระบุขั้นตอนอย่างน้อย 1 ขั้นตอน'
    }

    const validEquipment = formData.equipment.filter(e => e.trim())
    if (validEquipment.length === 0) {
      newErrors.equipment = 'กรุณาระบุอุปกรณ์อย่างน้อย 1 รายการ'
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
        ingredients: formData.ingredients
          .filter(i => i.name.trim())
          .map(i => ({
            name: i.name.trim(),
            amount: i.amount.trim(),
            unit: i.unit.trim()
          })),
        steps: formData.steps.filter(s => s.trim()),
        equipment: formData.equipment.filter(e => e.trim()),
        prepTime: parseInt(formData.prepTime) || 0,
        cookTime: parseInt(formData.cookTime) || 0
      }

      if (mode === 'edit' && recipe) {
        await updateRecipe(recipe.id, recipeData)
        router.push(`/recipes/${recipe.id}`)
      } else {
        const newRecipe = await addRecipe(recipeData)
        localStorage.removeItem('recipe-draft')
        router.push(`/recipes/${newRecipe.id}`)
      }
    } catch (error) {
      console.error('Error saving recipe:', error)
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
        <Typography variant="h6" gutterBottom>รูปภาพ</Typography>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            รูปหลัก (Thumbnail)
          </Typography>
          <TextField
            fullWidth
            label="URL รูปหลัก"
            value={formData.thumbnail}
            onChange={(e) => handleChange('thumbnail', e.target.value)}
            placeholder="https://example.com/image.jpg"
            helperText="ใส่ URL ของรูปภาพหลักที่ต้องการแสดง"
          />
          {formData.thumbnail && (
            <Box sx={{ mt: 2 }}>
              <img 
                src={formData.thumbnail} 
                alt="Preview" 
                style={{ 
                  width: '100%', 
                  maxHeight: 300, 
                  objectFit: 'cover', 
                  borderRadius: 8 
                }}
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
            </Box>
          )}
        </Box>

        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            รูปเพิ่มเติม (ไม่บังคับ)
          </Typography>
          
          <Box
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            sx={{
              border: '2px dashed #ccc',
              borderRadius: 2,
              p: 4,
              mb: 2,
              textAlign: 'center',
              bgcolor: '#f9f9f9',
              cursor: 'pointer',
              transition: 'all 0.3s',
              '&:hover': {
                borderColor: '#1976d2',
                bgcolor: '#f0f7ff'
              }
            }}
          >
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
              🖼️ ลากและวางรูปภาพที่นี่
            </Typography>
            <Typography variant="body2" color="text.secondary">
              หรือใส่ URL ด้านล่าง
            </Typography>
          </Box>

          {formData.images.map((image, index) => (
            <Box key={index} sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                fullWidth
                label={`URL รูปที่ ${index + 1}`}
                value={image}
                onChange={(e) => handleArrayChange('images', index, e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              {image && (
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: 1,
                    overflow: 'hidden',
                    flexShrink: 0
                  }}
                >
                  <img
                    src={image}
                    alt={`Preview ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                </Box>
              )}
              <IconButton
                color="error"
                onClick={() => removeArrayItem('images', index)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button
            startIcon={<AddIcon />}
            onClick={handleImageUrlAdd}
            variant="outlined"
            size="small"
          >
            เพิ่มรูปภาพ
          </Button>
        </Box>
      </Paper>

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
          <Box key={index} sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'flex-start' }}>
            <Autocomplete
              freeSolo
              sx={{ flex: 2 }}
              options={suggestions.ingredientNames}
              value={ingredient.name}
              onInputChange={(event, newValue) => {
                handleIngredientChange(index, 'name', newValue || '')
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="ชื่อวัตถุดิบ"
                  placeholder="เช่น ไข่, น้ำตาล"
                />
              )}
            />
            <TextField
              sx={{ flex: 1 }}
              label="จำนวน"
              value={ingredient.amount}
              onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
              placeholder="2"
            />
            <Autocomplete
              freeSolo
              sx={{ flex: 1 }}
              options={suggestions.units}
              value={ingredient.unit}
              onInputChange={(event, newValue) => {
                handleIngredientChange(index, 'unit', newValue || '')
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="หน่วย"
                  placeholder="ฟอง, กรัม"
                />
              )}
            />
            <IconButton
              color="error"
              onClick={() => removeArrayItem('ingredients', index)}
              disabled={formData.ingredients.length === 1}
              sx={{ mt: 1 }}
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
        <Typography variant="h6" gutterBottom>อุปกรณ์ในการทำอาหาร</Typography>
        {errors.equipment && (
          <Typography color="error" variant="body2" sx={{ mb: 1 }}>
            {errors.equipment}
          </Typography>
        )}
        {formData.equipment.map((item, index) => (
          <Box key={index} sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Autocomplete
              freeSolo
              fullWidth
              options={suggestions.equipment}
              value={item}
              onInputChange={(event, newValue) => {
                handleArrayChange('equipment', index, newValue || '')
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={`อุปกรณ์ ${index + 1}`}
                />
              )}
            />
            <IconButton
              color="error"
              onClick={() => removeArrayItem('equipment', index)}
              disabled={formData.equipment.length === 1}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
        <Button
          startIcon={<AddIcon />}
          onClick={() => addArrayItem('equipment')}
          variant="outlined"
        >
          เพิ่มอุปกรณ์
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
        
        <Autocomplete
          multiple
          freeSolo
          options={suggestions.tags}
          value={formData.tags}
          onChange={(event, newValue) => {
            handleChange('tags', newValue)
          }}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                key={index}
                label={option}
                {...getTagProps({ index })}
                color="primary"
                variant="outlined"
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="เพิ่มแท็ก"
              placeholder="พิมพ์และกด Enter หรือเลือกจากรายการ"
              helperText="สามารถเลือกหลายแท็กได้ หรือพิมพ์ใหม่"
            />
          )}
        />
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
