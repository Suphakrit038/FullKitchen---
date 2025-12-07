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
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import SidebarFilters from '../components/SidebarFilters'
import MainContentHeader from '../components/MainContentHeader'
import EnhancedRecipeCard from '../components/EnhancedRecipeCard'
import FloatingActions from '../components/FloatingActions'
import { getAllRecipes } from '../lib/api'
import CircularProgress from '@mui/material/CircularProgress'

export default function HomePage() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadRecipes()
  }, [])

  async function loadRecipes() {
    try {
      const data = await getAllRecipes({ sort: 'newest' })
      setRecipes(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <>
      <Box sx={{ display: 'flex', gap: 3, py: 3 }}>
        {/* Sidebar */}
        <Box sx={{ width: 280, flexShrink: 0, display: { xs: 'none', md: 'block' } }}>
          <SidebarFilters onFilterChange={(filters) => console.log(filters)} />
        </Box>

        {/* Main Content */}
        <Box sx={{ flexGrow: 1 }}>
          <MainContentHeader recipeCount={recipes.length} />
          
          <Grid container spacing={3}>
            {recipes.map((recipe) => (
              <Grid item xs={12} sm={6} lg={4} key={recipe.id}>
                <EnhancedRecipeCard recipe={recipe} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      <FloatingActions />
    </>
  )
}
