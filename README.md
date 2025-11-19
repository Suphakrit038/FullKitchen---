# FullKitchen — Starter scaffold

โปรเจกต์ตัวอย่าง: Next.js + React + MUI สำหรับแอปสูตรอาหาร 3 หน้า (สารบัญ, รายละเอียด, เพิ่มสูตร)

Quick-start (PowerShell):

Run json-server (db.json) and Next.js dev server in separate terminals.

```powershell
npm install
npm run json-server    # starts json-server on http://localhost:3001
npm run dev            # starts Next dev on http://localhost:3000
```

Preflight checks (recommended)
-----------------------------
Before starting the app, run a quick preflight to ensure Node/npm and ports are available:

```powershell
npm run check
```

One-command startup (Windows PowerShell)
--------------------------------------
To start both the mock API and the Next.js dev server and open your browser in one step, run:

```powershell
npm run start:all
```

This script opens two new PowerShell windows (one for `json-server`, one for `next dev`) and then opens `http://localhost:3000` in your default browser. Close those PowerShell windows to stop the servers.

Notes and troubleshooting
------------------------
- If `npm run start:all` fails because PowerShell's execution policy blocks scripts, run this once as admin to allow the project script to run:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force
```

- If ports 3000 or 3001 are already in use, change the port in the `package.json` `json-server` script or stop the process using that port.
- If you see CORS or network errors when the frontend calls the API, ensure `json-server` is running and reachable at `http://localhost:3001`.

Notes:
- API base is http://localhost:3001 by default. You can change it with NEXT_PUBLIC_API_BASE env var.
- Data is stored in `db.json` and will be modified by json-server when you add/delete recipes.

หน้า:
- / : สารบัญสูตร
- /recipes/[id] : รายละเอียดสูตร
- /add : เพิ่มสูตรใหม่

ข้อมูลถูกเก็บชั่วคราวใน localStorage (key: fk_recipes_v1). นี่เป็น scaffold เพื่อให้เริ่มพัฒนาได้เร็ว — เพิ่ม backend หรือ API ต่อเติมได้ภายหลัง.

ถ้าต้องการให้ผมต่อด้วย:
- ตั้ง API (Next.js API routes) หรือเชื่อมฐานข้อมูล
- เพิ่ม TypeScript และ unit tests
- ปรับ Theme / RTL / ภาษาแบบเต็ม
