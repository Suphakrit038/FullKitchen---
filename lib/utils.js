import { nanoid } from 'nanoid';

/**
 * สร้าง slug จากชื่อเมนู
 * @param {string} name - ชื่อเมนู
 * @returns {string} URL-friendly slug
 */
export function generateSlug(name) {
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
export function generateId() {
  return nanoid(10);
}

/**
 * จัดรูปแบบวันที่
 * @param {string} dateString - ISO date string
 * @returns {string} formatted date
 */
export function formatDate(dateString) {
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
export function normalizeArray(arr) {
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
export function validateRecipe(recipe) {
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
export function timeAgo(dateString) {
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
