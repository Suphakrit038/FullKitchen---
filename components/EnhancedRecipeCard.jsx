"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import FlagIcon from '@mui/icons-material/Flag'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { timeAgo } from '../lib/utils.client'

export default function EnhancedRecipeCard({ recipe }) {
  const [bookmarked, setBookmarked] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0)

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6
        }
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 8,
          left: 8,
          zIndex: 2
        }}
      >
        <FlagIcon
          sx={{
            color: '#FFD700',
            fontSize: 28,
            filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.4))'
          }}
        />
      </Box>

      <IconButton
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          bgcolor: 'rgba(255,255,255,0.95)',
          '&:hover': { bgcolor: 'white' },
          zIndex: 2,
          boxShadow: 1
        }}
        size="small"
        onClick={() => setBookmarked(!bookmarked)}
      >
        {bookmarked ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
      </IconButton>

      <CardMedia
        sx={{
          height: 180,
          bgcolor: '#e8f5e9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {recipe.thumbnail ? (
          <img src={recipe.thumbnail} alt={recipe.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary">ไม่มีรูปภาพ</Typography>
          </Box>
        )}
      </CardMedia>

      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography 
          variant="h5" 
          gutterBottom 
          noWrap 
          sx={{ 
            fontWeight: 700,
            fontSize: '22px',
            color: 'text.primary',
            mb: 1.5,
            lineHeight: 1.3
          }}
        >
          {recipe.name}
        </Typography>

        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 1.5, 
            fontSize: '14px',
            lineHeight: 1.5,
            fontWeight: 400
          }}
        >
          {recipe.ingredients?.length || 0} วัตถุดิบ • {recipe.steps?.length || 0} ขั้นตอน • {(recipe.prepTime || 0) + (recipe.cookTime || 0)} นาที
        </Typography>

        {recipe.tags && recipe.tags.length > 0 && (
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1 }}>
            {recipe.tags.slice(0, 4).map((tag, i) => (
              <Chip 
                key={i} 
                label={tag} 
                size="small"
                clickable
                onClick={(e) => {
                  e.preventDefault()
                  window.dispatchEvent(new CustomEvent('filterByTag', { detail: tag }))
                }}
                sx={{ 
                  fontSize: '12px',
                  height: 24,
                  bgcolor: 'grey.100',
                  color: 'text.secondary',
                  fontWeight: 500,
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: 'primary.main',
                    color: 'white',
                    transform: 'scale(1.05)'
                  },
                  '& .MuiChip-label': { px: 1.5 }
                }}
              />
            ))}
          </Box>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2, pt: 0 }}>
        <Button
          size="medium"
          component={Link}
          href={`/recipes/${recipe.id}`}
          variant="contained"
          fullWidth
          sx={{ 
            fontWeight: 600,
            fontSize: '15px',
            py: 1,
            textTransform: 'none',
            boxShadow: 2,
            mr: 1
          }}
        >
          เริ่มทำเลย
        </Button>
        <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)}>
          <MoreVertIcon />
        </IconButton>
      </CardActions>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => setAnchorEl(null)}>แชร์</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>แก้ไข</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>ลบ</MenuItem>
      </Menu>
    </Card>
  )
}
