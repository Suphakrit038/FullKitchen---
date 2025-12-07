/**
 * ========================================
 * components/ui/ConfirmDialog.jsx - Confirmation Dialog
 * ========================================
 * 
 * 📝 คำอธิบาย:
 * Dialog สำหรับยืนยันการกระทำสำคัญ (ลบ, ยกเลิก, etc.)
 * แทนการใช้ window.confirm() ที่ดูไม่สวยและปรับแต่งไม่ได้
 * รองรับ async operations และ custom styling
 * 
 * 🎯 วิธีใช้งาน:
 * 1. ใน app/layout.js: wrap ด้วย <ConfirmDialogProvider>
 * 2. ใน component: const { confirm } = useConfirm()
 * 3. เรียก: const ok = await confirm('ลบสูตรนี้?', 'ไม่สามารถย้อนกลับได้')
 * 4. if (ok) { ... delete ... }
 * 
 * 💡 Tips สำหรับการ implement:
 * 1. ใช้ Promise pattern เพื่อ await ได้
 * 2. สร้าง Context + Provider
 * 3. confirm() function return Promise<boolean>
 * 4. ปุ่ม confirm ควรเป็นสีแดงถ้าเป็น dangerous action
 * 5. รองรับ loading state ระหว่างทำงาน async
 * 
 * 📦 ตัวอย่างโค้ด:
 * ```jsx
 * const { confirm } = useConfirm()
 * 
 * const handleDelete = async () => {
 *   const confirmed = await confirm(
 *     'ลบสูตรนี้?',
 *     'การกระทำนี้ไม่สามารถย้อนกลับได้'
 *   )
 *   
 *   if (confirmed) {
 *     await deleteRecipe(id)
 *     showToast('ลบสูตรสำเร็จ', 'success')
 *   }
 * }
 * ```
 * 
 * ⚠️ สิ่งที่ต้องระวัง:
 * - ต้อง wrap ด้วย Provider ก่อนใช้ useConfirm()
 * - อย่าลืม await - ไม่งั้นจะไม่รอ user ตอบ
 * - ควร disable ปุ่มระหว่าง loading
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

// TODO: 🟢 สร้าง ConfirmDialog Context
// - createContext สำหรับ share dialog state
// - export ConfirmDialogProvider wrapper
// - export useConfirm() hook สำหรับเรียกใช้

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
