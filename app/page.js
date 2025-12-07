/**
 * ========================================
 * app/page.js - หน้าแรก (Home Page)
 * Route: /
 * ========================================
 * 
 * หน้าที่:
 * - หน้าแรกของเว็บไซต์ (route: /)
 * - แสดงรายการสูตรอาหารทั้งหมด
 * - จุดเริ่มต้นที่ผู้ใช้เห็นเมื่อเปิดเว็บ
 * 
 * Components ที่ใช้:
 * - RecipeList: แสดงรายการสูตรพร้อมระบบค้นหา
 * 
 * ถูกเรียกใช้โดย:
 * - Next.js App Router (เมื่อ user เข้า /)
 * - Header component (ปุ่ม "หน้าหลัก")
 * 
 * TODO List:
 * - [ ] เพิ่ม Hero section (Banner ต้อนรับ, ปุ่ม CTA, สถิติ)
 * - [ ] เพิ่ม Featured recipes section (สูตรแนะนำ/ยอดนิยม)
 * - [ ] เพิ่ม Categories section (หมวดหมู่อาหาร)
 * - [ ] เพิ่ม page metadata (title, description)
 * ========================================
 */

// TODO: เพิ่ม Hero section
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

"use client"
import React from 'react'
import RecipeList from '../components/RecipeList'

export default function HomePage() {
  return (
    <main>
      <RecipeList />
    </main>
  )
}
