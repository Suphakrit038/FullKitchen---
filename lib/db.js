/**
 * ========================================
 * lib/db.js - ชั้น Data Access Layer
 * ========================================
 * 
 * 📝 คำอธิบาย:
 * ไฟล์นี้เป็นชั้นสำหรับติดต่อกับฐานข้อมูล JSON
 * รับผิดชอบการอ่าน/เขียนไฟล์ db.json อย่างเดียว
 * ไม่มี business logic - เป็นแค่ low-level file operations
 * 
 * 🎯 หน้าที่หลัก:
 * - readDB(): อ่านข้อมูลจาก db.json และ parse เป็น object
 * - writeDB(data): เขียนข้อมูลลง db.json แบบ atomic (ป้องกัน data corruption)
 * 
 * 💡 Tips สำหรับพัฒนาต่อ:
 * 1. เพิ่ม backup system ก่อน writeDB ทุกครั้ง
 * 2. เพิ่ม data validation เพื่อป้องกันข้อมูลเสีย
 * 3. เพิ่ม error logging แทน console.error
 * 4. พิจารณาใช้ SQLite/PostgreSQL แทน JSON ในอนาคต
 * 
 * ⚠️ สิ่งที่ต้องระวัง:
 * - อย่าเรียก writeDB พร้อมกันหลายครั้ง (race condition)
 * - JSON file ใหญ่เกิน 10MB จะช้า ควรใช้ DB จริง
 * - ไม่มี transaction support - ถ้า error กลางคัน data อาจเสีย
 * ========================================
 */

const fs = require('fs').promises;
const path = require('path');

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

// TODO: 🟡 เพิ่ม automatic backup mechanism
// - สร้าง backup file ก่อน writeDB ทุกครั้ง (db.json.backup)
// - เก็บ backup หลายรุ่น (เช่น 5 backup ล่าสุด)
// - ฟังก์ชัน restoreFromBackup() สำหรับกู้คืนข้อมูล

// TODO: 🟢 เพิ่ม data validation
// - ตรวจสอบ JSON structure ก่อน parse
// - validate schema ของ recipes array
// - แจ้งเตือนถ้าข้อมูล corrupted

/**
 * อ่านข้อมูลจาก db.json
 * @returns {Promise<Object>} database object
 */
async function readDB() {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database:', error);
    // TODO: 🟡 แทน console.error ด้วย proper error logging
    // - ใช้ logging library (เช่น winston, pino)
    // - บันทึก error log ลงไฟล์
    // - แจ้งเตือนผ่าน Toast component
    
    // ถ้าไฟล์ไม่มี สร้างใหม่
    const initialData = { recipes: [] };
    await writeDB(initialData);
    return initialData;
  }
}

/**
 * เขียนข้อมูลลง db.json (atomic write)
 * @param {Object} data - database object to write
 * @returns {Promise<void>}
 */
async function writeDB(data) {
  try {
    // TODO: 🟢 เพิ่ม data validation ก่อน write
    // - validate JSON structure
    // - check required fields
    // - prevent writing invalid data
    
    const tempPath = DB_PATH + '.tmp';
    await fs.writeFile(tempPath, JSON.stringify(data, null, 2), 'utf-8');
    await fs.rename(tempPath, DB_PATH);
    
    // TODO: 🟡 เพิ่ม automatic backup หลัง write สำเร็จ
    // - copy DB_PATH ไปยัง backup file
    // - rotate backup files (เก็บ 5 ไฟล์ล่าสุด)
  } catch (error) {
    console.error('Error writing database:', error);
    // TODO: 🟡 แทน console.error + แจ้งเตือน user
    // - ใช้ Toast component แสดง error
    // - log error ลงไฟล์
    // - พยายาม retry (max 3 attempts)
    throw new Error('Failed to write to database');
  }
}

// TODO: 🟡 เพิ่มฟังก์ชัน createBackup()
// - สร้าง backup file ด้วย timestamp
// - คืนค่า backup file path

// TODO: 🟡 เพิ่มฟังก์ชัน restoreFromBackup(backupPath)
// - กู้คืนจาก backup file
// - validate backup data ก่อน restore

// TODO: 🟢 เพิ่มฟังก์ชัน listBackups()
// - list ไฟล์ backup ทั้งหมด
// - sort ตาม timestamp
// - คืนค่า array ของ backup info

module.exports = { readDB, writeDB };
