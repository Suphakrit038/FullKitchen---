const fs = require('fs').promises;
const path = require('path');

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

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
    const tempPath = DB_PATH + '.tmp';
    await fs.writeFile(tempPath, JSON.stringify(data, null, 2), 'utf-8');
    await fs.rename(tempPath, DB_PATH);
  } catch (error) {
    console.error('Error writing database:', error);
    throw new Error('Failed to write to database');
  }
}

module.exports = { readDB, writeDB };
