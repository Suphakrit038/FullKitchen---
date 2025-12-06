"use client"
import React from 'react'
import Link from 'next/link'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import AddIcon from '@mui/icons-material/Add'
import HomeIcon from '@mui/icons-material/Home'

export default function Header() {
  return (
    <AppBar position="sticky" elevation={2}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="logo"
          sx={{ mr: 2 }}
        >
          <RestaurantIcon />
        </IconButton>
        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          FullKitchen
        </Typography>

        <Button 
          color="inherit" 
          component={Link} 
          href="/"
          startIcon={<HomeIcon />}
          sx={{ mr: 1 }}
        >
          หน้าหลัก
        </Button>

        <Button 
          color="inherit" 
          component={Link} 
          href="/recipes/new"
          startIcon={<AddIcon />}
          variant="outlined"
          sx={{ borderColor: 'white', color: 'white' }}
        >
          เพิ่มสูตร
        </Button>
      </Toolbar>
    </AppBar>
  )
}
