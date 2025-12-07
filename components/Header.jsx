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
import Banner from './Banner'
import UserProfilePanel from './UserProfilePanel'

// TODO: 🟡 เพิ่ม search bar ใน Header
// - แสดง search input ตรง Toolbar
// - redirect ไป /recipes?q=searchQuery
// - รองรับ mobile (hide/show with icon)

// TODO: 🟢 เพิ่ม active state สำหรับ navigation
// - highlight ปุ่มที่กำลังอยู่ในหน้านั้น
// - ใช้ usePathname() from next/navigation
// - เปลี่ยนสี/style ของปุ่ม active

// TODO: 🟡 เพิ่ม user menu (ถ้ามี authentication)
// - Avatar icon ที่มุมขวา
// - dropdown menu: Profile, Settings, Logout
// - แสดงชื่อ user

// TODO: 🟢 เพิ่ม theme toggle (dark/light mode)
// - IconButton สำหรับสลับ theme
// - บันทึกค่าใน localStorage
// - sync กับ ThemeProvider

export default function Header() {
  return (
    <>
      <Banner />
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
            FullKitchen – ครัวครบครัน
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
            sx={{ borderColor: 'white', color: 'white', mr: 2 }}
          >
            เพิ่มสูตร
          </Button>

          <UserProfilePanel />
        </Toolbar>
      </AppBar>
    </>
  )
}
