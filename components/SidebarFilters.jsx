"use client"
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Checkbox from '@mui/material/Checkbox'
import Slider from '@mui/material/Slider'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'

export default function SidebarFilters({ onFilterChange, resultCount = 0 }) {
  const [category, setCategory] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [selectedCalories, setSelectedCalories] = useState([])

  const categories = [
    { value: 'ข้าว', label: 'ข้าว' },
    { value: 'ก๋วยเตี๋ยว', label: 'ก๋วยเตี๋ยว' },
    { value: 'ของว่าง', label: 'ของว่าง' },
    { value: 'เครื่องดื่ม', label: 'เครื่องดื่ม' },
    { value: 'ซุป', label: 'ซุป' },
    { value: 'สลัด', label: 'สลัด' }
  ]

  const calorieOptions = [
    { value: 'low', label: 'ต่ำกว่า 300 แคล' },
    { value: 'medium', label: '300-600 แคล' },
    { value: 'high', label: 'สูงกว่า 600 แคล' }
  ]

  const cookingTags = [
    { value: 'ผัด' },
    { value: 'ต้ม' },
    { value: 'ทอด' },
    { value: 'ย่าง' },
    { value: 'นึ่ง' },
    { value: 'ปิ้ง' }
  ]

  const handleTagToggle = (tag) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag]
    setSelectedTags(newTags)
    onFilterChange?.({ category, tags: newTags, calories: selectedCalories })
  }

  const handleCalorieToggle = (cal) => {
    const newCals = selectedCalories.includes(cal)
      ? selectedCalories.filter(c => c !== cal)
      : [...selectedCalories, cal]
    setSelectedCalories(newCals)
    onFilterChange?.({ category, tags: selectedTags, calories: newCals })
  }

  const handleCategoryChange = (cat) => {
    setCategory(cat)
    onFilterChange?.({ category: cat, tags: selectedTags, calories: selectedCalories })
  }

  const handleClearAll = () => {
    setCategory('')
    setSelectedTags([])
    setSelectedCalories([])
    onFilterChange?.({ category: '', tags: [], calories: [] })
  }

  const hasActiveFilters = category || selectedTags.length > 0 || selectedCalories.length > 0

  return (
    <Paper 
      elevation={2}
      sx={{ 
        p: 3, 
        position: 'sticky', 
        top: 90, 
        maxHeight: 'calc(100vh - 110px)', 
        overflow: 'auto',
        bgcolor: 'white',
        border: '1px solid',
        borderColor: 'grey.200'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 700, 
            fontSize: '18px',
            color: 'text.primary'
          }}
        >
          ตัวกรอง
        </Typography>
        {hasActiveFilters && (
          <Button 
            size="small" 
            onClick={handleClearAll}
            sx={{ 
              fontSize: '13px',
              textTransform: 'none',
              color: 'error.main',
              minWidth: 'auto',
              p: 0.5
            }}
          >
            ล้างทั้งหมด
          </Button>
        )}
      </Box>

      {resultCount > 0 && (
        <Box sx={{ mb: 3, p: 2, bgcolor: 'primary.50', borderRadius: 1, border: '1px solid', borderColor: 'primary.200' }}>
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
            พบ {resultCount} เมนู
          </Typography>
        </Box>
      )}

      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, fontSize: '15px', color: 'text.primary' }}>
        ประเภทอาหาร
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
        {categories.map((cat) => (
          <Button
            key={cat.value}
            variant={category === cat.value ? 'contained' : 'outlined'}
            onClick={() => handleCategoryChange(cat.value)}
            sx={{
              justifyContent: 'flex-start',
              textTransform: 'none',
              fontSize: '14px',
              fontWeight: category === cat.value ? 600 : 400,
              py: 1,
              px: 2,
              borderColor: 'grey.300',
              color: category === cat.value ? 'white' : 'text.primary',
              '&:hover': {
                bgcolor: category === cat.value ? 'primary.dark' : 'grey.50'
              }
            }}
          >
            {cat.label}
          </Button>
        ))}
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, fontSize: '15px', color: 'text.primary' }}>
        แคลอรี่
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mb: 3 }}>
        {calorieOptions.map((opt) => (
          <FormControlLabel
            key={opt.value}
            control={
              <Checkbox 
                size="small"
                checked={selectedCalories.includes(opt.value)}
                onChange={() => handleCalorieToggle(opt.value)}
              />
            }
            label={<span style={{ fontSize: '14px' }}>{opt.label}</span>}
            sx={{ mb: 0 }}
          />
        ))}
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, fontSize: '15px', color: 'text.primary' }}>
        วิธีทำ
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {cookingTags.map((tag) => (
          <Chip
            key={tag.value}
            label={tag.value}
            clickable
            onClick={() => handleTagToggle(tag.value)}
            color={selectedTags.includes(tag.value) ? 'primary' : 'default'}
            variant={selectedTags.includes(tag.value) ? 'filled' : 'outlined'}
            sx={{ 
              fontSize: '14px',
              fontWeight: selectedTags.includes(tag.value) ? 600 : 400,
              height: 32,
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          />
        ))}
      </Box>
    </Paper>
  )
}
