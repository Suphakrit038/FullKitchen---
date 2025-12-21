/**
 * ========================================
 * components/Header.jsx - แถบนำทาง (Navigation Bar)
 * ========================================
 * 
 * 📝 คำอธิบาย:
 * Header bar แสดงด้านบนทุกหน้า
 * มี logo, navigation links, และปุ่มเพิ่มสูตร
 * ใช้ MUI AppBar component เป็นพื้นฐาน
 * 
 * 🎯 ส่วนประกอบ:
 * - Logo icon (RestaurantIcon)
 * - ชื่อเว็บ "FullKitchen"
 * - ปุ่มหน้าหลัก
 * - ปุ่มเพิ่มสูตร (outlined style)
 * 
 * 💡 Tips สำหรับพัฒนาต่อ:
 * 1. เพิ่ม search bar ตรง Toolbar
 * 2. เพิ่ม active state highlight สำหรับปุ่มที่กำลังอยู่
 * 3. เพิ่ม user menu (avatar + dropdown)
 * 4. เพิ่ม theme toggle (dark/light mode)
 * 5. ทำให้ responsive บน mobile (hamburger menu)
 * 
 * ⚠️ สิ่งที่ต้องระวัง:
 * - ใช้ next/link ให้ถูกต้อง (component prop)
 * - บน mobile ปุ่มอาจเยอะเกิน - ควรซ่อนบางปุ่ม
 * - search bar ต้องจัดการ URL query string
 * ========================================
 */

"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Box from '@mui/material/Box'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import SearchIcon from '@mui/icons-material/Search'
import Banner from './Banner'
import UserProfilePanel from './UserProfilePanel'

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <>
      <Banner />
      <AppBar position="sticky" elevation={2}>
        <Toolbar 
          sx={{ 
            gap: 3,
            maxWidth: '100%',
            width: '100%',
            px: { xs: 2, sm: 3, md: 4 },
            minHeight: { xs: 70, sm: 80 }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              component={Link}
              href="/"
              sx={{ p: 1.5 }}
            >
              <RestaurantIcon sx={{ fontSize: { xs: 32, sm: 38 } }} />
            </IconButton>
            
            <Typography 
              variant="h6" 
              component={Link}
              href="/"
              sx={{ 
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: 700,
                fontSize: { xs: '1.1rem', sm: '1.4rem' },
                display: { xs: 'none', sm: 'block' }
              }}
            >
              FullKitchen
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              position: 'relative',
              borderRadius: 1,
              bgcolor: 'rgba(255, 255, 255, 0.15)',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.25)' },
              flexGrow: 1,
              maxWidth: 600,
              display: 'flex',
              alignItems: 'center',
              mx: 'auto'
            }}
          >
            <Box sx={{ p: 1, pl: 2, pointerEvents: 'none', display: 'flex' }}>
              <SearchIcon />
            </Box>
            <InputBase
              id="header-search"
              placeholder="ค้นหาสูตรอาหาร..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                color: 'inherit',
                width: '100%',
                '& input': {
                  py: 1,
                  pr: 2,
                  width: '100%',
                  fontSize: '14px'
                }
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button 
              color="inherit" 
              component={Link} 
              href="/recipes/new"
              variant={pathname === '/recipes/new' ? 'outlined' : 'text'}
              sx={{ 
                borderColor: 'white', 
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '15px',
                display: { xs: 'none', md: 'inline-flex' }
              }}
            >
              + สูตรใหม่
            </Button>

            <UserProfilePanel />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  )
}
