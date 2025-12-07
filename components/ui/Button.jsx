/**
 * ========================================
 * components/ui/Button.jsx - ปุ่มแบบกำหนดเอง (Custom Button Component)
 * ========================================
 * 
 * หน้าที่:
 * - Custom wrapper สำหรับ MUI Button เพิ่ม loading state
 * - รองรับ MUI Button props ทั้งหมด
 * - Consistent styling ทั่วทั้งโปรเจ็ค
 * 
 * Components ที่ใช้:
 * - Material-UI Button, CircularProgress
 * 
 * ถูกเรียกใช้โดย:
 * - RecipeForm (ปุ่มบันทึก)
 * - NotesSection (ปุ่มเพิ่ม note)
 * - ทุก component ที่มีปุ่ม action
 * 
 * TODO List:
 * - [ ] รับ loading prop และแสดง CircularProgress
 * - [ ] เพิ่ม custom variants (danger, success)
 * - [ ] เพิ่ม tooltip support
 * - [ ] Responsive size สำหรับ mobile
 * ========================================
 */

"use client"
import React from 'react'
import MUIButton from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

// TODO: 🟢 สร้าง custom Button wrapper
// - wrap MUI Button
// - เพิ่ม loading state
// - disable button ระหว่าง loading
// - แสดง spinner แทน children

export default function Button({ 
  loading = false, 
  disabled = false,
  children,
  startIcon,
  ...props 
}) {
  // TODO: 🟢 implement Button component
  // return (
  //   <MUIButton
  //     disabled={disabled || loading}
  //     startIcon={loading ? <CircularProgress size={16} /> : startIcon}
  //     {...props}
  //   >
  //     {children}
  //   </MUIButton>
  // )

  return (
    <MUIButton disabled={disabled} startIcon={startIcon} {...props}>
      {children}
    </MUIButton>
  )
}

// TODO: 🟡 เพิ่ม variants เพิ่มเติม
// - variant="danger" (red color)
// - variant="success" (green color)
// - variant="ghost" (transparent)

// TODO: 🟢 เพิ่ม size variants
// - size="xs" (extra small)
// - size="lg" (large)
// - ใช้กับ icon-only buttons

// TODO: 🟡 เพิ่ม tooltip support
// - props: tooltip="text"
// - wrap ด้วย Tooltip component
// - แสดงเมื่อ hover

// TODO: 🟢 เพิ่ม keyboard shortcuts hint
// - props: shortcut="⌘K"
// - แสดงข้างชื่อปุ่ม
// - ใช้กับ common actions

// TODO: 🟢 replace Button usage ทั้งหมด
// - import Button from 'components/ui/Button'
// - แทนใน: Header, RecipeForm, RecipeCard, NotesSection
// - consistent UI
