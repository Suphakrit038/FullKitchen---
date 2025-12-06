# FullKitchen — Recipe Management App

เว็บแอปจัดการสูตรอาหาร พัฒนาด้วย Next.js + React + JSON Database

## 🚀 เริ่มต้นใช้งาน

### 1. ติดตั้ง Dependencies
```bash
npm install
```

### 2. รันโปรเจกต์
```bash
npm run dev
```

เปิด [http://localhost:3000](http://localhost:3000)

## 📁 โครงสร้างโปรเจกต์

```
/project-root
├─ /app                    # Next.js App Router
│   ├─ /recipes           # หน้าจัดการสูตร
│   │    ├─ page.js              # รายการเมนู (Catalog)
│   │    ├─ new/page.js          # เพิ่มสูตรใหม่
│   │    └─ [id]/
│   │         ├─ page.js         # รายละเอียดสูตร
│   │         ├─ edit/page.js    # แก้ไขสูตร
│   │         └─ not-found.js    # 404
│   ├─ layout.js          # Root layout
│   └─ page.js            # Home redirect
│
├─ /components            # React Components
│   ├─ RecipeCard.jsx    # การ์ดแสดงเมนู
│   ├─ RecipeForm.jsx    # ฟอร์มเพิ่ม/แก้ไข
│   ├─ RecipeList.jsx    # รายการเมนู
│   ├─ Header.jsx        # หัวเว็บ
│   └─ /ui               # UI Components
│        ├─ Button.jsx
│        ├─ Toast.jsx
│        └─ Modal.jsx
│
├─ /lib                   # Business Logic Layer
│   ├─ db.js             # Database access (readDB/writeDB)
│   ├─ recipes.js        # Recipe CRUD operations
│   └─ utils.js          # Helper functions
│
├─ /data                  # Mock Database
│   └─ db.json           # JSON storage
│
└─ /styles
    └─ globals.css       # Global styles
```

## 🏗️ สถาปัตยกรรม (Architecture)

### Layer แยกตามหน้าที่ (Clean Architecture):

#### 1. **Presentation Layer** (`/app`, `/components`)
- จัดการ UI และ routing
- แสดงผลข้อมูลและรับ input จากผู้ใช้
- ไม่มี business logic

#### 2. **Business Logic Layer** (`/lib/recipes.js`)
- CRUD operations สำหรับสูตรอาหาร
- Validation ข้อมูล
- จัดการ notes/comments
- ไม่ทราบว่าข้อมูลมาจากไหน (database agnostic)

#### 3. **Data Access Layer** (`/lib/db.js`)
- อ่าน/เขียนข้อมูลจาก storage
- Atomic file operations (ป้องกัน race condition)
- Error handling

#### 4. **Storage Layer** (`/data/db.json`)
- เก็บข้อมูลจริง
- ง่ายต่อการ debug และ version control

### ข้อดีของสถาปัตยกรรมนี้:

✅ **แยก concern ชัดเจน** - UI / Logic / Data แยกกัน  
✅ **ทดสอบง่าย** - Mock ได้ทุก layer  
✅ **ขยายได้** - เพิ่มฟีเจอร์ไม่กระทบของเก่า  
✅ **Maintainable** - แก้ไขง่าย ไม่ต้องเปลี่ยนหลายที่  
✅ **Database agnostic** - เปลี่ยน DB ได้โดยแก้แค่ `lib/db.js`

## 📝 ฟีเจอร์

- ✅ เพิ่ม/แก้ไข/ลบสูตรอาหาร
- ✅ แสดงรายการสูตรแบบ Grid/Card
- ✅ ดูรายละเอียดสูตร (ส่วนผสม + วิธีทำ)
- ✅ เพิ่มโน้ตส่วนตัวในแต่ละสูตร
- ✅ ค้นหาและกรองสูตร (search/filter/sort)
- ✅ Validation ข้อมูล
- ✅ Atomic file operations (ป้องกันข้อมูลเสีย)

### 🔄 กำลังพัฒนา (Roadmap)
- ⏳ อัปโหลดรูปภาพเมนู
- ⏳ Authentication (NextAuth.js)
- ⏳ Export/Import สูตร (JSON/PDF)
- ⏳ Tags management
- ⏳ Recipe rating

## 🔄 การย้ายไปใช้ Database จริง

เนื่องจากแยก layer ชัดเจน การย้ายไป DB จริงทำได้ง่าย ๆ โดย**แก้แค่ `lib/db.js`**:

### ตัวอย่าง: ย้ายไป Supabase
```javascript
// lib/db.js (เดิม: fs operations)
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export async function readDB() {
  const { data } = await supabase.from('recipes').select('*')
  return { recipes: data }
}

export async function writeDB(data) {
  // implement with Supabase operations
}
```

### ตัวอย่าง: ย้ายไป MongoDB
```javascript
// lib/db.js (เดิม: fs operations)
import mongoose from 'mongoose'

export async function readDB() {
  const recipes = await Recipe.find({})
  return { recipes }
}

export async function writeDB(data) {
  // implement with MongoDB operations
}
```

**ส่วนอื่นของโค้ดไม่ต้องแก้!** เพราะ `lib/recipes.js` และ components ไม่รู้เลยว่าข้อมูลมาจากไหน

## 📦 Technologies

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **Material-UI (MUI)** - Component library
- **@emotion** - CSS-in-JS
- **nanoid** - Unique ID generation

## 🛠️ API Reference (Service Layer)

### `lib/recipes.js`

#### `getAllRecipes(options)`
```javascript
const recipes = await getAllRecipes({ 
  q: 'ไข่',           // search query
  filter: 'ง่าย',      // filter by tag
  sort: 'newest'      // 'name' | 'newest' | 'oldest'
})
```

#### `getRecipeById(id)`
```javascript
const recipe = await getRecipeById('1')
```

#### `addRecipe(data)`
```javascript
const newRecipe = await addRecipe({
  name: 'ไข่ดาว',
  ingredients: ['ไข่ 1 ฟอง', 'น้ำมัน'],
  steps: ['ตั้งกระทะ', 'ทอดไข่'],
  tags: ['ง่าย'],
  prepTime: 2,
  cookTime: 3,
  difficulty: 'ง่าย'
})
```

#### `updateRecipe(id, data)`
```javascript
const updated = await updateRecipe('1', {
  name: 'ไข่เจียวหมูสับ',
  ingredients: [...],
  steps: [...]
})
```

#### `deleteRecipe(id)`
```javascript
await deleteRecipe('1')
```

#### Note Operations
```javascript
// เพิ่มโน้ต
const note = await addNoteToRecipe('1', 'ใส่พริกได้')

// แก้ไขโน้ต
await updateNote('1', 'note-1', 'ใส่พริกเยอะ ๆ')

// ลบโน้ต
await deleteNote('1', 'note-1')
```

## 🧪 Testing

```bash
# Unit tests (coming soon)
npm test

# E2E tests (coming soon)
npm run test:e2e
```

## 📝 Data Schema

```typescript
interface Recipe {
  id: string                // unique id (nanoid)
  name: string              // ชื่อเมนู
  slug: string              // URL-friendly slug
  ingredients: string[]     // ส่วนผสม
  steps: string[]           // วิธีทำ
  notes: Note[]             // โน้ต
  tags: string[]            // ป้ายกำกับ
  thumbnail: string         // รูปภาพ (URL/base64)
  prepTime: number          // เวลาเตรียม (นาที)
  cookTime: number          // เวลาปรุง (นาที)
  difficulty: string        // ระดับความยาก
  createdAt: string         // วันที่สร้าง (ISO)
  updatedAt: string         // วันที่แก้ไข (ISO)
}

interface Note {
  id: string                // unique id
  text: string              // ข้อความ
  createdAt: string         // วันที่สร้าง (ISO)
}
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT License - ใช้ได้อย่างอิสระ

## 👨‍💻 Developer

**FullKitchen Team**  
📅 December 2025  
🌐 [GitHub](https://github.com/Suphakrit038/FullKitchen---)

---

**Happy Cooking! 🍳**
