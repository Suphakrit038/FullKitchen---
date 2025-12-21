/**
 * ========================================
 * Supabase Database Schema - SQL Setup Script
 * ========================================
 * 
 * 📝 คำอธิบาย:
 * SQL script สำหรับสร้าง tables และ policies ใน Supabase
 * Run ใน Supabase Dashboard → SQL Editor
 * 
 * 🎯 Tables:
 * - recipes: เก็บข้อมูลสูตรอาหาร
 * - notes: เก็บโน้ตของสูตร (foreign key to recipes)
 * 
 * 🔐 Security:
 * - Row Level Security (RLS) enabled
 * - Public access policies (adjust later for authentication)
 * 
 * ⚠️ Important:
 * - Column names เป็น snake_case (PostgreSQL convention)
 * - JSONB type สำหรับ arrays (ingredients, steps, tags)
 * - CASCADE DELETE: ลบ recipe → ลบ notes อัตโนมัติ
 * ========================================
 */

-- ============================================
-- 1. DROP EXISTING TABLES (if any)
-- ============================================
-- ⚠️ WARNING: This will delete all existing data!
-- Comment out these lines if you want to keep existing data

DROP TABLE IF EXISTS notes CASCADE;
DROP TABLE IF EXISTS recipes CASCADE;

-- ============================================
-- 2. CREATE TABLES
-- ============================================

-- Table: recipes
CREATE TABLE recipes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT,
  ingredients JSONB DEFAULT '[]'::jsonb,
  steps JSONB DEFAULT '[]'::jsonb,
  tags JSONB DEFAULT '[]'::jsonb,
  thumbnail TEXT DEFAULT '',
  prep_time INTEGER DEFAULT 0,
  cook_time INTEGER DEFAULT 0,
  difficulty TEXT DEFAULT 'ง่าย',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: notes (foreign key to recipes)
CREATE TABLE notes (
  id TEXT PRIMARY KEY,
  recipe_id TEXT NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. CREATE INDEXES (for performance)
-- ============================================

-- Index for sorting by date (most common query)
CREATE INDEX idx_recipes_created_at ON recipes(created_at DESC);

-- Index for searching by name
CREATE INDEX idx_recipes_name ON recipes(name);

-- Index for filtering by tags (GIN index for JSONB)
CREATE INDEX idx_recipes_tags ON recipes USING GIN (tags);

-- Index for notes lookup by recipe_id
CREATE INDEX idx_notes_recipe_id ON notes(recipe_id);

-- ============================================
-- 4. ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 5. CREATE POLICIES (Public Access)
-- ============================================
-- ⚠️ These policies allow ANYONE to read/write
-- Adjust later when you add authentication

-- RECIPES POLICIES
CREATE POLICY "Enable read access for all users" 
  ON recipes FOR SELECT 
  USING (true);

CREATE POLICY "Enable insert for all users" 
  ON recipes FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Enable update for all users" 
  ON recipes FOR UPDATE 
  USING (true);

CREATE POLICY "Enable delete for all users" 
  ON recipes FOR DELETE 
  USING (true);

-- NOTES POLICIES
CREATE POLICY "Enable read access for all users" 
  ON notes FOR SELECT 
  USING (true);

CREATE POLICY "Enable insert for all users" 
  ON notes FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Enable update for all users" 
  ON notes FOR UPDATE 
  USING (true);

CREATE POLICY "Enable delete for all users" 
  ON notes FOR DELETE 
  USING (true);

-- ============================================
-- 6. CREATE FUNCTIONS (Optional - for auto-update)
-- ============================================

-- Function: อัปเดต updated_at อัตโนมัติ
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: เรียก function เมื่อมี UPDATE
CREATE TRIGGER update_recipes_updated_at
  BEFORE UPDATE ON recipes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 7. INSERT SAMPLE DATA (Optional)
-- ============================================

INSERT INTO recipes (id, name, slug, ingredients, steps, tags, prep_time, cook_time, difficulty, created_at, updated_at)
VALUES 
  (
    '1',
    'ข้าวผัดกระเพรา',
    'khao-phad-kraphao',
    '["ไข่ 2 ฟอง", "น้ำปลา 1 ช้อนโต๊ะ", "น้ำมันพืช"]'::jsonb,
    '["ตอกไข่ใส่ชาม", "ใส่น้ำปลาแล้วตีให้เข้ากัน", "ตั้งกระทะใส่น้ำมันให้ร้อน", "เทไข่ลงทอดจนเหลือง"]'::jsonb,
    '["ผัด", "ข้าว", "อาหาร"]'::jsonb,
    2,
    5,
    'ง่าย',
    '2025-12-12T09:59:00.000Z',
    '2025-12-07T12:16:37.461Z'
  ),
  (
    '2',
    'ผัดกะเพรา',
    'phad-kaphrao',
    '["หมูสับ 200 กรัม", "กะเพรา 1 กำ", "พริก 5 เม็ด", "กระเทียม 3 กลีบ", "น้ำปลา 2 ช้อนโต๊ะ", "น้ำตาล 1 ช้อนชา"]'::jsonb,
    '["โขลกพริกกระเทียม", "ผัดหมูสับให้สุก", "ใส่น้ำปลา น้ำตาล", "ใส่กะเพราผัดให้เข้ากัน"]'::jsonb,
    '["ผัด", "ข้าว", "ร.ช", "อาหาร", "VEGร"]'::jsonb,
    10,
    8,
    'ปานกลาง',
    '2025-12-12T09:59:00.000Z',
    '2025-12-07T13:02:07.415Z'
  );

-- Insert sample note
INSERT INTO notes (id, recipe_id, text, created_at)
VALUES 
  ('note-1', '2', 'ถ้าชอบเผ็ดเพิ่มพริกได้', '2025-12-06T11:00:00.000Z');

-- ============================================
-- 8. VERIFY SETUP
-- ============================================

-- Check tables created
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('recipes', 'notes');

-- Check data inserted
SELECT COUNT(*) as recipe_count FROM recipes;
SELECT COUNT(*) as note_count FROM notes;

-- Check RLS enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('recipes', 'notes');

-- ============================================
-- DONE! 🎉
-- ============================================
-- Next steps:
-- 1. ใส่ Supabase URL และ keys ใน .env.local
-- 2. รัน migration script (scripts/migrate-to-supabase.js)
-- 3. ทดสอบ CRUD operations
-- 4. Deploy!
