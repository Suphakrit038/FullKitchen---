/**
 * ========================================
 * lib/supabase.js - Supabase Client Configuration
 * ========================================
 * 
 * 📝 คำอธิบาย:
 * Supabase client instance สำหรับเชื่อมต่อกับ Supabase backend
 * แทนที่ JSON file database ด้วย PostgreSQL
 * 
 * 🎯 การใช้งาน:
 * import { supabase } from './supabase'
 * const { data, error } = await supabase.from('recipes').select('*')
 * 
 * 📦 ติดตั้ง:
 * npm install @supabase/supabase-js
 * 
 * ⚙️ Configuration:
 * ตั้งค่าใน .env.local:
 * - NEXT_PUBLIC_SUPABASE_URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY
 * 
 * ⚠️ Security:
 * - NEXT_PUBLIC_* = ใช้ได้ทั้ง client & server
 * - SUPABASE_SERVICE_ROLE_KEY = ใช้ server-side only (อย่า expose)
 * - Row Level Security (RLS) ต้องเปิดใน Supabase
 * ========================================
 */

import { createClient } from '@supabase/supabase-js'

// อ่าน environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// ตรวจสอบว่ามี config ครบ
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables!')
  console.error('Required:')
  console.error('- NEXT_PUBLIC_SUPABASE_URL')
  console.error('- NEXT_PUBLIC_SUPABASE_ANON_KEY')
  throw new Error('Missing Supabase configuration. Please check .env.local file.')
}

// สร้าง Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'x-application-name': 'fullkitchen-app',
    },
  },
})

// Export types for TypeScript (optional)
export default supabase

/**
 * 💡 การใช้งาน Supabase Client:
 * 
 * 1. SELECT (อ่านข้อมูล):
 *    const { data, error } = await supabase
 *      .from('recipes')
 *      .select('*, notes(*)')
 *      .eq('id', recipeId)
 * 
 * 2. INSERT (เพิ่มข้อมูล):
 *    const { data, error } = await supabase
 *      .from('recipes')
 *      .insert({ name: 'ผัดไทย', ... })
 *      .select()
 *      .single()
 * 
 * 3. UPDATE (แก้ไขข้อมูล):
 *    const { data, error } = await supabase
 *      .from('recipes')
 *      .update({ name: 'New Name' })
 *      .eq('id', recipeId)
 * 
 * 4. DELETE (ลบข้อมูล):
 *    const { error } = await supabase
 *      .from('recipes')
 *      .delete()
 *      .eq('id', recipeId)
 * 
 * 5. SEARCH (ค้นหา):
 *    const { data, error } = await supabase
 *      .from('recipes')
 *      .select('*')
 *      .ilike('name', `%${searchTerm}%`)
 * 
 * 6. RELATIONS (join tables):
 *    const { data, error } = await supabase
 *      .from('recipes')
 *      .select(`
 *        *,
 *        notes (id, text, created_at)
 *      `)
 */
