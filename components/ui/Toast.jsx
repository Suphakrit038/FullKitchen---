/**
 * ========================================
 * components/ui/Toast.jsx - ระบบแจ้งเตือน (Toast Notification System)
 * ========================================
 * 
 * หน้าที่:
 * - ระบบแจ้งเตือนแบบ Toast (Snackbar) แทน alert()
 * - รองรับ severity: success, error, warning, info
 * - ใช้ Context API + custom hook (useToast)
 * 
 * Components ที่ใช้:
 * - Material-UI Snackbar + Alert
 * 
 * ถูกเรียกใช้โดย:
 * - ทุก component ที่ต้องการแจ้งเตือน (NotesSection, RecipeForm, etc.)
 * - app/layout.js (ต้อง wrap ด้วย ToastProvider)
 * 
 * TODO List:
 * - [ ] สร้าง ToastContext
 * - [ ] สร้าง ToastProvider component
 * - [ ] สร้าง useToast() custom hook
 * - [ ] สร้าง Toast component หลัก
 * - [ ] เพิ่ม toast queue system (หลาย toast พร้อมกัน)
 * - [ ] Wrap ด้วย ToastProvider ใน app/layout.js
 * - [ ] แทน alert() ทั้งหมดด้วย showToast()
 * ========================================
 */

"use client"
import React, { useState, useEffect, createContext, useContext } from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

const ToastContext = createContext(null)

export default function Toast({ 
  open = false, 
  message = '', 
  severity = 'info', 
  duration = 6000, 
  onClose 
}) {
  //     onClose={onClose}
  //     anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
  //   >
  //     <Alert onClose={onClose} severity={severity} variant="filled">
  //       {message}
  //     </Alert>
  //   </Snackbar>
  // )

  return null // TODO: แทนด้วยโค้ดข้างบน
}

// TODO: 🟡 เพิ่ม toast queue system
// - รองรับหลาย toast พร้อมกัน
// - queue toast messages
// - แสดงทีละ toast ตาม order

// TODO: 🟢 เพิ่ม custom icons สำหรับแต่ละ severity
// - success: CheckCircleIcon
// - error: ErrorIcon
// - warning: WarningIcon
// - info: InfoIcon

// TODO: 🟡 เพิ่ม action button ใน toast
// - props: action={{ label: 'undo', onClick: () => {} }}
// - แสดงปุ่มเล็กๆ ข้างข้อความ
// - ใช้กับ undo operations

// TODO: 🟢 test การใช้งาน
// วิธีใช้:
// 1. ใน app/layout.js: wrap ด้วย <ToastProvider>
// 2. ใน component: const { showToast } = useToast()
// 3. เรียก: showToast('บันทึกสำเร็จ!', 'success')
