"use client"
import React from 'react'
import RecipeList from '../components/RecipeList'

// TODO: 🟡 เพิ่ม Hero section
// - Banner ต้อนรับที่หน้าแรก
// - ปุ่ม CTA (เช่น "เริ่มสร้างสูตร")
// - แสดงสถิติ (จำนวนสูตร, หมวดหมู่)

// TODO: 🟢 เพิ่ม featured recipes section
// - แสดงสูตรแนะนำ/ยอดนิยม
// - carousel หรือ grid แยกจาก RecipeList
// - query จาก getAllRecipes({ sort: 'popular' })

// TODO: 🟡 เพิ่ม categories section
// - แสดงหมวดหมู่อาหาร (เช้า, กลางวัน, เย็น, ของว่าง)
// - Card สำหรับแต่ละหมวดหมู่
// - link ไป /recipes?category=xxx

export default function HomePage() {
  // TODO: 🟢 เพิ่ม page metadata
  // - title: "หน้าแรก | FullKitchen"
  // - description สำหรับ SEO
  
  return (
    <main>
      {/* TODO: 🟡 เพิ่ม <HeroSection /> */}
      {/* TODO: 🟢 เพิ่ม <FeaturedRecipes /> */}
      {/* TODO: 🟡 เพิ่ม <CategoriesSection /> */}
      <RecipeList />
    </main>
  )
}
