"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import RecipeForm from '../../../../../components/RecipeForm'
import { getRecipeById } from '../../../../../lib/recipes'

// TODO: 🟢 เพิ่ม error handling
// - แทน console.error ด้วย Toast
// - แสดง error message ถ้า load ไม่สำเร็จ
// - ปุ่ม retry

// TODO: 🟡 เพิ่ม unsaved changes warning
// - เหมือนใน new page
// - เช็คว่ามีการแก้ไขหรือไม่

// TODO: 🟢 เพิ่ม page metadata
// - dynamic title: "แก้ไข {recipeName} | FullKitchen"

export default function EditRecipePage() {
  const params = useParams()
  const id = params?.id
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    async function loadRecipe() {
      try {
        const data = await getRecipeById(id)
        setRecipe(data)
      } catch (error) {
        console.error('Error loading recipe:', error)
      } finally {
        setLoading(false)
      }
    }

    loadRecipe()
  }, [id])

  if (loading) {
    // TODO: 🟢 ปรับปรุง loading state
    // - เพิ่ม loading text: "กำลังโหลดข้อมูล..."
    // - ใช้ Skeleton component แทน CircularProgress
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (!recipe) {
    // TODO: 🟢 ปรับปรุง not found page
    // - เพิ่ม icon (ErrorOutline)
    // - ปุ่ม "กลับไปหน้าสูตรทั้งหมด"
    // - หรือใช้ notFound() จาก Next.js
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5">ไม่พบสูตรนี้</Typography>
        {/* TODO: 🟢 เพิ่ม <Button href="/recipes">กลับหน้าสูตร</Button> */}
      </Box>
    )
  }

  return (
    <main>
      {/* TODO: 🟢 เพิ่ม breadcrumb */}
      <RecipeForm recipe={recipe} mode="edit" />
    </main>
  )
}
