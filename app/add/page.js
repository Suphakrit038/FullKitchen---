"use client"
import React from 'react'
import RecipeForm from '../../components/RecipeForm'

// TODO: 🔴 DEPRECATED - ไฟล์นี้ไม่ควรใช้แล้ว
// - ใช้ /recipes/new แทน (RESTful convention)
// - ควร redirect ไป /recipes/new
// - หรือลบไฟล์นี้ออก

// TODO: 🟢 เพิ่ม redirect
// - import { redirect } from 'next/navigation'
// - เรียก redirect('/recipes/new')

export default function AddPage() {
  // TODO: 🟢 แทนด้วย: redirect('/recipes/new')
  
  return (
    <main>
      <RecipeForm />
    </main>
  )
}
