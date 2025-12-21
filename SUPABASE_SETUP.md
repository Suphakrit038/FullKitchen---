# 🚀 Supabase Setup Guide - FullKitchen

คู่มือการตั้งค่าและ Deploy โปรเจกต์ FullKitchen ด้วย Supabase

---

## 📋 ขั้นตอนการตั้งค่า

### 1. สร้าง Supabase Project

1. ไปที่ [https://supabase.com](https://supabase.com)
2. Sign up / Login
3. คลิก **"New Project"**
4. กรอกข้อมูล:
   - **Project Name**: FullKitchen (หรือชื่ออื่นตามต้องการ)
   - **Database Password**: สร้างรหัสผ่านแล้วเก็บไว้
   - **Region**: เลือก Singapore หรือใกล้ที่สุด
5. คลิก **"Create Project"** (รอ 1-2 นาที)

---

### 2. คัดลอก API Keys

1. ไปที่ **Settings** → **API**
2. คัดลอกข้อมูลเหล่านี้:

```
Project URL: https://xxxxxxxxxxxxx.supabase.co
anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. เปิดไฟล์ `.env.local` ในโปรเจกต์
4. แทนที่ค่าตามนี้:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **สำคัญ**: อย่า commit `.env.local` ใน Git!

---

### 3. รัน SQL Schema

1. ไปที่ **SQL Editor** ใน Supabase Dashboard
2. คลิก **"New Query"**
3. คัดลอกเนื้อหาจากไฟล์ `supabase-schema.sql` ทั้งหมด
4. Paste ลงในหน้า SQL Editor
5. คลิก **"Run"** (⌘ + Enter)
6. รอจนเห็นข้อความ **"Success"**

✅ **ตรวจสอบ**:
- ไปที่ **Table Editor** ควรเห็น 2 tables: `recipes` และ `notes`
- คลิกที่แต่ละตาราง ควรมี sample data 2 recipes

---

### 4. ติดตั้ง Dependencies (ทำแล้วใน step ก่อนหน้า)

```bash
npm install @supabase/supabase-js
```

---

### 5. ย้ายข้อมูล (Migration)

ถ้ามีข้อมูลเก่าใน `data/db.json` ให้ทำตามนี้:

```bash
# รัน migration script
node scripts/migrate-to-supabase.js
```

คุณจะเห็น output แบบนี้:

```
🚀 Starting migration from JSON to Supabase...

📊 Found 2 recipes to migrate

📝 Migrating: ข้าวผัดกระเพรา (ID: 1)
  ✅ Recipe inserted successfully

📝 Migrating: ผัดกะเพรา (ID: 2)
  ✅ Recipe inserted successfully
  📌 Migrating 1 notes...
    ✅ Note inserted

==================================================
🎉 Migration complete!
✅ Success: 2 recipes
❌ Errors: 0 recipes
==================================================
```

---

### 6. เปลี่ยนการใช้งานจาก JSON → Supabase

แก้ไขไฟล์ที่ import `recipes.js`:

#### **Before (JSON version):**
```javascript
const { getAllRecipes, addRecipe } = require('../lib/recipes')
```

#### **After (Supabase version):**
```javascript
const { getAllRecipes, addRecipe } = require('../lib/recipes.supabase')
```

หรือเปลี่ยนชื่อไฟล์:
```bash
# Backup เดิม
mv lib/recipes.js lib/recipes.json-backup.js

# Rename Supabase version
mv lib/recipes.supabase.js lib/recipes.js
```

---

### 7. ทดสอบการทำงาน

```bash
npm run dev
```

เปิด http://localhost:3000

ทดสอบ:
- ✅ ดูรายการสูตร
- ✅ เพิ่มสูตรใหม่
- ✅ แก้ไขสูตร
- ✅ ลบสูตร
- ✅ เพิ่ม/แก้ไข/ลบโน้ต

---

## 🔍 Troubleshooting

### ❌ Error: Missing Supabase environment variables

**สาเหตุ**: ไม่มีไฟล์ `.env.local` หรือตั้งค่าผิด

**แก้ไข**:
1. ตรวจสอบว่ามีไฟล์ `.env.local` ในโฟลเดอร์ root
2. ตรวจสอบว่ามีค่า `NEXT_PUBLIC_SUPABASE_URL` และ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Restart dev server (`Ctrl+C` แล้ว `npm run dev` ใหม่)

---

### ❌ Error: relation "recipes" does not exist

**สาเหตุ**: ยังไม่ได้รัน SQL schema

**แก้ไข**:
1. ไปที่ Supabase Dashboard → SQL Editor
2. รันไฟล์ `supabase-schema.sql` ทั้งหมด
3. Refresh หน้า Table Editor ตรวจสอบว่ามีตาราง

---

### ❌ Error: Row Level Security policy violation

**สาเหตุ**: RLS policies ไม่ถูกต้อง

**แก้ไข**:
1. ไปที่ **Authentication** → **Policies**
2. ตรวจสอบว่า `recipes` และ `notes` มี policies ครบ 4 อัน (SELECT, INSERT, UPDATE, DELETE)
3. ตรวจสอบว่า policies เป็น `USING (true)` (allow all)

---

### ❌ Migration script error: ENOENT

**สาเหตุ**: ไม่พบไฟล์ `data/db.json`

**แก้ไข**:
1. ตรวจสอบว่ามีไฟล์ `data/db.json`
2. รัน script จาก root directory:
   ```bash
   cd C:\Users\Admin\Documents\FullKitchen---
   node scripts/migrate-to-supabase.js
   ```

---

## 📊 Database Schema Reference

### Table: `recipes`

| Column | Type | Description |
|--------|------|-------------|
| id | TEXT | Primary Key (nanoid) |
| name | TEXT | ชื่อสูตร |
| slug | TEXT | URL-friendly slug |
| ingredients | JSONB | Array ของส่วนผสม |
| steps | JSONB | Array ของขั้นตอน |
| tags | JSONB | Array ของแท็ก |
| thumbnail | TEXT | URL รูปภาพ |
| prep_time | INTEGER | เวลาเตรียม (นาที) |
| cook_time | INTEGER | เวลาปรุง (นาที) |
| difficulty | TEXT | ระดับความยาก |
| created_at | TIMESTAMPTZ | วันที่สร้าง |
| updated_at | TIMESTAMPTZ | วันที่แก้ไขล่าสุด |

### Table: `notes`

| Column | Type | Description |
|--------|------|-------------|
| id | TEXT | Primary Key (nanoid) |
| recipe_id | TEXT | Foreign Key → recipes.id |
| text | TEXT | เนื้อหาโน้ต |
| created_at | TIMESTAMPTZ | วันที่สร้าง |

---

## 🚀 Deploy to Vercel

1. Push โปรเจกต์ไป GitHub
2. ไปที่ [https://vercel.com/new](https://vercel.com/new)
3. Import repository
4. **Environment Variables** → เพิ่ม:
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```
5. คลิก **Deploy**
6. รอ 2-3 นาที → เสร็จ! 🎉

---

## ✅ Checklist

- [ ] สร้าง Supabase project
- [ ] คัดลอก API keys ใส่ `.env.local`
- [ ] รัน SQL schema ใน Supabase
- [ ] ติดตั้ง `@supabase/supabase-js`
- [ ] รัน migration script (ถ้ามีข้อมูลเก่า)
- [ ] แก้ไข imports ให้ใช้ `recipes.supabase.js`
- [ ] ทดสอบ CRUD operations
- [ ] Deploy ไป Vercel

---

## 📚 เอกสารเพิ่มเติม

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

---

**Version:** v1.0.0 - Supabase Integration
**Last Updated:** December 21, 2025
