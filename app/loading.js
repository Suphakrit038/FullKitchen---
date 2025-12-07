/**
 * ========================================
 * app/loading.js - Global Loading State
 * ========================================
 * 
 * 📝 คำอธิบาย:
 * Loading page หลักของ Next.js App Router
 * แสดงอัตโนมัติระหว่าง page transitions
 * แทน blank screen ที่ดูไม่ดี
 * 
 * 🎯 เมื่อไหร่แสดงหน้านี้:
 * - navigate ระหว่างหน้า (client-side)
 * - loading data ของ page
 * - Suspense boundary
 * 
 * 💡 Tips สำหรับการ implement:
 * 1. แสดง CircularProgress centered
 * 2. เพิ่มข้อความ "กำลังโหลด..."
 * 3. หรือใช้ LoadingSkeleton (better UX)
 * 4. หรือใช้ LoadingBar บนสุดหน้า
 * 5. สามารถสร้าง page-specific loading:
 *    - app/recipes/loading.js
 *    - app/recipes/[id]/loading.js
 * 
 * 📦 Loading hierarchy:
 * ```
 * app/loading.js          ← global fallback
 * app/recipes/loading.js  ← specific to /recipes
 * app/recipes/[id]/loading.js ← specific to recipe detail
 * ```
 * 
 * Next.js จะใช้ loading.js ที่ใกล้ที่สุดก่อน
 * 
 * ⚠️ สิ่งที่ต้องระวัง:
 * - loading นานเกิน 5 วินาที user จะรำคาญ
 * - ควรใช้ Skeleton แทน spinner (perceived performance ดีกว่า)
 * - ถ้ามี page-specific loading ต้องสร้างแยก
 * - อย่าทำ loading ซับซ้อนเกินไป (จะช้า)
 * ========================================
 */

"use client"
import React from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

// TODO: 🟢 สร้าง global loading page
// - แสดงระหว่าง page transitions
// - Next.js จะแสดง loading.js อัตโนมัติ
// - centered spinner + text

export default function Loading() {
  // TODO: 🟢 implement Loading component
  // return (
  //   <Box
  //     sx={{
  //       display: 'flex',
  //       flexDirection: 'column',
  //       justifyContent: 'center',
  //       alignItems: 'center',
  //       minHeight: '50vh',
  //       gap: 2
  //     }}
  //   >
  //     <CircularProgress size={60} />
  //     <Typography variant="body1" color="text.secondary">
  //       กำลังโหลด...
  //     </Typography>
  //   </Box>
  // )

  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <CircularProgress />
    </Box>
  )
}

// TODO: 🟡 เพิ่ม loading progress bar
// - แทน spinner ด้วย linear progress
// - แสดงบนสุดของหน้า
// - smooth animation

// TODO: 🟢 สร้าง page-specific loading
// - app/recipes/loading.js
// - app/recipes/[id]/loading.js
// - custom loading UI สำหรับแต่ละหน้า

// TODO: 🟡 เพิ่ม Skeleton loading
// - แทน spinner ด้วย skeleton placeholders
// - ดูเหมือนเนื้อหาจริง
// - better perceived performance

// TODO: 🟢 เพิ่ม timeout fallback
// - ถ้า loading นานเกิน 10 วินาที
// - แสดง message: "โหลดช้ากว่าปกติ..."
// - ปุ่ม refresh
