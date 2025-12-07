/**
 * ========================================
 * app/not-found.js - Global 404 Page
 * ========================================
 * 
 * 📝 คำอธิบาย:
 * หน้า 404 หลักของเว็บไซต์
 * แสดงเมื่อ user เข้า URL ที่ไม่มีอยู่จริง
 * ต่างจาก app/recipes/[id]/not-found.js (specific สำหรับสูตร)
 * 
 * 🎯 เมื่อไหร่แสดงหน้านี้:
 * - /unknown-page
 * - /recipes/unknown-route
 * - ทุก route ที่ไม่ match กับ file structure
 * 
 * 💡 Tips สำหรับการ implement:
 * 1. แสดง "404" เด่นชัด
 * 2. icon ใหญ่ๆ (SearchOffIcon)
 * 3. ข้อความอธิบายเป็นมิตร
 * 4. ปุ่มกลับหน้าหลัก (primary)
 * 5. ปุ่มดูสูตรทั้งหมด (secondary)
 * 6. แนะนำหน้าที่น่าสนใจ
 * 
 * 📦 UX ที่ดี:
 * - อย่าแค่บอก "404" แห้งๆ
 * - แนะนำทางเลือก (suggestions)
 * - แสดง search bar
 * - list popular recipes
 * - ทำให้ user หาทางกลับได้ง่าย
 * 
 * ⚠️ สิ่งที่ต้องระวัง:
 * - ควรมี breadcrumb ให้รู้ว่าอยู่ตรงไหน
 * - ต้องแยก global 404 กับ recipe-specific 404
 * - อย่า redirect autoเพราะ SEO ไม่ดี
 * ========================================
 */

"use client"
import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import SearchOffIcon from '@mui/icons-material/SearchOff'

// TODO: 🟢 สร้าง global 404 page
// - แสดงเมื่อ route ไม่มีอยู่จริง
// - icon + message
// - ปุ่มกลับหน้าหลัก

export default function NotFound() {
  // TODO: 🟢 implement NotFound component


  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h4">404 - ไม่พบหน้านี้</Typography>
    </Box>
  )
}

// TODO: 🟡 เพิ่ม search suggestions
// - แนะนำหน้าที่เกี่ยวข้อง
// - list popular recipes
// - search bar

// TODO: 🟢 เพิ่ม breadcrumb
// - แสดง navigation path
// - ช่วยให้รู้ว่าอยู่ตรงไหน

// TODO: 🟡 เพิ่ม random recipe suggestion
// - "ลองดูสูตรนี้แทนไหม?"
// - แสดง random recipe card
// - ทำให้หน้า 404 น่าสนใจขึ้น

// TODO: 🟢 สร้าง recipe-specific 404
// - app/recipes/[id]/not-found.js
// - message: "ไม่พบสูตรนี้"
// - แยกจาก global 404
