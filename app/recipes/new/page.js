/**
 * ========================================
 * app/recipes/new/page.js - หน้าเพิ่มสูตรใหม่ (Add New Recipe)
 * Route: /recipes/new
 * ========================================
 * 
 * หน้าที่:
 * - หน้าสำหรับสร้างสูตรอาหารใหม่ (route: /recipes/new)
 * - แสดงฟอร์มเพิ่มสูตรพร้อม validation
 * - บันทึกข้อมูลลง database
 * 
 * Components ที่ใช้:
 * - RecipeForm: ฟอร์มเพิ่ม/แก้ไขสูตร (mode="add")
 * 
 * ถูกเรียกใช้โดย:
 * - Header component (ปุ่ม "เพิ่มสูตร")
 * 
 * TODO List:
 * - [ ] เพิ่ม page header (breadcrumb)
 * - [ ] เพิ่ม unsaved changes warning
 * - [ ] เพิ่ม keyboard shortcuts (Ctrl+S, Ctrl+Enter)
 * - [ ] เพิ่ม page metadata
 * ========================================
 */

"use client"
import React from 'react'
import RecipeForm from '../../../components/RecipeForm'

// TODO: เพิ่ม page header
// - Typography variant="h4": "สร้างสูตรใหม่"
// - breadcrumb: หน้าแรก > สูตรอาหาร > สร้างใหม่

// TODO: 🟡 เพิ่ม unsaved changes warning
// - ถ้า user พิมพ์ form แล้วจะออกจากหน้า
// - แสดง ConfirmDialog: "คุณมีการเปลี่ยนแปลงที่ยังไม่บันทึก"
// - ใช้ useEffect + beforeunload event

// TODO: 🟢 เพิ่ม page metadata
// - title: "สร้างสูตรใหม่ | FullKitchen"

export default function NewRecipePage() {
  return (
    <main>
      <RecipeForm mode="add" />
    </main>
  )
}
