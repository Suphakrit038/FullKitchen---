/**
 * ========================================
 * components/RecipeCard.jsx - การ์ดแสดงสูตร (Recipe Preview Card)
 * ========================================
 * 
 * 📝 คำอธิบาย:
 * Card component สำหรับแสดงสูตรอาหารในรูปแบบย่อ
 * ใช้ใน RecipeList เป็น grid layout
 * คลิกที่ card จะไปหน้ารายละเอียดสูตร
 * 
 * 🎯 ข้อมูลที่แสดง:
 * - ชื่อสูตร
 * - เวลาเตรียม + เวลาทำ (รวม)
 * - ระดับความยาก
 * - tags
 * - จำนวนส่วนผสม
 * - timeAgo (สร้างเมื่อ)
 * 
 * 💡 Tips สำหรับพัฒนาต่อ:
 * 1. เพิ่ม thumbnail image
 * 2. เพิ่ม rating stars (ถ้ามี rating system)
 * 3. เพิ่ม favorite button (bookmark)
 * 4. เพิ่ม hover animation ที่สวยขึ้น
 * 5. เพิ่ม quick actions (edit, delete) บน card
 * 
 * ⚠️ สิ่งที่ต้องระวัง:
 * - ชื่อสูตรยาวเกินไปจะทำให้ card สูงไม่เท่ากัน
 * - tags เยอะเกินไปจะล้น - ควรจำกัดแสดงแค่ 3 tags
 * - ไม่มี loading skeleton - ควรเพิ่ม placeholder
 * ========================================
 */

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
import { timeAgo } from '../lib/utils.client'

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
