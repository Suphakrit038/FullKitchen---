"use client"
import React from 'react'
import RecipeForm from '../../../components/RecipeForm'

// TODO: 🟢 เพิ่ม page header
// - Typography variant="h4": "สร้างสูตรใหม่"
// - breadcrumb: หน้าแรก > สูตรอาหาร > สร้างใหม่

// TODO: 🟡 เพิ่ม unsaved changes warning
// - ถ้า user พิมพ์ form แล้วจะออกจากหน้า
// - แสดง ConfirmDialog: "คุณมีการเปลี่ยนแปลงที่ยังไม่บันทึก"
// - ใช้ useEffect + beforeunload event

// TODO: 🟢 เพิ่ม page metadata
// - title: "สร้างสูตรใหม่ | FullKitchen"

export default function NewRecipePage() {
  // TODO: 🟡 เพิ่ม keyboard shortcuts
  // - Ctrl+S = Save draft
  // - Ctrl+Enter = Submit form
  
  return (
    <main>
      {/* TODO: 🟢 เพิ่ม <PageHeader /> */}
      <RecipeForm mode="add" />
    </main>
  )
}
