/**
 * ========================================
 * components/ui/Loading.jsx - คอมโพเนนต์โหลด (Loading Components)
 * ========================================
 * 
 * หน้าที่:
 * - รวม loading components หลายแบบไว้ที่เดียว
 * - LoadingSpinner, LoadingSkeleton, LoadingBar, LoadingOverlay
 * - Consistent loading experience ทั่วโปรเจ็ค
 * 
 * Components ที่ใช้:
 * - Material-UI CircularProgress, Skeleton, LinearProgress
 * 
 * ถูกเรียกใช้โดย:
 * - RecipeList (LoadingSkeleton)
 * - app/recipes/[id]/edit/page.js (LoadingSpinner)
 * - ทุก component ที่ต้องการ loading state
 * 
 * TODO List:
 * - [ ] สร้าง LoadingSpinner (centered spinner + text)
 * - [ ] สร้าง LoadingSkeleton (card, list, text variants)
 * - [ ] สร้าง LoadingBar (page transition)
 * - [ ] สร้าง LoadingOverlay (fullscreen block)
 * - [ ] แทน CircularProgress ด้วย LoadingSpinner/Skeleton
 * ========================================
 */

"use client"
import React from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'

// TODO: 🟢 สร้าง Loading spinner component
// - centered spinner
// - optional text
// - custom size

export function LoadingSpinner({ 
  size = 40,
  text = '',
  fullScreen = false 
}) {
  // TODO: 🟢 implement LoadingSpinner
  // return (
  //   <Box
  //     sx={{
  //       display: 'flex',
  //       flexDirection: 'column',
  //       justifyContent: 'center',
  //       alignItems: 'center',
  //       minHeight: fullScreen ? '100vh' : 300,
  //       gap: 2
  //     }}
  //   >
  //     <CircularProgress size={size} />
  //     {text && <Typography color="text.secondary">{text}</Typography>}
  //   </Box>
  // )

  return null // TODO: implement
}

// TODO: 🟢 สร้าง LoadingSkeleton component
// - skeleton placeholders ระหว่างรอข้อมูล
// - variants: text, card, list
// - better UX กว่า spinner

export function LoadingSkeleton({ variant = 'card', count = 3 }) {
  // TODO: 🟢 implement LoadingSkeleton
  // Card skeleton:
  // return (
  //   <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
  //     {Array.from({ length: count }).map((_, i) => (
  //       <Box key={i}>
  //         <Skeleton variant="rectangular" height={200} />
  //         <Skeleton variant="text" sx={{ mt: 1 }} />
  //         <Skeleton variant="text" width="60%" />
  //       </Box>
  //     ))}
  //   </Box>
  // )

  return null // TODO: implement
}

// TODO: 🟡 สร้าง LoadingDots component
// - 3 dots animation (...)
// - ใช้กับ inline loading text
// - เช่น "กำลังบันทึก..."

export function LoadingDots() {
  // TODO: 🟡 implement LoadingDots
  // CSS animation: . .. ... .. .
  return null
}

// TODO: 🟢 สร้าง LoadingBar component
// - progress bar บนสุดของหน้า
// - ใช้กับ page transitions
// - like YouTube loading bar

export function LoadingBar({ progress = 0 }) {
  // TODO: 🟢 implement LoadingBar
  // return (
  //   <Box
  //     sx={{
  //       position: 'fixed',
  //       top: 0,
  //       left: 0,
  //       right: 0,
  //       height: 3,
  //       bgcolor: 'primary.main',
  //       width: `${progress}%`,
  //       transition: 'width 0.3s',
  //       zIndex: 9999
  //     }}
  //   />
  // )

  return null // TODO: implement
}

// TODO: 🟡 เพิ่ม LoadingOverlay
// - fullscreen overlay + spinner
// - block interaction ระหว่าง global loading
// - ใช้กับ async operations สำคัญ

export function LoadingOverlay({ open = false, text = '' }) {
  // TODO: 🟡 implement LoadingOverlay
  return null
}

// TODO: 🟢 replace loading states ทั้งหมด
// ใน files:
// - RecipeList.jsx: ใช้ LoadingSkeleton แทน CircularProgress
// - RecipeDetailPage: ใช้ LoadingSkeleton
// - RecipeForm: ใช้ LoadingSpinner ในปุ่ม Save
