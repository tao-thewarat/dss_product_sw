# การตั้งค่า Database สำหรับโปรเจกต์ Next.js บน Vercel

เมื่อเราพัฒนาโปรเจกต์ในเครื่อง (Local) เรามักจะรันฐานข้อมูลด้วย Docker หรือรันในเครื่องตัวเอง (localhost:5432) แต่เมื่อนำโปรเจกต์ขึ้นไป Deploy บน **Vercel** หน้าเว็บของเราจะไม่สามารถเชื่อมต่อกลับมาหา localhost ในเครื่องของเราได้ ดังนั้นเราจึงต้องใช้ฐานข้อมูลออนไลน์ (Cloud Database) แทน

## 1. ผู้ให้บริการ Free PostgreSQL Online ที่แนะนำ
สำหรับโปรเจกต์ที่ต้องใช้ PostgreSQL มีผู้ให้บริการที่มี Free Tier (ใช้งานฟรีแบบมีขีดจำกัด) ที่ได้รับความนิยมดังนี้:

- **Neon (neon.tech) ⭐️ แนะนำ**: เป็น Serverless Postgres ที่ออกแบบมาเพื่อยุค Modern Web ใช้งานง่ายมากๆ สมัครปุ๊บได้ Database URL ทันที
- **Supabase (supabase.com)**: ให้สเปคฟรีเยอะ มีหน้า UI (Dashboard) จัดการตารางข้อมูลคล้าย Excel ทำให้จัดการข้อมูลได้ง่าย 
- **Vercel Postgres**: ฐานข้อมูลของ Vercel เอง (ใช้เทคโนโลยีของ Neon) สะดวกเพราะสร้างผ่านหน้า Vercel ได้เลย

## 2. ขั้นตอนการตั้งค่าฐานข้อมูลออนไลน์ (ตัวอย่าง: Neon/Supabase)

1. **สมัครและสร้าง Database**: สร้างโปรเจกต์ใหม่ในเว็บผู้ให้บริการ
2. **คัดลอก Connection String**: หารายละเอียดการเชื่อมต่อ ซึ่งจะอยู่ในรูปแบบ URL เช่น:
   `postgresql://[user]:[password]@[host]:5432/[db_name]?sslmode=require`
3. **สร้างโครงสร้างตาราง (Schema)**: 
   - ฐานข้อมูลออนไลน์จะยังว่างเปล่า 
   - ให้เปิดเมนู **SQL Editor** บนหน้าเว็บของผู้ให้บริการ
   - นำคำสั่ง `CREATE TABLE` (เช่น Customers, Products, Orders, Order_Items) ไปรันเพื่อสร้างตาราง
   - *หมายเหตุ:* การนำเข้าข้อมูลจำนวนมาก (Import Data) อาจจะต้องใช้ GUI ของเว็บนั้นๆ หรือเขียนสคริปต์ Insert เข้าไป

## 3. การตั้งค่า Environment Variables บน Vercel

เพื่อให้โค้ดบน Vercel รู้ว่าจะต้องไปดึงข้อมูลจากฐานข้อมูลออนไลน์ที่ไหน:
1. เข้าไปที่ Dashboard ของโปรเจกต์บน [Vercel](https://vercel.com/)
2. ไปที่เมนู **Settings** -> **Environment Variables**
3. เพิ่มตัวแปรใหม่:
   - **Key:** `DATABASE_URL`
   - **Value:** วาง Connection String ที่ได้มาจากข้อ 2
4. กด **Save**

## 4. ปัญหาที่พบบ่อย: Prisma Client Initialization Error

**ปัญหา:**
เมื่อ Deploy โปรเจกต์ที่ใช้ Prisma ORM บน Vercel อาจเจอ Error:
`Prisma has detected that this project was built on Vercel, which caches dependencies. This leads to an outdated Prisma Client...`

**สาเหตุ:** 
Vercel มีการ Cache โฟลเดอร์ `node_modules` ไว้เพื่อความรวดเร็วในการ Build ทำให้ Prisma Client ไม่ได้ถูก Generate ใหม่เพื่อให้ตรงกับโครงสร้าง Database ล่าสุด

**วิธีแก้ปัญหา:**
บังคับให้ Vercel ทำการ Generate Prisma Client ใหม่ทุกครั้งหลังติดตั้งแพ็กเกจเสร็จ โดยเพิ่มคำสั่งในไฟล์ `package.json` ส่วนของ `scripts` ดังนี้:

```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "postinstall": "prisma generate"  // <--- เพิ่มบรรทัดนี้
  }
```

หลังจากนั้นทำการ Commit และ Push โค้ดขึ้น GitHub ใหม่ Vercel จะทำการ Redeploy และแก้ปัญหานี้ได้ทันที
