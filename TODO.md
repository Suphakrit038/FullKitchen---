# 📝 FullKitchen TODO List

รายการสิ่งที่ยังไม่ได้ทำและต้องพัฒนาต่อ

---

## 🔴 Priority 1: Error Handling & UX (สำคัญมาก!)

### Error Handling
- [ ] สร้าง `components/ui/Toast.jsx` - Toast notification component
  - รองรับ success, error, warning, info
  - Auto-dismiss หลัง 3-5 วินาที
  - Position: bottom-right
  
- [ ] สร้าง `components/ui/ConfirmDialog.jsx` - Confirmation dialog
  - แทน `confirm()` และ `alert()` ธรรมดา
  - รองรับ custom title, message, buttons
  
- [ ] สร้าง `app/error.js` - Error boundary หลัก
  - จัดการ error ทั้งเว็บ
  - แสดงหน้า error สวยงาม
  
- [ ] สร้าง `app/recipes/[id]/not-found.js` - 404 page
  - แสดงเมื่อไม่พบสูตร

### แก้ไขโค้ดที่มี TODO (ใช้ Toast แทน console/alert)
- [ ] `app/recipes/[id]/page.js` - Lines 42-44, 53-55
  - แทน console.error ด้วย Toast
  - แทน alert() ด้วย ConfirmDialog
  
- [ ] `components/RecipeList.jsx` - Lines 40-42
  - แทน console.error ด้วย error message + retry button
  
- [ ] `components/RecipeForm.jsx` - Lines 31, 159, 162, 166
  - เพิ่ม success Toast หลัง save
  - แทน error state ด้วย error Toast
  
- [ ] `components/NotesSection.jsx` - Lines 34, 37, 49, 52, 66, 70
  - แทน alert() ทั้งหมดด้วย Toast

---

## 🟡 Priority 2: Features (ฟีเจอร์เพิ่มเติม)

### Image Upload
- [ ] `components/RecipeForm.jsx` - Line 31
  - เพิ่ม thumbnail field
  - Integration กับ Cloudinary/S3
  - Preview รูปก่อน upload
  - Compress รูปก่อนอัปโหลด

### Advanced Filtering & Sorting
- [ ] `components/RecipeList.jsx` - Lines 38-40
  - เพิ่ม Sort dropdown (ชื่อ, วันที่, เวลา)
  - เพิ่ม Filter by tags (Chip selection)
  - เพิ่ม Filter by difficulty
  
- [ ] `lib/recipes.js` - Lines 27-29
  - เพิ่ม filter by difficulty
  - เพิ่ม filter by cookTime range
  - เพิ่ม pagination support

### Print & Export
- [ ] สร้าง Print view สำหรับสูตร
- [ ] Export recipe เป็น PDF
- [ ] Export/Import JSON (backup/restore)

---

## 🟢 Priority 3: Optimization & Polish

### Performance
- [ ] Code splitting (lazy load components)
- [ ] Image optimization (next/image)
- [ ] Memoization (React.memo, useMemo)
- [ ] Virtual scrolling สำหรับ list ยาว ๆ

### Accessibility
- [ ] เพิ่ม ARIA labels
- [ ] Keyboard navigation
- [ ] Screen reader support
- [ ] Focus management

### SEO
- [ ] Meta tags (title, description)
- [ ] Open Graph tags
- [ ] Sitemap
- [ ] Structured data (Schema.org)

---

## 🔵 Priority 4: Advanced Features (อนาคต)

### Authentication
- [ ] NextAuth.js integration
- [ ] User profiles
- [ ] Private/Public recipes
- [ ] Recipe sharing

### Social Features
- [ ] Recipe rating (⭐️)
- [ ] Comments/Reviews
- [ ] Favorite recipes
- [ ] Share to social media

### Advanced Recipe Management
- [ ] Recipe categories/collections
- [ ] Meal planning
- [ ] Shopping list generator
- [ ] Nutrition calculator

---

## ⚪ Priority 5: Testing & Documentation

### Testing
- [ ] Unit tests (Jest + React Testing Library)
  - Service layer tests (lib/recipes.js)
  - Utility functions tests (lib/utils.js)
  - Component tests
  
- [ ] Integration tests
  - API route tests
  - Database tests
  
- [ ] E2E tests (Playwright/Cypress)
  - Create recipe flow
  - Edit recipe flow
  - Delete recipe flow
  - Search flow

### Documentation
- [ ] JSDoc สำหรับทุกฟังก์ชัน
- [ ] Component documentation (Storybook?)
- [ ] API documentation
- [ ] Deployment guide

---

## 📦 Components ที่ต้องสร้าง

### UI Components (ใน `components/ui/`)
```
components/ui/
├── Toast.jsx         ❌ ยังไม่มี - สร้างก่อน!
├── ConfirmDialog.jsx ❌ ยังไม่มี - สร้างก่อน!
├── Button.jsx        ⚠️  ใช้ MUI อยู่ (ไม่จำเป็นถ้าเก็บ MUI)
├── Input.jsx         ⚠️  ใช้ MUI อยู่
├── Modal.jsx         ⚠️  ใช้ MUI Dialog อยู่
└── Loading.jsx       ⚠️  ใช้ MUI CircularProgress
```

### Feature Components
```
components/
├── IngredientList.jsx  ❌ ยังไม่มี (optional - อยู่ใน RecipeForm แล้ว)
├── StepList.jsx        ❌ ยังไม่มี (optional - อยู่ใน RecipeForm แล้ว)
├── ImageUpload.jsx     ❌ ยังไม่มี - ต้องสร้าง!
├── RecipePrint.jsx     ❌ ยังไม่มี
└── SearchFilters.jsx   ❌ ยังไม่มี
```

---

## 🎯 Quick Wins (ทำได้ง่าย - ผลลัพธ์เห็นชัด)

1. ✅ **สร้าง Toast component** → แก้ไข alert()/console.error ทั้งหมด
2. ✅ **สร้าง ConfirmDialog** → แก้ไข confirm() ทั้งหมด
3. ✅ **เพิ่ม 404 page** → สร้าง not-found.js
4. ✅ **เพิ่ม Sort dropdown** → ใน RecipeList
5. ✅ **เพิ่ม Loading state** → ในทุก async operation

---

## 📋 การติดตาม TODO ในโค้ด

ค้นหา `// TODO:` ในโปรเจกต์:
```bash
# PowerShell
Select-String -Path "**/*.js","**/*.jsx" -Pattern "// TODO:" -CaseSensitive
```

ไฟล์ที่มี TODO:
- ✅ `app/recipes/[id]/page.js` (4 TODOs)
- ✅ `components/RecipeList.jsx` (5 TODOs)
- ✅ `components/RecipeForm.jsx` (4 TODOs)
- ✅ `components/NotesSection.jsx` (6 TODOs)
- ✅ `lib/recipes.js` (3 TODOs)

**รวมทั้งหมด: 22 TODOs**

---

## 💡 คำแนะนำในการทำ

1. **เริ่มจาก Priority 1** - Error Handling สำคัญที่สุด
2. **ทำทีละอันให้เสร็จ** - อย่าทำหลายอันพร้อมกัน
3. **Test ทุกครั้ง** - หลังทำเสร็จแต่ละอัน
4. **Mark เสร็จใน TODO.md** - เปลี่ยน `[ ]` เป็น `[x]`
5. **Commit บ่อย ๆ** - แต่ละฟีเจอร์ commit แยก

---

**Last Updated:** 2025-12-06
