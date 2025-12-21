# 🚀 Quick Deploy Guide - FullKitchen with Supabase

## ✅ สิ่งที่สร้างแล้ว

### 📁 ไฟล์ใหม่ที่สร้าง:

1. **`.env.local`** - Environment variables (ต้องใส่ค่าจริง)
2. **`.env.example`** - Template สำหรับ env variables
3. **`lib/supabase.js`** - Supabase client configuration
4. **`lib/recipes.supabase.js`** - Business logic ใช้ Supabase แทน JSON
5. **`supabase-schema.sql`** - SQL script สำหรับสร้าง tables
6. **`scripts/migrate-to-supabase.js`** - Migration script จาก JSON → Supabase
7. **`SUPABASE_SETUP.md`** - คู่มือการตั้งค่าละเอียด

### 📦 Dependencies ที่ติดตั้งแล้ว:

- ✅ `@supabase/supabase-js` (v2.x)

---

## 🎯 Next Steps

### Step 1: ตั้งค่า Supabase (5 นาที)

1. สร้าง account ที่ [https://supabase.com](https://supabase.com)
2. สร้าง Project ใหม่
3. ไปที่ **Settings → API** คัดลอก:
   - Project URL
   - anon public key
   - service_role key
4. เปิด `.env.local` แล้วใส่ค่าจริง:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
```

### Step 2: สร้าง Database (2 นาที)

1. ไปที่ **SQL Editor** ใน Supabase Dashboard
2. เปิดไฟล์ `supabase-schema.sql`
3. Copy ทั้งหมด → Paste → **Run**
4. ตรวจสอบที่ **Table Editor** ควรเห็น:
   - `recipes` table (2 sample recipes)
   - `notes` table (1 sample note)

### Step 3: ย้ายข้อมูล (ถ้ามี) (1 นาที)

ถ้าคุณมีข้อมูลเก่าใน `data/db.json`:

```bash
node scripts/migrate-to-supabase.js
```

### Step 4: เปลี่ยนจาก JSON → Supabase

เลือกวิธีใดวิธีหนึ่ง:

#### **Option A: Rename ไฟล์ (แนะนำ)**
```bash
# Backup เดิม
mv lib/recipes.js lib/recipes.json.bak

# Rename Supabase version
mv lib/recipes.supabase.js lib/recipes.js
```

#### **Option B: แก้ไข imports ทุกไฟล์**
แทนที่ทุกจุดที่ import:
```javascript
// Before
import { getAllRecipes } from '../lib/recipes'

// After
import { getAllRecipes } from '../lib/recipes.supabase'
```

### Step 5: ทดสอบ

```bash
npm run dev
```

เปิด http://localhost:3000 แล้วทดสอบ:
- ✅ ดูรายการสูตร
- ✅ เพิ่มสูตรใหม่
- ✅ แก้ไขสูตร
- ✅ ลบสูตร

---

## 🌐 Deploy to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "feat: add Supabase integration"
git push origin main
```

### 2. Deploy on Vercel

1. ไปที่ [https://vercel.com/new](https://vercel.com/new)
2. Import repository: `FullKitchen---`
3. **Framework Preset**: Next.js (auto-detect)
4. **Environment Variables**:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
   ```
5. คลิก **Deploy**
6. รอ 2-3 นาที → เสร็จ! 🎉

---

## 🔧 Configuration Files

### `.env.local` (ห้ามcommit!)
```env
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
SUPABASE_SERVICE_ROLE_KEY=your-admin-key
```

### `package.json` (มีอยู่แล้ว)
```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0",
    ...
  }
}
```

---

## 📊 Architecture Changes

### Before (JSON File):
```
Components → lib/recipes.js → lib/db.js → data/db.json
```

### After (Supabase):
```
Components → lib/recipes.supabase.js → lib/supabase.js → Supabase PostgreSQL
```

---

## ❓ Troubleshooting

### Error: Missing environment variables

**แก้:** 
1. ตรวจสอบว่ามีไฟล์ `.env.local`
2. Restart dev server (`Ctrl+C` → `npm run dev`)

### Error: relation "recipes" does not exist

**แก้:**
1. รัน `supabase-schema.sql` ใน Supabase Dashboard
2. ตรวจสอบใน Table Editor

### Error: Row Level Security violation

**แก้:**
1. ไปที่ **Authentication → Policies**
2. ตรวจสอบว่า policies มีครบ (SELECT, INSERT, UPDATE, DELETE)

---

## 📚 Documentation

- **Setup Guide**: `SUPABASE_SETUP.md` (คู่มือละเอียด)
- **Schema**: `supabase-schema.sql` (SQL script)
- **Migration**: `scripts/migrate-to-supabase.js` (ย้ายข้อมูล)

---

## ✅ Deployment Checklist

### Supabase Setup:
- [ ] สร้าง Supabase project
- [ ] คัดลอก API keys
- [ ] รัน SQL schema
- [ ] (Optional) ย้ายข้อมูลจาก JSON

### Code Changes:
- [ ] ใส่ environment variables ใน `.env.local`
- [ ] เปลี่ยน imports เป็น `recipes.supabase.js`
- [ ] ทดสอบ CRUD operations locally

### Deployment:
- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] ตั้ง environment variables บน Vercel
- [ ] ทดสอบ production URL

---

## 🎉 Done!

ตอนนี้โปรเจกต์พร้อม deploy แล้ว!

**Local**: http://localhost:3000  
**Production**: https://your-app.vercel.app

---

**Questions?** อ่าน `SUPABASE_SETUP.md` สำหรับคู่มือละเอียด
