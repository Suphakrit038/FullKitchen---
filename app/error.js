/**
 * ========================================
 * app/error.js - Global Error Boundary
 * ========================================
 * 
 * 📝 คำอธิบาย:
 * จับ runtime errors ทั้งหมดใน app
 * Next.js จะแสดงหน้านี้อัตโนมัติเมื่อเกิด error
 * แทน error screen ขาวๆ ที่น่ากลัว
 * 
 * 🎯 Features:
 * - แสดง error message ให้ user อ่านได้
 * - ปุ่ม "ลองอีกครั้ง" (reset)
 * - ปุ่ม "กลับหน้าหลัก"
 * - icon error ชัดเจน
 * 
 * 💡 Tips สำหรับการ implement:
 * 1. รับ props: error, reset
 * 2. error.message = ข้อความ error
 * 3. reset() = function เพื่อ retry
 * 4. แสดง ErrorOutlineIcon
 * 5. ปุ่ม reset ควรเป็น primary
 * 6. log error ไปยัง error tracking service
 * 
 * 📦 ตัวอย่าง error types:
 * - Network error → "ตรวจสอบการเชื่อมต่ออินเทอร์เน็ต"
 * - 404 error → redirect ไป not-found.js
 * - Permission error → "ไม่มีสิทธิ์เข้าถึง"
 * - Unknown error → แสดง error.message
 * 
 * ⚠️ สิ่งที่ต้องระวัง:
 * - error boundary จับแค่ runtime errors (ไม่จับ async errors ใน useEffect)
 * - ควร log error details ไป Sentry หรือ error tracking
 * - อย่าแสดง sensitive info ใน error message
 * - ต้องเป็น "use client" เสมอ
 * ========================================
 */

"use client"
import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

// TODO: 🟢 สร้าง Error Boundary หลัก
// - จับ runtime errors ทั้งหมด
// - แสดงหน้า error สวยงาม
// - ปุ่ม "ลองอีกครั้ง" (reset)
// - ปุ่ม "กลับหน้าหลัก"

export default function Error({ 
  error, 
  reset 
}) {
  // TODO: 🟢 implement Error component
  // return (
  //   <Box
  //     sx={{
  //       display: 'flex',
  //       flexDirection: 'column',
  //       justifyContent: 'center',
  //       alignItems: 'center',
  //       minHeight: '60vh',
  //       textAlign: 'center',
  //       gap: 2,
  //       p: 3
  //     }}
  //   >
  //     <ErrorOutlineIcon sx={{ fontSize: 80, color: 'error.main' }} />
  //     <Typography variant="h4">เกิดข้อผิดพลาด</Typography>
  //     <Typography variant="body1" color="text.secondary">
  //       {error?.message || 'เกิดข้อผิดพลาดที่ไม่คาดคิด กรุณาลองอีกครั้ง'}
  //     </Typography>
  //     <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
  //       <Button variant="contained" onClick={reset}>
  //         ลองอีกครั้ง
  //       </Button>
  //       <Button variant="outlined" href="/">
  //         กลับหน้าหลัก
  //       </Button>
  //     </Box>
  //   </Box>
  // )

  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h5">เกิดข้อผิดพลาด</Typography>
    </Box>
  )
}

// TODO: 🟡 เพิ่ม error logging
// - log error ไป console
// - ส่งไป error tracking service (เช่น Sentry)
// - เก็บ error details: timestamp, user action, stack trace

// TODO: 🟢 เพิ่ม different error types
// - 404 errors → redirect to not-found page
// - Network errors → "ตรวจสอบการเชื่อมต่อ"
// - Permission errors → "ไม่มีสิทธิ์เข้าถึง"

// TODO: 🟡 เพิ่ม error context
// - แสดง error code
// - แสดง timestamp
// - ปุ่ม "รายงานปัญหา"

// TODO: 🟢 test Error boundary
// - throw new Error('test') ใน component
// - ตรวจสอบว่า error page แสดงถูกต้อง
// - test ปุ่ม reset ใช้งานได้
