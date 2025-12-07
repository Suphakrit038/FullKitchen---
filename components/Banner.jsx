"use client"
import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function Banner() {
  return (
    <Box
      sx={{
        bgcolor: '#2e7d32',
        color: 'white',
        py: 1.5,
        px: 3,
        textAlign: 'center',
        boxShadow: 1
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 500 }}>
        🎉 ยินดีต้อนรับสู่ FullKitchen – ครัวครบครัน | รวมสูตรอาหารมากกว่า 100+ สูตร
      </Typography>
    </Box>
  )
}
