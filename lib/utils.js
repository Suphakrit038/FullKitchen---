/**
 * ========================================
 * lib/utils.js - Helper Functions
 * ========================================
 * 
 * 📝 คำอธิบาย:
 * รวม utility functions ที่ใช้ซ้ำได้หลายที่ในโปรเจ็ค
 * ไม่มี side effects - เป็น pure functions ทั้งหมด
 * ทำงานกับ data transformation, validation, formatting
 * 
 * 🎯 ฟังก์ชันที่มี:
 * - generateId(): สร้าง unique ID ด้วย nanoid
 * - generateSlug(name): แปลงชื่อเป็น URL-friendly slug
 * - validateRecipe(recipe): ตรวจสอบความถูกต้องของข้อมูลสูตร
 * - normalizeArray(arr): ลบค่าว่างและ trim array
 * - formatDate(dateString): จัดรูปแบบวันที่เป็นภาษาไทย
 * - timeAgo(dateString): แปลงเป็นเวลาสัมพัทธ์ (2 วันที่แล้ว)
 * 
 * 💡 Tips สำหรับพัฒนาต่อ:
 * 1. เพิ่ม sanitizeInput() เพื่อป้องกัน XSS attacks
 * 2. เพิ่ม truncateText() สำหรับตัดข้อความยาว
 * 3. ปรับ generateSlug() ให้รองรับภาษาไทย (romanization)
 * 4. เพิ่ม error handling ให้ทุกฟังก์ชัน
 * 
 * ⚠️ สิ่งที่ต้องระวัง:
 * - validateRecipe() ตรวจแค่ required fields - อาจต้อง validate ลึกกว่านี้
 * - generateSlug() จะเอาภาษาไทยออกหมด - ควรแปลงเป็น romanized แทน
 * - timeAgo() ไม่รองรับอดีตไกลมาก (เกิน 1 ปี จะแสดงแค่ "1 ปีที่แล้ว")
 * ========================================
 */

const { nanoid } = require('nanoid');

// TODO: 🟢 เพิ่มฟังก์ชัน sanitizeInput(text)
// - ป้องกัน XSS attacks
// - escape special characters
// - ใช้กับ user input ทั้งหมด

// TODO: 🟢 เพิ่มฟังก์ชัน truncateText(text, maxLength)
// - ตัดข้อความยาวเกินไป
// - เพิ่ม "..." ท้ายข้อความ
// - ใช้แสดงใน RecipeCard preview

/**
 * สร้าง slug จากชื่อเมนู
 * @param {string} name - ชื่อเมนู
 * @returns {string} URL-friendly slug
 */
function generateSlug(name) {
  // TODO: 🟡 รองรับภาษาไทยใน slug
  // - แปลงตัวอักษรไทยเป็น romanized
  // - หรือเก็บเป็น encoded UTF-8
  // - handle ชื่อที่ซ้ำกัน (เพิ่ม -1, -2)
  
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * สร้าง unique ID
 * @returns {string} unique id
 */
function generateId() {
  return nanoid(10);
}

/**
 * จัดรูปแบบวันที่
 * @param {string} dateString - ISO date string
 * @returns {string} formatted date
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Normalize array - ลบค่าว่างและ trim
 * @param {string[]} arr - array of strings
 * @returns {string[]} cleaned array
 */
function normalizeArray(arr) {
  if (!Array.isArray(arr)) return [];
  return arr
    .map(item => item.trim())
    .filter(item => item.length > 0);
}

/**
 * ตรวจสอบความถูกต้องของข้อมูลสูตร
 * @param {Object} recipe - recipe data
 * @returns {Object} { valid: boolean, errors: string[] }
 */
function validateRecipe(recipe) {
  const errors = [];

  if (!recipe.name || recipe.name.trim().length < 2) {
    errors.push('ชื่อเมนูต้องมีอย่างน้อย 2 ตัวอักษร');
  }

  const ingredients = normalizeArray(recipe.ingredients);
  if (ingredients.length === 0) {
    errors.push('ต้องมีส่วนผสมอย่างน้อย 1 รายการ');
  }

  const steps = normalizeArray(recipe.steps);
  if (steps.length === 0) {
    errors.push('ต้องมีขั้นตอนอย่างน้อย 1 ขั้นตอน');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * แปลง timestamp เป็นเวลาที่ผ่านมา (relative time)
 * @param {string} dateString - ISO date string
 * @returns {string} relative time
 */
function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  const intervals = {
    'ปี': 31536000,
    'เดือน': 2592000,
    'วัน': 86400,
    'ชั่วโมง': 3600,
    'นาที': 60
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}ที่แล้ว`;
    }
  }

  return 'เมื่อสักครู่';
}

module.exports = {
  generateId,
  generateSlug,
  formatDate,
  normalizeArray,
  validateRecipe,
  timeAgo
};
