# FullKitchen — Recipe Management App

เว็บแอปจัดการสูตรอาหาร พัฒนาด้วย Next.js + React + Supabase (PostgreSQL)

## 🚀 Quick Start

### Development (Local JSON Database)
```bash
npm install
npm run dev
```

### Production (Supabase Database)

1. **ตั้งค่า Supabase** - อ่าน `SUPABASE_SETUP.md`
2. **Deploy** - อ่าน `DEPLOY.md`

เปิด [http://localhost:3000](http://localhost:3000)

---

## 📊 Database Options

### Option 1: JSON File (Development) - ใช้งานได้แล้ว ✅
- ใช้ไฟล์ `data/db.json`
- เหมาะสำหรับ development local
- ไม่สามารถ deploy ไป Netlify/Vercel ได้

### Option 2: Supabase (Production) - พร้อมใช้งาน 🆕
- ใช้ PostgreSQL database
- **ไฟล์ที่เกี่ยวข้อง:**
  - `lib/supabase.js` - Client configuration
  - `lib/recipes.supabase.js` - Business logic
  - `supabase-schema.sql` - Database schema
  - `scripts/migrate-to-supabase.js` - Migration script
- **คู่มือ:** อ่าน `SUPABASE_SETUP.md`

---

## โครงสร้างโปรเจกต์และหน้าที่ของไฟล์

```
/project-root
├─ /app                         # Next.js App Router (Routing & Pages)
│   ├─ layout.js                    # Root layout - ThemeProvider, Header, Container
│   ├─ page.js                      # Home page - แสดง RecipeList
│   ├─ error.js                     # Global error boundary
│   ├─ not-found.js                 # Global 404 page
│   ├─ loading.js                   # Global loading state
│   │
│   ├─ /add                         # (DEPRECATED - ใช้ /recipes/new แทน)
│   │   └─ page.js                  # เก่า - เพิ่มสูตร (redirect ไป /recipes/new)
│   │
│   └─ /recipes                     # Routes สำหรับสูตรอาหาร
│       ├─ page.js                  # หน้ารายการสูตรทั้งหมด (Catalog)
│       ├─ /new
│       │   └─ page.js              # หน้าเพิ่มสูตรใหม่
│       └─ /[id]
│           ├─ page.js              # หน้ารายละเอียดสูตร
│           ├─ not-found.js         # 404 เฉพาะสูตร
│           └─ /edit
│               └─ page.js          # หน้าแก้ไขสูตร
│
├─ /components                  # React Components
│   ├─ Header.jsx                   # Navigation bar - Logo, Links, ปุ่มเพิ่มสูตร
│   ├─ RecipeCard.jsx               # Card แสดงสูตรแบบย่อ - ชื่อ, เวลา, tags
│   ├─ RecipeList.jsx               # List + Search - แสดงสูตรทั้งหมด + ค้นหา
│   ├─ RecipeForm.jsx               # Form เพิ่ม/แก้ไขสูตร - validation, auto-save
│   ├─ NotesSection.jsx             # จัดการ notes ในสูตร - CRUD operations
│   │
│   └─ /ui                          # Reusable UI Components
│       ├─ Toast.jsx                # Toast notifications - success, error, warning
│       ├─ ConfirmDialog.jsx        # Confirmation dialog - แทน confirm()
│       ├─ Button.jsx               # Custom button - loading state
│       ├─ Modal.jsx                # Generic modal - responsive
│       └─ Loading.jsx              # Loading components - Spinner, Skeleton, Bar
│
├─ /lib                         # Business Logic Layer
│   ├─ db.js                        # Data Access - readDB(), writeDB() (atomic)
│   ├─ recipes.js                   # Recipe Service - CRUD + search/filter/sort
│   └─ utils.js                     # Helper functions - validation, formatting, ID gen
│
├─ /data                        # Storage Layer
│   └─ db.json                      # JSON database - เก็บ recipes array
│
├─ /styles                      # Styling
│   └─ globals.css                  # Global CSS - reset, fonts, animations
│
├─ package.json                 # Dependencies & Scripts
├─ .gitignore                   # Git ignore rules
└─ README.md                    # Project documentation
```

---

## รายละเอียดหน้าที่แต่ละไฟล์

### **App Router** (`/app`)

<details>
<summary><b>app/layout.js</b> - Root Layout Wrapper</summary>

**หน้าที่:**
- Wrap ทุกหน้าด้วย MUI ThemeProvider
- แสดง Header component (navigation)
- จัดการ global theme (colors, fonts)
- Container wrapper สำหรับ content

**ที่ต้องทำ:**
- เพิ่ม dark mode toggle
- เพิ่ม ToastProvider
- เพิ่ม ConfirmDialogProvider
- เพิ่ม metadata สำหรับ SEO
</details>

<details>
<summary><b>app/page.js</b> - Home Page</summary>

**หน้าที่:**
- หน้าแรกของเว็บ (/)
- แสดง RecipeList component
- จุดเริ่มต้นของ user

**ที่ต้องทำ:**
- เพิ่ม Hero section
- เพิ่ม Featured recipes
- เพิ่ม Categories section
</details>

<details>
<summary><b>app/error.js</b> - Error Boundary</summary>

**หน้าที่:**
- จับ runtime errors ทั่วทั้ง app
- แสดงหน้า error สวยงาม
- มีปุ่ม "ลองอีกครั้ง" (reset)

**ที่ต้องทำ:**
- เพิ่ม error logging (Sentry)
- แยก error types (network, permission, etc.)
</details>

<details>
<summary><b>app/not-found.js</b> - Global 404</summary>

**หน้าที่:**
- หน้า 404 สำหรับ routes ที่ไม่มีอยู่
- แสดง icon + message
- ปุ่มกลับหน้าหลัก

**ที่ต้องทำ:**
- เพิ่ม search suggestions
- แสดง popular recipes
</details>

<details>
<summary><b>app/recipes/page.js</b> - Recipes Catalog</summary>

**หน้าที่:**
- แสดงรายการสูตรทั้งหมด
- ใช้ RecipeList component
- Route: `/recipes`

**ที่ต้องทำ:**
- เพิ่ม page header
- เพิ่ม advanced filters sidebar
- รองรับ URL query params
</details>

<details>
<summary><b>app/recipes/new/page.js</b> - Add Recipe</summary>

**หน้าที่:**
- หน้าเพิ่มสูตรใหม่
- ใช้ RecipeForm component (mode="add")
- Route: `/recipes/new`

**ที่ต้องทำ:**
- เพิ่ม unsaved changes warning
- เพิ่ม keyboard shortcuts
</details>

<details>
<summary><b>app/recipes/[id]/page.js</b> - Recipe Detail</summary>

**หน้าที่:**
- แสดงรายละเอียดสูตรแบบเต็ม
- ส่วนผสม, ขั้นตอน, notes
- ปุ่ม edit/delete
- NotesSection component

**ที่ต้องทำ:**
- แทน alert() ด้วย Toast
- แทน confirm() ด้วย ConfirmDialog
</details>

<details>
<summary><b>app/recipes/[id]/edit/page.js</b> - Edit Recipe</summary>

**หน้าที่:**
- หน้าแก้ไขสูตร
- Load recipe data แล้วส่งให้ RecipeForm
- Route: `/recipes/[id]/edit`

**ที่ต้องทำ:**
- ⏳ เพิ่ม error handling
- ⏳ เพิ่ม unsaved changes warning
</details>

---

### 🎨 **Components** (`/components`)

<details>
<summary><b>Header.jsx</b> - Navigation Bar</summary>

**หน้าที่:**
- MUI AppBar บนสุดของทุกหน้า
- Logo + ชื่อเว็บ "FullKitchen"
- ปุ่ม "หน้าหลัก" และ "เพิ่มสูตร"
- Sticky position

**Props:** ไม่มี (stateless)

**ที่ต้องทำ:**
- เพิ่ม search bar
- เพิ่ม active state สำหรับ navigation
- เพิ่ม user menu
- เพิ่ม theme toggle
</details>

<details>
<summary><b>RecipeCard.jsx</b> - Recipe Preview Card</summary>

**หน้าที่:**
- แสดงสูตรในรูปแบบ card (ย่อ)
- ชื่อสูตร, เวลารวม, ความยาก, tags
- จำนวนส่วนผสม, timeAgo
- คลิกที่ card → ไปหน้ารายละเอียด

**Props:**
```javascript
recipe: {
  id, name, prepTime, cookTime,
  difficulty, tags, ingredients,
  createdAt
}
```

**ที่ต้องทำ:**
- เพิ่ม thumbnail image
- เพิ่ม rating stars
- เพิ่ม favorite button
</details>

<details>
<summary><b>RecipeList.jsx</b> - Recipe Catalog</summary>

**หน้าที่:**
- แสดงรายการสูตรทั้งหมดเป็น grid
- Search bar (real-time filtering)
- ค้นหาจาก: ชื่อ, tags, ส่วนผสม
- Responsive grid (3→2→1 columns)
- Loading state

**State:**
- `recipes` - สูตรทั้งหมด
- `filteredRecipes` - หลัง filter
- `searchQuery` - คำค้นหา
- `loading` - loading state

**ที่ต้องทำ:**
- เพิ่ม sort dropdown
- เพิ่ม filter chips
- เพิ่ม pagination
- ใช้ LoadingSkeleton แทน spinner
</details>

<details>
<summary><b>RecipeForm.jsx</b> - Add/Edit Form</summary>

**หน้าที่:**
- Form สำหรับเพิ่ม/แก้ไขสูตร
- รองรับ 2 modes: "add" | "edit"
- Dynamic arrays (ingredients, steps)
- Tags management (add by Enter key)
- Validation + error messages
- Auto-save draft to localStorage

**Props:**
```javascript
recipe?: Recipe  // สำหรับ edit mode
mode: "add" | "edit"
```

**Fields:**
- ชื่อเมนู (required)
- ส่วนผสม (array - add/remove)
- ขั้นตอน (array - add/remove)
- Tags (array - add by Enter)
- เวลาเตรียม, เวลาทำ (number)
- ระดับความยาก (dropdown)

**ที่ต้องทำ:**
- เพิ่ม thumbnail field (image upload)
- แทน alert() ด้วย Toast
- เพิ่ม rich text editor
- เพิ่ม drag-to-reorder
</details>

<details>
<summary><b>NotesSection.jsx</b> - Notes Manager</summary>

**หน้าที่:**
- จัดการ notes ในสูตร
- CRUD operations: เพิ่ม, แก้, ลบ
- แก้ไข inline (double-click หรือคลิกปุ่ม edit)
- แสดง timeAgo สำหรับแต่ละ note

**Props:**
```javascript
recipeId: string
notes: Note[]
onUpdate: () => void  // callback หลัง update
```

**ที่ต้องทำ:**
- ⏳ แทน alert() ทั้งหมดด้วย Toast (6 places)
- ⏳ แทน confirm() ด้วย ConfirmDialog
- ⏳ เพิ่ม rich text formatting
</details>

---

### 🧩 **UI Components** (`/components/ui`)

<details>
<summary><b>Toast.jsx</b> - Toast Notifications</summary>

**หน้าที่:**
- แสดง feedback messages แบบ toast
- รองรับ 4 severity: success, error, warning, info
- Auto-hide หลัง 6 วินาที
- Position: bottom-right

**วิธีใช้:**
```javascript
// 1. Wrap ด้วย ToastProvider ใน layout.js
// 2. ใน component:
const { showToast } = useToast()
showToast('บันทึกสำเร็จ!', 'success')
```

**ที่ต้องทำ:**
- สร้าง Context + Provider + Hook
- implement Toast component
- เพิ่ม toast queue system
</details>

<details>
<summary><b>ConfirmDialog.jsx</b> - Confirmation Dialog</summary>

**หน้าที่:**
- Dialog สำหรับยืนยันการกระทำ
- แทน window.confirm() ที่ดูไม่สวย
- รองรับ async operations
- คืนค่า Promise<boolean>

**วิธีใช้:**
```javascript
// 1. Wrap ด้วย ConfirmDialogProvider ใน layout.js
// 2. ใน component:
const { confirm } = useConfirm()
const ok = await confirm('ลบสูตรนี้?', 'ไม่สามารถย้อนกลับได้')
if (ok) { /* delete */ }
```

**ที่ต้องทำ:**
- สร้าง Context + Provider + Hook
- implement ConfirmDialog component
- เพิ่ม loading state
- เพิ่ม danger mode
</details>

<details>
<summary><b>Button.jsx</b> - Custom Button</summary>

**หน้าที่:**
- Wrapper สำหรับ MUI Button
- เพิ่ม loading state
- Consistent styling

**Props:**
```javascript
loading?: boolean
disabled?: boolean
...MUIButtonProps
```

**ที่ต้องทำ:**
- implement loading state
- เพิ่ม custom variants (danger, success)
- เพิ่ม tooltip support
</details>

<details>
<summary><b>Modal.jsx</b> - Generic Modal</summary>

**หน้าที่:**
- Reusable modal component
- Title bar + ปุ่มปิด
- Responsive (fullScreen บน mobile)

**Props:**
```javascript
open: boolean
title?: string
children: ReactNode
actions?: ReactNode
onClose: () => void
maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
```

**ที่ต้องทำ:**
- implement Modal component
- เพิ่ม loading overlay
- เพิ่ม smooth transitions
</details>

<details>
<summary><b>Loading.jsx</b> - Loading Components</summary>

**หน้าที่:**
- รวม loading components หลายแบบ:
  - **LoadingSpinner** - spinner + text
  - **LoadingSkeleton** - placeholder shapes
  - **LoadingDots** - inline animation (...)
  - **LoadingBar** - progress bar บนสุดหน้า
  - **LoadingOverlay** - fullscreen overlay

**ที่ต้องทำ:**
- ⏳ implement ทุก component
- ⏳ replace loading states ทั่วโปรเจ็ค
</details>

---

### 🔧 **Business Logic** (`/lib`)

<details>
<summary><b>lib/db.js</b> - Data Access Layer</summary>

**หน้าที่:**
- อ่าน/เขียน db.json
- Atomic write operations (ป้องกัน data corruption)
- ไม่มี business logic

**Functions:**
```javascript
readDB() → Promise<{ recipes: Recipe[] }>
writeDB(data) → Promise<void>
```

**Technical Details:**
- ใช้ `.tmp` file แล้วค่อย rename (atomic)
- Auto-create file ถ้าไม่มี
- Error handling

**ที่ต้องทำ:**
- เพิ่ม automatic backup
- เพิ่ม data validation
- แทน console.error ด้วย proper logging
</details>

<details>
<summary><b>lib/recipes.js</b> - Recipe Service Layer</summary>

**หน้าที่:**
- Business logic สำหรับ recipes
- CRUD operations ทั้งหมด
- Search, filter, sort
- Notes management
- Validation

**Main Functions:**

**📚 Query:**
```javascript
getAllRecipes({ q, filter, sort })
// q: search query
// filter: filter by tag
// sort: 'name' | 'newest' | 'oldest'

getRecipeById(id)
```

**➕ Create:**
```javascript
addRecipe({
  name, ingredients, steps,
  tags, prepTime, cookTime, difficulty
})
```

**✏️ Update:**
```javascript
updateRecipe(id, data)
```

**🗑️ Delete:**
```javascript
deleteRecipe(id)
```

**📌 Notes:**
```javascript
addNoteToRecipe(recipeId, text)
updateNote(recipeId, noteId, text)
deleteNote(recipeId, noteId)
```

**ที่ต้องทำ:**
- filter by difficulty
- filter by cookTime range
- pagination support
</details>

<details>
<summary><b>lib/utils.js</b> - Helper Utilities</summary>

**หน้าที่:**
- Pure helper functions
- Data transformation
- Validation
- Formatting

**Functions:**

**🔑 ID & Slug:**
```javascript
generateId() → string           // nanoid(10)
generateSlug(name) → string     // URL-friendly
```

**✅ Validation:**
```javascript
validateRecipe(recipe) → { valid: boolean, errors: string[] }
```

**🧹 Data Cleaning:**
```javascript
normalizeArray(arr) → string[]  // trim + remove empty
```

**📅 Date Formatting:**
```javascript
formatDate(dateString) → string     // "7 ธันวาคม 2568"
timeAgo(dateString) → string        // "2 วันที่แล้ว"
```

**ที่ต้องทำ:**
- ⏳ sanitizeInput() - ป้องกัน XSS
- ⏳ truncateText() - ตัดข้อความยาว
- ⏳ Thai slug support
</details>

---

### 💾 **Storage** (`/data`)

<details>
<summary><b>data/db.json</b> - JSON Database</summary>

**หน้าที่:**
- เก็บข้อมูลสูตรทั้งหมด
- Format: `{ recipes: Recipe[] }`
- Human-readable (debug ง่าย)
- Git-friendly (track changes)

**Sample Structure:**
```json
{
  "recipes": [
    {
      "id": "1",
      "name": "ไข่เจียว",
      "slug": "fried-egg",
      "ingredients": ["ไข่ 2 ฟอง", "น้ำปลา"],
      "steps": ["ตอกไข่", "ตีให้เข้ากัน", "ทอด"],
      "notes": [],
      "tags": ["ง่าย", "เช้า"],
      "thumbnail": "",
      "prepTime": 2,
      "cookTime": 5,
      "difficulty": "ง่าย",
      "createdAt": "2025-12-06T10:00:00.000Z",
      "updatedAt": "2025-12-06T10:00:00.000Z"
    }
  ]
}
```

**Limitations:**
- ไม่เหมาะกับ production (ควรใช้ DB จริง)
- ไม่มี indexing (search ช้าถ้าข้อมูลเยอะ)
- ไม่มี transactions
- file size limit (~10MB ควรย้าย DB)
</details>

---

## Data Flow (ตัวอย่าง: เพิ่มสูตร)

```
1. User fills form
   ↓
2. RecipeForm.jsx
   - Validate input
   - Call addRecipe()
   ↓
3. lib/recipes.js
   - Validate business rules
   - Generate id, slug, timestamps
   - Call readDB() → modify → writeDB()
   ↓
4. lib/db.js
   - Read db.json
   - Add new recipe
   - Write atomically (via .tmp file)
   ↓
5. data/db.json
   - Data persisted
   ↓
6. Redirect to recipe detail page
```

## สถาปัตยกรรม (Architecture)

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

- **แยก concern ชัดเจน** - UI / Logic / Data แยกกัน  
- **ทดสอบง่าย** - Mock ได้ทุก layer  
- **ขยายได้** - เพิ่มฟีเจอร์ไม่กระทบของเก่า  
- **Maintainable** - แก้ไขง่าย ไม่ต้องเปลี่ยนหลายที่  
- **Database agnostic** - เปลี่ยน DB ได้โดยแก้แค่ `lib/db.js`

## ฟีเจอร์

- เพิ่ม/แก้ไข/ลบสูตรอาหาร
- แสดงรายการสูตรแบบ Grid/Card
- ดูรายละเอียดสูตร (ส่วนผสม + วิธีทำ)
- เพิ่มโน้ตส่วนตัวในแต่ละสูตร
- ค้นหาและกรองสูตร (search/filter/sort)
- Validation ข้อมูล
- Atomic file operations (ป้องกันข้อมูลเสีย)

### กำลังพัฒนา (Roadmap)
- อัปโหลดรูปภาพเมนู
- Authentication (NextAuth.js)
- Export/Import สูตร (JSON/PDF)
- Tags management
- Recipe rating

## การย้ายไปใช้ Database จริง

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

## Technologies

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **Material-UI (MUI)** - Component library
- **@emotion** - CSS-in-JS
- **nanoid** - Unique ID generation

## API Reference (Service Layer)

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

## Testing

```bash
# Unit tests (coming soon)
npm test

# E2E tests (coming soon)
npm run test:e2e
```

## Data Schema

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

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT License - ใช้ได้อย่างอิสระ

## Developer

**FullKitchen Team**  
December 2025  
[GitHub](https://github.com/Suphakrit038/FullKitchen---)

---

**Happy Cooking!**
