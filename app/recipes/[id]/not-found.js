/**
 * ========================================
 * app/recipes/[id]/not-found.js - Recipe 404 Page
 * ========================================
 * 
 * 📝 คำอธิบาย:
 * หน้า 404 เฉพาะสำหรับสูตรอาหาร
 * แสดงเมื่อไม่พบสูตรที่ระบุใน URL
 * ต่างจาก global 404 (app/not-found.js)
 * 
 * 🎯 เมื่อไหร่แสดงหน้านี้:
 * - /recipes/non-existent-id
 * - สูตรถูกลบไปแล้ว
 * - ID ผิด format
 * 
 * 💡 Tips สำหรับการ implement:
 * 1. แสดง RestaurantIcon ใหญ่ๆ
 * 2. message: "ไม่พบสูตรนี้"
 * 3. อธิบาย: "อาจถูกลบหรือไม่เคยมีอยู่"
 * 4. ปุ่ม "ดูสูตรทั้งหมด" (primary)
 * 5. ปุ่ม "กลับหน้าหลัก" (secondary)
 * 6. แนะนำสูตรที่คล้ายกัน (similar recipes)
 * 
 * 📦 การเรียกใช้:
 * ใน app/recipes/[id]/page.js:
 * ```jsx
 * import { notFound } from 'next/navigation'
 * 
 * const recipe = await getRecipeById(id)
 * if (!recipe) notFound() // จะแสดงหน้านี้
 * ```
 * 
 * ⚠️ สิ่งที่ต้องระวัง:
 * - ต้อง integrate กับ page.js (เรียก notFound())
 * - ควรแยกชัดเจนจาก global 404
 * - แนะนำสูตรอื่นเพื่อ retain user
 * - ถ้ามี undo delete feature ควรแสดงปุ่ม restore
 * ========================================
 */

"use client"
import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import RestaurantIcon from '@mui/icons-material/Restaurant'

// TODO: 🟢 สร้าง recipe-specific 404 page
// - แสดงเมื่อไม่พบสูตรที่ระบุ
// - ปุ่มกลับหน้าสูตรทั้งหมด
// - แยกชัดเจนจาก global 404

export default function RecipeNotFound() {
  // TODO: 🟢 implement RecipeNotFound component
  // return (
  //   <Box
  //     sx={{
  //       display: 'flex',
  //       flexDirection: 'column',
  //       justifyContent: 'center',
  //       alignItems: 'center',
  //       minHeight: '50vh',
  //       textAlign: 'center',
  //       gap: 2,
  //       p: 3
  //     }}
  //   >
  //     <RestaurantIcon sx={{ fontSize: 100, color: 'text.disabled' }} />
  //     <Typography variant="h4">ไม่พบสูตรนี้</Typography>
  //     <Typography variant="body1" color="text.secondary">
  //       สูตรที่คุณกำลังมองหาอาจถูกลบหรือไม่เคยมีอยู่จริง
  //     </Typography>
  //     <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
  //       <Button variant="contained" href="/recipes">
  //         ดูสูตรทั้งหมด
  //       </Button>
  //       <Button variant="outlined" href="/">
  //         กลับหน้าหลัก
  //       </Button>
  //     </Box>
  //   </Box>
  // )

  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h5">ไม่พบสูตรนี้</Typography>
    </Box>
  )
}

// TODO: 🟡 เพิ่ม similar recipes suggestions
// - แนะนำสูตรที่คล้ายกัน
// - query by tags
// - "คุณอาจชอบสูตรเหล่านี้"

// TODO: 🟢 เพิ่ม recently deleted info
// - ถ้าสูตรเพิ่งถูกลบไป
// - แสดง message: "สูตรนี้ถูกลบไปแล้ว"
// - ปุ่ม undo delete (ถ้ามี restore feature)

// TODO: 🟡 integrate กับ RecipeDetailPage
// - ใน page.js: เรียก notFound() ถ้าไม่พบสูตร
// - import { notFound } from 'next/navigation'
// - if (!recipe) notFound()
