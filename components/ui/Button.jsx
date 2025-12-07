/**
 * ========================================
 * components/ui/Button.jsx - Custom Button Component
 * ========================================
 * 
 * 📝 คำอธิบาย:
 * Custom wrapper สำหรับ MUI Button
 * เพิ่ม loading state และ consistent styling
 * ใช้แทน MUI Button ทั่วทั้งโปรเจ็ค
 * 
 * 🎯 Features เพิ่มเติม:
 * - loading prop (แสดง spinner + disable)
 * - รองรับ MUI Button props ทั้งหมด
 * - consistent styling
 * 
 * 💡 Tips สำหรับการ implement:
 * 1. รับ loading prop แยกจาก disabled
 * 2. ถ้า loading=true → แสดง CircularProgress + disable button
 * 3. spread ...props ไปยัง MUI Button
 * 4. เพิ่ม custom variants (danger, success)
 * 5. เพิ่ม tooltip support
 * 
 * 📦 ตัวอย่างการใช้:
 * ```jsx
 * <Button
 *   loading={isSaving}
 *   variant="contained"
 *   onClick={handleSave}
 * >
 *   บันทึก
 * </Button>
 * ```
 * 
 * ⚠️ สิ่งที่ต้องระวัง:
 * - loading state ต้อง disable button ด้วย
 * - spinner size ต้องเหมาะกับ button size
 * - อย่าลืม spread ...props มาจาก parent
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
