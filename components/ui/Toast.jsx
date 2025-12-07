/**
 * ========================================
 * components/ui/Toast.jsx - Toast Notification System
 * ========================================
 * 
 * 📝 คำอธิบาย:
 * ระบบแจ้งเตือนแบบ Toast (Snackbar) สำหรับแสดง feedback ให้ user
 * แทนการใช้ alert() ที่ดูไม่สวยและ block UI
 * รองรับหลาย severity: success, error, warning, info
 * 
 * 🎯 วิธีใช้งาน:
 * 1. ใน app/layout.js: wrap ด้วย <ToastProvider>
 * 2. ใน component: const { showToast } = useToast()
 * 3. เรียก: showToast('บันทึกสำเร็จ!', 'success')
 * 
 * 💡 Tips สำหรับการ implement:
 * 1. สร้าง Context ก่อน (ToastContext)
 * 2. สร้าง Provider component (ToastProvider)
 * 3. สร้าง custom hook (useToast)
 * 4. สร้าง Toast component หลัก
 * 5. เพิ่ม toast queue สำหรับหลาย toast พร้อมกัน
 * 
 * 📦 ตัวอย่างโค้ด:
 * ```jsx
 * // ใน component
 * const { showToast } = useToast()
 * 
 * const handleSave = async () => {
 *   try {
 *     await saveRecipe(data)
 *     showToast('บันทึกสูตรสำเร็จ!', 'success')
 *   } catch (error) {
 *     showToast('เกิดข้อผิดพลาด: ' + error.message, 'error')
 *   }
 * }
 * ```
 * 
 * ⚠️ สิ่งที่ต้องระวัง:
 * - ต้อง wrap ด้วย ToastProvider ก่อนใช้ useToast()
 * - toast หลายอันพร้อมกันจะซ้อนกัน - ควรทำ queue system
 * - duration ยาวเกินไป user อาจไม่เห็น
 * ========================================
 */

"use client"
import React, { useState, useEffect, createContext, useContext } from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

// TODO: 🟢 สร้าง Toast Context
// - createContext สำหรับ share toast state ทั่วทั้ง app
// - export ToastProvider wrapper component
// - export useToast() hook สำหรับเรียกใช้จาก component อื่น

const ToastContext = createContext(null)

// TODO: 🟢 สร้าง ToastProvider component
// - wrap children ด้วย ToastContext.Provider
// - manage toast state: { open, message, severity, duration }
// - export function showToast(message, severity)
// ตัวอย่าง:
// export function ToastProvider({ children }) {
//   const [toast, setToast] = useState({ open: false, message: '', severity: 'info' })
//   const showToast = (message, severity = 'info') => setToast({ open: true, message, severity })
//   const hideToast = () => setToast(prev => ({ ...prev, open: false }))
//   return (
//     <ToastContext.Provider value={{ showToast }}>
//       {children}
//       <Toast {...toast} onClose={hideToast} />
//     </ToastContext.Provider>
//   )
// }

// TODO: 🟢 สร้าง useToast hook
// - const { showToast } = useToast()
// - return useContext(ToastContext)
// - throw error ถ้าใช้นอก ToastProvider

// TODO: 🟡 สร้าง Toast component หลัก
// - props: { open, message, severity, duration, onClose }
// - severity: 'success' | 'error' | 'warning' | 'info'
// - ใช้ MUI Snackbar + Alert
// - autoHideDuration default = 6000ms
// - position: bottom-right
export default function Toast({ 
  open = false, 
  message = '', 
  severity = 'info', 
  duration = 6000, 
  onClose 
}) {
  // TODO: 🟢 implement Toast component
  // return (
  //   <Snackbar
  //     open={open}
  //     autoHideDuration={duration}
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
