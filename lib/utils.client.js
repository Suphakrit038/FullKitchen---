/**
 * ========================================
 * lib/utils.client.js - Client-side Helper Functions
 * ========================================
 * 
 * Client-safe utility functions (no Node.js dependencies)
 * ใช้ใน client components
 */

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
