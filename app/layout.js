/**
 * ========================================
 * app/layout.js - Root Layout (App Wrapper)
 * ========================================
 * 
 * 📝 คำอธิบาย:
 * Layout หลักของ Next.js App Router
 * wrap ทุกหน้าด้วย theme, header, container
 * เป็นจุดเริ่มต้นของ app ทั้งหมด
 * 
 * 🎯 ส่วนประกอบ:
 * - ThemeProvider (MUI theme)
 * - CssBaseline (reset CSS)
 * - Header (navigation)
 * - Container (content wrapper)
 * - Global CSS
 * 
 * 💡 Tips สำหรับพัฒนาต่อ:
 * 1. เพิ่ม dark mode toggle
 * 2. wrap ด้วย ToastProvider
 * 3. wrap ด้วย ConfirmDialogProvider
 * 4. เพิ่ม ErrorBoundary
 * 5. เพิ่ม Footer component
 * 6. เพิ่ม metadata สำหรับ SEO
 * 7. เพิ่ม loading bar สำหรับ page transitions
 * 
 * 📦 ลำดับการ wrap (แนะนำ):
 * ```jsx
 * <html>
 *   <body>
 *     <ThemeProvider>
 *       <ToastProvider>
 *         <ConfirmDialogProvider>
 *           <ErrorBoundary>
 *             <Header />
 *             <Container>{children}</Container>
 *             <Footer />
 *           </ErrorBoundary>
 *         </ConfirmDialogProvider>
 *       </ToastProvider>
 *     </ThemeProvider>
 *   </body>
 * </html>
 * ```
 * 
 * ⚠️ สิ่งที่ต้องระวัง:
 * - layout ต้องเป็น "use client" เพราะใช้ MUI
 * - อย่า fetch data ใน layout (ใช้ page.js แทน)
 * - Provider ซ้อนกันเยอะ - ดู performance
 * - dark mode state ต้องเก็บใน localStorage
 * ========================================
 */

"use client"
import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Header from '../components/Header'
import '../styles/globals.css'

// TODO: 🟡 เพิ่ม dark mode support
// - สร้าง state/context สำหรับ theme mode
// - toggle ระหว่าง light/dark
// - บันทึกค่าใน localStorage
// - ตัวอย่าง: const [mode, setMode] = useState('light')

// TODO: 🟢 เพิ่ม Toast notification container
// - import Toast component
// - วาง <Toast /> ใน layout
// - สร้าง ToastContext สำหรับ show/hide toast

// TODO: 🟢 เพิ่ม metadata สำหรับ SEO
// - export const metadata = { title: '...', description: '...' }
// - เพิ่ม Open Graph tags
// - favicon และ apple-touch-icon

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#2e7d32' },
    secondary: { main: '#ffb300' }
  },
  // TODO: 🟢 ปรับแต่ง theme เพิ่มเติม
  // - เพิ่ม custom font family
  // - กำหนด breakpoints สำหรับ responsive
  // - custom component styles (Button, TextField, etc.)
})

export default function RootLayout({ children }) {
  // TODO: 🟢 เพิ่ม ErrorBoundary wrapper
  // - wrap children ด้วย <ErrorBoundary>
  // - แสดงหน้า error ถ้ามี runtime error
  
  // TODO: 🟡 เพิ่ม loading state สำหรับ page transition
  // - ใช้ Next.js loading.js
  // - แสดง progress bar ระหว่าง navigate
  
  // TODO: 🟢 เพิ่ม Footer component
  // - สร้าง components/Footer.jsx
  // - แสดงข้อมูล copyright, links
  // - วางไว้ใต้ Container
  
  return (
    <html lang="th">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <Container 
            maxWidth="xl" 
            sx={{ 
              px: { xs: 2, sm: 3, md: 4 },
              minHeight: 'calc(100vh - 120px)'
            }}
          >
            {children}
          </Container>
        </ThemeProvider>
      </body>
    </html>
  )
}
