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

export default function SidebarFilters({ onFilterChange }) {
  const [category, setCategory] = useState('ทานเล่น')
  const [selectedTags, setSelectedTags] = useState([])

  const categories = [
    { value: 'soup', label: 'ซุป', count: 6 },
    { value: 'appetizer', label: 'ทานเล่น', count: 97 },
    { value: 'dessert', label: 'ขนม', count: 4 },
    { value: 'fish', label: 'ปลา', count: 111 },
    { value: 'other', label: 'อื่นๆ', count: 8 }
  ]

  const calorieOptions = [
    { label: '500cal and Under', count: 30 },
    { label: '1000cal and Under', count: 16 },
    { label: '2000cal and Upper', count: 92 }
  ]

  const cookingTags = [
    { value: 'ผัด', count: 15 },
    { value: 'ต้ม', count: 14 },
    { value: 'ปิ้ง', count: 15 },
    { value: 'ทอด', count: 11 },
    { value: 'นึ่ง', count: 8 },
    { value: 'ย่าง', count: 12 }
  ]

  const handleTagToggle = (tag) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag]
    setSelectedTags(newTags)
    onFilterChange?.({ category, tags: newTags })
  }

  const handleClear = () => {
    setCategory('')
    setSelectedTags([])
    onFilterChange?.({ category: '', tags: [] })
  }

  return (
    <Paper 
      elevation={2}
      sx={{ 
        p: 2.5, 
        position: 'sticky', 
        top: 90, 
        maxHeight: 'calc(100vh - 110px)', 
        overflow: 'auto',
        bgcolor: '#f8f9fa'
      }}
    >
      <Typography 
        variant="h6" 
        sx={{ 
          fontWeight: 700, 
          mb: 3,
          color: 'text.secondary',
          fontSize: '0.875rem',
          textTransform: 'uppercase',
          letterSpacing: 0.5
        }}
      >
        Narrow Choices
      </Typography>

      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5, fontSize: '0.875rem' }}>
        ประเภท
      </Typography>
      <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((cat) => (
          <FormControlLabel
            key={cat.value}
            value={cat.value}
            control={<Radio size="small" />}
            label={
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <span>{cat.label}</span>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>({cat.count})</Typography>
              </Box>
            }
            sx={{ mb: 0.5, '& .MuiFormControlLabel-label': { width: '100%' } }}
          />
        ))}
      </RadioGroup>

      <Divider sx={{ my: 2.5 }} />

      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5, fontSize: '0.875rem' }}>
        แคลอรี่
      </Typography>
      {calorieOptions.map((opt) => (
        <FormControlLabel
          key={opt.label}
          control={<Checkbox size="small" />}
          label={
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <span style={{ fontSize: '0.875rem' }}>{opt.label}</span>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>({opt.count})</Typography>
            </Box>
          }
          sx={{ mb: 0.5, '& .MuiFormControlLabel-label': { width: '100%' } }}
        />
      ))}
      <Box sx={{ px: 1, mt: 2 }}>
        <Slider 
          defaultValue={[0, 100]} 
          size="small" 
          valueLabelDisplay="auto"
          marks={[
            { value: 0, label: '0' },
            { value: 100, label: '10,000' }
          ]}
        />
      </Box>

      <Divider sx={{ my: 2.5 }} />

      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5, fontSize: '0.875rem' }}>
        Tag #
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {cookingTags.map((tag) => (
          <FormControlLabel
            key={tag.value}
            control={
              <Checkbox 
                size="small"
                checked={selectedTags.includes(tag.value)}
                onChange={() => handleTagToggle(tag.value)}
              />
            }
            label={
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem' }}>{tag.value}</span>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>({tag.count})</Typography>
              </Box>
            }
            sx={{ mb: 0.5, '& .MuiFormControlLabel-label': { width: '100%' } }}
          />
        ))}
      </Box>
    </Paper>
  )
}
