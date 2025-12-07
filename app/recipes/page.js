/**
 * ========================================
 * app/recipes/page.js - หน้ารายการสูตรทั้งหมด (Recipes Catalog)
 * Route: /recipes
 * ========================================
 * 
 * หน้าที่:
 * - แสดงรายการสูตรอาหารทั้งหมด (route: /recipes)
 * - ระบบค้นหาและกรองสูตร
 * - Catalog หลักของเว็บ
 * 
 * Components ที่ใช้:
 * - RecipeList: รายการสูตร + search
 * 
 * ถูกเรียกใช้โดย:
 * - Header component (navigation)
 * - หน้าอื่นๆ ที่ redirect กลับมา
 * 
 * TODO List:
 * - [ ] เพิ่ม page header (breadcrumb, จำนวนสูตร)
 * - [ ] เพิ่ม advanced filters sidebar (difficulty, prep time, tags)
 * - [ ] รองรับ URL query parameters
 * - [ ] เพิ่ม page metadata
 * ========================================
 */

"use client"
import React from 'react'
import RecipeList from '../../components/RecipeList'

// TODO: เพิ่ม page header
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
  return (
    <main>
      <RecipeList />
    </main>
  )
}
