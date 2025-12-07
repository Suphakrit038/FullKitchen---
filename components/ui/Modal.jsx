/**
 * ========================================
 * components/ui/Modal.jsx - หน้าต่าง Modal (Reusable Modal Component)
 * ========================================
 * 
 * หน้าที่:
 * - Generic modal component wrapper รอบ MUI Dialog
 * - Responsive (fullScreen บน mobile)
 * - รองรับ title, content, actions
 * 
 * Components ที่ใช้:
 * - Material-UI Dialog, IconButton, useMediaQuery
 * 
 * ถูกเรียกใช้โดย:
 * - (ยังไม่มี - จะใช้สำหรับ features ในอนาคต)
 * 
 * TODO List:
 * - [ ] สร้าง Modal component ด้วย MUI Dialog
 * - [ ] รองรับ title, children, actions, onClose props
 * - [ ] เพิ่มปุ่ม X มุมบนขวา
 * - [ ] เพิ่ม fullScreen บน mobile (useMediaQuery)
 * - [ ] เพิ่ม loading overlay support
 * ========================================
 */

"use client"
import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'

export default function Modal({
  open = false,
  title = '',
  children,
  actions,
  onClose,
  maxWidth = 'sm',
  fullWidth = true
}) {
  // TODO: 🟢 implement Modal component
  // return (
  //   <Dialog
  //     open={open}
  //     onClose={onClose}
  //     maxWidth={maxWidth}
  //     fullWidth={fullWidth}
  //     fullScreen={/* mobile check */}
  //   >
  //     {title && (
  //       <DialogTitle>
  //         {title}
  //         <IconButton
  //           onClick={onClose}
  //           sx={{ position: 'absolute', right: 8, top: 8 }}
  //         >
  //           <CloseIcon />
  //         </IconButton>
  //       </DialogTitle>
  //     )}
  //     <DialogContent>{children}</DialogContent>
  //     {actions && <DialogActions>{actions}</DialogActions>}
  //   </Dialog>
  // )

  return null // TODO: implement
}

// TODO: 🟡 เพิ่ม loading overlay
// - props: loading={true}
// - แสดง backdrop + spinner
// - block interaction ระหว่าง async

// TODO: 🟢 เพิ่ม footer actions
// - props: footer={<div>...</div>}
// - flexible footer area
// - ใช้สำหรับ custom actions

// TODO: 🟡 เพิ่ม transitions
// - smooth slide-up animation
// - fade in backdrop
// - custom transition duration

// TODO: 🟢 responsive mobile
// - fullScreen บน mobile
// - useMediaQuery('(max-width: 600px)')
// - swipe down to close

// TODO: 🟡 ใช้กับ features ต่างๆ
// - Image preview modal (view recipe thumbnail)
// - Recipe detail quick view
// - Filter options modal
