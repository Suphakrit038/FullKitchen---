/**
 * ========================================
 * components/ui/ConfirmDialog.jsx - หน้าต่างยืนยัน (Confirmation Dialog)
 * ========================================
 * 
 * หน้าที่:
 * - Dialog สำหรับยืนยันการกระทำ แทน window.confirm()
 * - รองรับ async operations + Promise pattern
 * - ใช้ Context API + custom hook (useConfirm)
 * 
 * Components ที่ใช้:
 * - Material-UI Dialog, Button
 * 
 * ถูกเรียกใช้โดย:
 * - NotesSection (ลบ note)
 * - app/recipes/[id]/page.js (ลบสูตร)
 * - app/layout.js (ต้อง wrap ด้วย ConfirmDialogProvider)
 * 
 * TODO List:
 * - [ ] สร้าง ConfirmContext
 * - [ ] สร้าง ConfirmDialogProvider component
 * - [ ] สร้าง useConfirm() custom hook
 * - [ ] สร้าง ConfirmDialog component ด้วย Promise pattern
 * - [ ] Wrap ด้วย ConfirmDialogProvider ใน app/layout.js
 * - [ ] แทน confirm() ทั้งหมดด้วย await confirm()
 * - [ ] เพิ่ม dangerous action styling (ปุ่มสีแดง)
 * ========================================
 */

"use client"
import React, { createContext, useContext, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

const ConfirmDialogContext = createContext(null)

// TODO: 🟢 สร้าง ConfirmDialogProvider component
// - manage dialog state: { open, title, message, onConfirm, onCancel }
// - export function confirm(title, message) => Promise<boolean>
// ตัวอย่าง:
// export function ConfirmDialogProvider({ children }) {
//   const [dialog, setDialog] = useState({ open: false, ... })
//   const confirm = (title, message) => {
//     return new Promise((resolve) => {
//       setDialog({
//         open: true,
//         title,
//         message,
//         onConfirm: () => { setDialog({ open: false }); resolve(true) },
//         onCancel: () => { setDialog({ open: false }); resolve(false) }
//       })
//     })
//   }
//   return (
//     <ConfirmDialogContext.Provider value={{ confirm }}>
//       {children}
//       <ConfirmDialog {...dialog} />
//     </ConfirmDialogContext.Provider>
//   )
// }

// TODO: 🟢 สร้าง useConfirm hook
// - const { confirm } = useConfirm()
// - return useContext(ConfirmDialogContext)
// - throw error ถ้าใช้นอก Provider

// TODO: 🟡 สร้าง ConfirmDialog component หลัก
// - props: { open, title, message, onConfirm, onCancel, confirmText, cancelText }
// - ใช้ MUI Dialog
// - confirmText default = 'ยืนยัน', cancelText default = 'ยกเลิก'
// - ปุ่ม confirm = color="error" variant="contained"
// - ปุ่ม cancel = color="inherit" variant="outlined"
export default function ConfirmDialog({ 
  open = false,
  title = 'ยืนยันการดำเนินการ',
  message = 'คุณแน่ใจหรือไม่?',
  confirmText = 'ยืนยัน',
  cancelText = 'ยกเลิก',
  confirmColor = 'error',
  onConfirm,
  onCancel
}) {
  // TODO: 🟢 implement ConfirmDialog component
  // return (
  //   <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
  //     <DialogTitle>{title}</DialogTitle>
  //     <DialogContent>
  //       <DialogContentText>{message}</DialogContentText>
  //     </DialogContent>
  //     <DialogActions>
  //       <Button onClick={onCancel} color="inherit" variant="outlined">
  //         {cancelText}
  //       </Button>
  //       <Button onClick={onConfirm} color={confirmColor} variant="contained" autoFocus>
  //         {confirmText}
  //       </Button>
  //     </DialogActions>
  //   </Dialog>
  // )

  return null // TODO: แทนด้วยโค้ดข้างบน
}

// TODO: 🟡 เพิ่ม danger mode
// - props: danger={true}
// - เปลี่ยนสี title เป็นแดง
// - icon warning

// TODO: 🟢 เพิ่ม loading state
// - props: loading={true}
// - disable ปุ่มระหว่างรอ async operation
// - แสดง CircularProgress ในปุ่ม confirm

// TODO: 🟡 เพิ่ม custom actions
// - props: actions={[{ label, onClick, color }]}
// - รองรับปุ่มมากกว่า 2 ปุ่ม
// - flexible actions

// TODO: 🟢 test การใช้งาน
// วิธีใช้:
// 1. ใน app/layout.js: wrap ด้วย <ConfirmDialogProvider>
// 2. ใน component: const { confirm } = useConfirm()
// 3. เรียก:
//    const confirmed = await confirm('ลบสูตรนี้?', 'การกระทำนี้ไม่สามารถย้อนกลับได้')
//    if (confirmed) { ... }

// TODO: 🟡 แทน alert() และ confirm() ธรรมดาทั้งหมด
// ใน files:
// - components/NotesSection.jsx (6 places)
// - app/recipes/[id]/page.js (2 places)
