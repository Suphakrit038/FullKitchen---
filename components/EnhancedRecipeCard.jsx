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
import AccessTimeIcon from '@mui/icons-material/AccessTime'
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
            filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.4))',
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
            <Typography variant="h3" sx={{ opacity: 0.3, mb: 1 }}>🍳</Typography>
            <Typography variant="caption" color="text.secondary">ไม่มีรูปภาพ</Typography>
          </Box>
        )}
      </CardMedia>

      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography 
          variant="h6" 
          gutterBottom 
          noWrap 
          sx={{ 
            fontWeight: 600,
            color: 'primary.main',
            mb: 1
          }}
        >
          {recipe.name}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontSize: '0.813rem' }}>
          👨‍🍳 ทำง่าย สะอาด อร่อย
        </Typography>

        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
          {new Date(recipe.createdAt).toLocaleDateString('th-TH', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit' 
          }).split('/').join('/')} – V{recipe.version || '5.9'}
        </Typography>

        {recipe.tags && recipe.tags.length > 0 && (
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1 }}>
            {recipe.tags.slice(0, 5).map((tag, i) => (
              <Chip 
                key={i} 
                label={tag} 
                size="small" 
                sx={{ 
                  bgcolor: i === 0 ? '#e3f2fd' : i === 1 ? '#f3e5f5' : i === 2 ? '#fff3e0' : '#f1f8e9',
                  color: 'text.primary',
                  fontSize: '0.75rem',
                  height: 22,
                  '& .MuiChip-label': { px: 1 }
                }}
              />
            ))}
          </Box>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Button
          size="small"
          component={Link}
          href={`/recipes/${recipe.id}`}
          variant="contained"
          fullWidth
          sx={{ mr: 1 }}
        >
          ดูสูตร
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
