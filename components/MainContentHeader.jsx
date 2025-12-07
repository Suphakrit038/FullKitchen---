"use client"
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import GridViewIcon from '@mui/icons-material/GridView'
import ViewListIcon from '@mui/icons-material/ViewList'

export default function MainContentHeader({ 
  recipeCount = 0,
  onViewModeChange
}) {
  const [viewMode, setViewMode] = useState('grid')
  const [activeTag, setActiveTag] = useState(null)

  const quickTags = ['ผัด', 'ทอด', 'ต้ม', 'นึ่ง', 'ย่าง']

  const handleViewChange = (event, newMode) => {
    if (newMode !== null) {
      setViewMode(newMode)
      onViewModeChange?.(newMode)
    }
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5, color: 'text.primary' }}>
            Main Catalog Recipe List / Menu Index
          </Typography>
          <Typography variant="body2" color="text.secondary">
            กำลังแสดง <strong>{recipeCount}</strong> สูตรอาหาร
          </Typography>
        </Box>

        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={handleViewChange}
          size="small"
        >
          <ToggleButton value="grid">
            <GridViewIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton value="list">
            <ViewListIcon fontSize="small" />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
          Tag #
        </Typography>
        {quickTags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            color={activeTag === tag ? 'primary' : 'default'}
            clickable
            size="small"
            variant={activeTag === tag ? 'filled' : 'outlined'}
            sx={{ 
              borderRadius: 1,
              '&:hover': {
                bgcolor: activeTag === tag ? 'primary.dark' : 'action.hover'
              }
            }}
          />
        ))}
      </Box>
    </Box>
  )
}
