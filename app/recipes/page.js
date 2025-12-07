"use client"
import React from 'react'
import RecipeList from '../../components/RecipeList'

// TODO: 🟢 เพิ่ม page header
// - Typography variant="h4": "สูตรอาหารทั้งหมด"
// - breadcrumb navigation
// - จำนวนสูตรทั้งหมด

// TODO: 🟡 เพิ่ม advanced filters sidebar
// - filter by difficulty
// - filter by prep time range
// - filter by tags (checkbox list)
// - ปุ่ม "ล้างตัวกรอง"

// TODO: 🟢 รองรับ URL query parameters
// - useSearchParams() เพื่ออ่าน ?q=xxx&category=xxx
// - sync กับ RecipeList filters
// - update URL เมื่อ filter เปลี่ยน

export default function RecipesPage() {
  // TODO: 🟢 เพิ่ม page metadata
  // - title: "สูตรอาหารทั้งหมด | FullKitchen"
  
  return (
    <main>
      {/* TODO: 🟢 เพิ่ม <PageHeader /> */}
      {/* TODO: 🟡 เพิ่ม <FiltersSidebar /> */}
      <RecipeList />
    </main>
  )
}
