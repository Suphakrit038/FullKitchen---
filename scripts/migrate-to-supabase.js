/**
 * ========================================
 * Migration Script: JSON → Supabase
 * ========================================
 * 
 * 📝 คำอธิบาย:
 * สคริปต์สำหรับย้ายข้อมูลจาก data/db.json ไปยัง Supabase
 * 
 * 🚀 วิธีใช้:
 * 1. ตั้งค่า .env.local ให้เรียบร้อย
 * 2. รัน SQL schema ใน Supabase ก่อน (supabase-schema.sql)
 * 3. รันคำสั่ง: node scripts/migrate-to-supabase.js
 * 
 * ⚠️ คำเตือน:
 * - ต้องมี SUPABASE_SERVICE_ROLE_KEY (admin access)
 * - จะเขียนทับข้อมูลเก่าถ้ามี ID ซ้ำ (upsert)
 * - ควร backup db.json ก่อน
 * 
 * ========================================
 */

require('dotenv').config({ path: '.env.local' })
const fs = require('fs')
const path = require('path')
const { createClient } = require('@supabase/supabase-js')

// ===================================
// Configuration
// ===================================

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials!')
  console.error('Required environment variables:')
  console.error('- NEXT_PUBLIC_SUPABASE_URL')
  console.error('- SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY)')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// ===================================
// Helper Functions
// ===================================

/**
 * แปลงข้อมูล JSON → Supabase format
 */
function transformRecipeForDB(recipe) {
  return {
    id: recipe.id,
    name: recipe.name,
    slug: recipe.slug || '',
    ingredients: recipe.ingredients || [],
    steps: recipe.steps || [],
    tags: recipe.tags || [],
    thumbnail: recipe.thumbnail || '',
    prep_time: recipe.prepTime || 0,
    cook_time: recipe.cookTime || 0,
    difficulty: recipe.difficulty || 'ง่าย',
    created_at: recipe.createdAt || new Date().toISOString(),
    updated_at: recipe.updatedAt || new Date().toISOString()
  }
}

function transformNoteForDB(note, recipeId) {
  return {
    id: note.id,
    recipe_id: recipeId,
    text: note.text,
    created_at: note.createdAt || new Date().toISOString()
  }
}

// ===================================
// Main Migration Function
// ===================================

async function migrate() {
  console.log('🚀 Starting migration from JSON to Supabase...\n')

  // 1. อ่าน db.json
  const dbPath = path.join(__dirname, '../data/db.json')
  
  if (!fs.existsSync(dbPath)) {
    console.error('❌ File not found: data/db.json')
    process.exit(1)
  }

  const jsonData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'))
  const recipes = jsonData.recipes || []

  if (recipes.length === 0) {
    console.log('⚠️  No recipes found in db.json')
    return
  }

  console.log(`📊 Found ${recipes.length} recipes to migrate\n`)

  // 2. Migrate recipes
  let successCount = 0
  let errorCount = 0

  for (const recipe of recipes) {
    try {
      console.log(`📝 Migrating: ${recipe.name} (ID: ${recipe.id})`)

      // 2.1 Insert/Update recipe
      const recipeData = transformRecipeForDB(recipe)
      
      const { data: insertedRecipe, error: recipeError } = await supabase
        .from('recipes')
        .upsert(recipeData, { onConflict: 'id' })
        .select()
        .single()

      if (recipeError) {
        console.error(`  ❌ Error inserting recipe: ${recipeError.message}`)
        errorCount++
        continue
      }

      console.log(`  ✅ Recipe inserted successfully`)

      // 2.2 Migrate notes (if any)
      if (recipe.notes && recipe.notes.length > 0) {
        console.log(`  📌 Migrating ${recipe.notes.length} notes...`)

        for (const note of recipe.notes) {
          const noteData = transformNoteForDB(note, recipe.id)

          const { error: noteError } = await supabase
            .from('notes')
            .upsert(noteData, { onConflict: 'id' })

          if (noteError) {
            console.error(`    ❌ Error inserting note: ${noteError.message}`)
          } else {
            console.log(`    ✅ Note inserted`)
          }
        }
      }

      successCount++
      console.log('')

    } catch (error) {
      console.error(`  ❌ Unexpected error: ${error.message}`)
      errorCount++
      console.log('')
    }
  }

  // 3. Summary
  console.log('=' . repeat(50))
  console.log('🎉 Migration complete!')
  console.log(`✅ Success: ${successCount} recipes`)
  console.log(`❌ Errors: ${errorCount} recipes`)
  console.log('=' . repeat(50))

  // 4. Verify data
  console.log('\n🔍 Verifying data in Supabase...')
  
  const { count: recipeCount } = await supabase
    .from('recipes')
    .select('*', { count: 'exact', head: true })

  const { count: noteCount } = await supabase
    .from('notes')
    .select('*', { count: 'exact', head: true })

  console.log(`📊 Total recipes in Supabase: ${recipeCount}`)
  console.log(`📌 Total notes in Supabase: ${noteCount}`)

  console.log('\n✨ Done! You can now use Supabase instead of JSON file.')
}

// ===================================
// Run Migration
// ===================================

migrate()
  .then(() => {
    console.log('\n👍 Migration script finished successfully')
    process.exit(0)
  })
  .catch(error => {
    console.error('\n❌ Migration failed:', error)
    process.exit(1)
  })
