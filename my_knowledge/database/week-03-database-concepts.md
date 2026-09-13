# สรุปความรู้ Database (Week 03)

## 1. งานและโจทย์ที่เกี่ยวข้องกับ Database (จาก Week 3)
*   **Lab-02 Build a Star Schema:** ออกแบบและสร้าง Star Schema จากข้อมูล Retail Sales ดิบ และเขียนสคริปต์ ETL ด้วย pandas + DuckDB เพื่อโหลดเข้า Fact/Dimension
*   **Case Study:** การออกแบบชั้น Transform เมื่อข้อมูลยอดใช้จ่ายบัตรเครดิตกระจายอยู่ใน 3 ระบบที่ใช้รหัสหมวดหมู่ไม่ตรงกัน
*   **แนวข้อสอบกลางภาค:** มีการให้ความต้องการทางธุรกิจ (Business Requirements) และให้ออกแบบ Star Schema พร้อมระบุ Fact, Dimension, และ Granularity
*   **Colab Labs:** มีแบบฝึกหัดเรื่องการหา Granularity ที่ถูกต้อง, การทำความสะอาดข้อมูล (Data Cleansing), และการสร้าง ETL Pipeline

## 2. โครงสร้างตารางในแบบจำลอง Star Schema (Lab-02)
โมเดลเป้าหมายแบ่งออกเป็น 3 กลุ่ม รวม 7 ตาราง ดังนี้:
1.  **กลุ่ม Dimension (มิติข้อมูล):**
    *   `dim_date`: ข้อมูลมิติเวลา (วันที่, เดือน, ปี)
    *   `dim_product`: ข้อมูลมิติสินค้า
    *   `dim_customer`: ข้อมูลมิติลูกค้า
    *   `dim_store`: ข้อมูลมิติสาขา/ช่องทางการขาย
2.  **กลุ่ม Fact (ข้อเท็จจริง):**
    *   `fact_sales`: เก็บข้อมูลเชิงปริมาณ (Measures) เช่น จำนวน (`quantity`), ยอดขาย (`net_amount`) และ Foreign Keys ที่เชื่อมไปยัง Dimension ต่างๆ
3.  **กลุ่ม ETL / Data Quality:**
    *   `etl_rejects`: เก็บข้อมูลที่ไม่ผ่านการตรวจสอบ (เช่น ข้อมูลซ้ำ, ค่าว่าง)
    *   `etl_audit`: บันทึกประวัติการทำงานของระบบ ETL

## 3. รายละเอียดตารางจาก ER Diagram
*   **FACT_SALES:** ตารางตรงกลางเก็บข้อมูลยอดขายและคีย์เชื่อมโยง (`sales_key` เป็น PK, ส่วน `date_key`, `product_key`, `customer_key`, `store_key` เป็น FK)
*   **DIM_DATE:** เก็บวันที่, ปี, ไตรมาส, เดือน, สัปดาห์, และสถานะวันหยุด (`is_holiday`)
*   **DIM_PRODUCT:** เก็บข้อมูลสินค้า (SKU, ชื่อ, หมวดหมู่, แบรนด์)
*   **DIM_CUSTOMER:** เก็บข้อมูลลูกค้า (ชื่อ, กลุ่ม, จังหวัด, ภูมิภาค)
*   **DIM_STORE:** เก็บข้อมูลสาขา (ชื่อสาขา, ช่องทางการขาย, จังหวัด)

## 4. คำศัพท์พื้นฐานฐานข้อมูล
*   **PK (Primary Key):** คีย์หลักที่ใช้ "ระบุตัวตน" ของข้อมูลแต่ละบรรทัดไม่ให้ซ้ำกัน (Unique) และห้ามเป็นค่าว่าง เช่น `product_key`
*   **FK (Foreign Key):** คีย์นอกที่ไป "อ้างอิง" ถึง Primary Key ของอีกตารางหนึ่ง เพื่อสร้างความสัมพันธ์ (Relationship) เช่น นำ `product_key` ไปใส่ใน `FACT_SALES` เพื่อบอกว่าขายสินค้าอะไร
*   **SQL (Structured Query Language):** ภาษาคอมพิวเตอร์มาตรฐานที่ใช้พูดคุย สั่งการ และจัดการฐานข้อมูลเชิงสัมพันธ์ ใช้ทำ CRUD (Create, Read, Update, Delete) โดยคำสั่งที่ใช้ดึงข้อมูลมาวิเคราะห์บ่อยที่สุดคือ `SELECT`

## 5. คำสั่ง SQL สำหรับสร้างตาราง (Star Schema)
ตัวอย่างคำสั่งสร้างตารางทั้ง 5 ตารางตามแบบ ER Diagram (กำหนด PK และ FK):

```sql
-- 1. สร้างตาราง DIM_DATE
CREATE TABLE dim_date (
    date_key INT PRIMARY KEY,
    full_date DATE,
    year INT,
    quarter INT,
    month INT,
    week INT,
    is_holiday BOOLEAN
);

-- 2. สร้างตาราง DIM_PRODUCT
CREATE TABLE dim_product (
    product_key INT PRIMARY KEY,
    sku VARCHAR(50),
    product_name VARCHAR(255),
    category VARCHAR(100),
    brand VARCHAR(100)
);

-- 3. สร้างตาราง DIM_CUSTOMER
CREATE TABLE dim_customer (
    customer_key INT PRIMARY KEY,
    customer_name VARCHAR(255),
    segment VARCHAR(50),
    province VARCHAR(100),
    region VARCHAR(100)
);

-- 4. สร้างตาราง DIM_STORE
CREATE TABLE dim_store (
    store_key INT PRIMARY KEY,
    store_name VARCHAR(255),
    channel VARCHAR(50),
    province VARCHAR(100)
);

-- 5. สร้างตาราง FACT_SALES (ต้องสร้างเป็นลำดับสุดท้าย เนื่องจากต้องอ้างอิง FK)
CREATE TABLE fact_sales (
    sales_key INT PRIMARY KEY,
    date_key INT,
    product_key INT,
    customer_key INT,
    store_key INT,
    quantity DECIMAL(10, 2),
    unit_price DECIMAL(10, 2),
    net_amount DECIMAL(10, 2),
    discount DECIMAL(10, 2),
    FOREIGN KEY (date_key) REFERENCES dim_date(date_key),
    FOREIGN KEY (product_key) REFERENCES dim_product(product_key),
    FOREIGN KEY (customer_key) REFERENCES dim_customer(customer_key),
    FOREIGN KEY (store_key) REFERENCES dim_store(store_key)
);
```

## 6. ความแตกต่างของ Attribute ในตาราง DIM_PRODUCT
จากโครงสร้างตาราง `DIM_PRODUCT` ที่มีคอลัมน์ `product_key`, `sku`, และ `product_name` ทั้ง 3 ตัวนี้มีความหมายและการใช้งานที่ต่างกัน ดังนี้:

*   **`product_key` (Surrogate Key):** เป็นคีย์จำลอง (มักจะเป็นตัวเลข INT) ที่ระบบ Data Warehouse สร้างขึ้นมาเองเพื่อให้เป็น Primary Key ของตาราง (ไม่มีความหมายในทางธุรกิจ) ข้อดีคือใช้เชื่อมโยงตาราง (Join) กับตาราง Fact ได้เร็วมาก และช่วยรองรับการเก็บประวัติการเปลี่ยนแปลงข้อมูลในอนาคต (เช่น Slowly Changing Dimensions)
*   **`sku` (Business Key / Natural Key):** ย่อมาจาก Stock Keeping Unit เป็นรหัสสินค้าที่ใช้จริงในการทำธุรกิจ (เช่น บาร์โค้ด หรือรหัสระบบคลังสินค้า) ซึ่งมักจะเป็นตัวอักษรผสมตัวเลข (VARCHAR) มีความหมายทางธุรกิจแต่มักไม่ใช้เป็น Primary Key ในคลังข้อมูล
*   **`product_name` (Descriptive Attribute):** เป็นชื่อหรือคำอธิบายสินค้าที่ให้คนอ่านเข้าใจ (เช่น "เสื้อยืดสีดำ ไซส์ L") ไม่ได้ใช้เป็นคีย์สำหรับอ้างอิงหรือเชื่อมโยงตาราง แต่มีไว้สำหรับแสดงผลในรายงาน (Report) หรือ Dashboard ให้ผู้ใช้อ่าน

## 7. ตัวอย่างข้อมูลในแต่ละตาราง (View Tables)
เพื่อให้เห็นภาพความสัมพันธ์และการเก็บข้อมูลจริงของ Star Schema นี่คือตัวอย่างข้อมูล (Mock Data) 3-4 แถวในแต่ละตารางครับ:

### 7.1 DIM_DATE (ตารางมิติเวลา)
| date_key | full_date | year | quarter | month | week | is_holiday |
|:---|:---|:---|:---|:---|:---|:---|
| 20260910 | 2026-09-10 | 2026 | 3 | 9 | 37 | false |
| 20260911 | 2026-09-11 | 2026 | 3 | 9 | 37 | false |
| 20260912 | 2026-09-12 | 2026 | 3 | 9 | 37 | true |

### 7.2 DIM_PRODUCT (ตารางมิติสินค้า)
| product_key | sku | product_name | category | brand |
|:---|:---|:---|:---|:---|
| 101 | B001 | โค้ก กระป๋อง 325ml | เครื่องดื่ม | Coca-Cola |
| 102 | B002 | น้ำดื่มสิงห์ 600ml | เครื่องดื่ม | Singha |
| 103 | S001 | เลย์ รสมันฝรั่งแท้ | ขนมขบเคี้ยว | Lay's |

### 7.3 DIM_CUSTOMER (ตารางมิติลูกค้า)
| customer_key | customer_name | segment | province | region |
|:---|:---|:---|:---|:---|
| 501 | สมชาย ใจดี | VIP | กรุงเทพมหานคร | กลาง |
| 502 | สมศรี มีทรัพย์ | General | เชียงใหม่ | เหนือ |
| 503 | องค์กร ก ข ค | Corporate | ระยอง | ตะวันออก |

### 7.4 DIM_STORE (ตารางมิติสาขาร้านค้า)
| store_key | store_name | channel | province |
|:---|:---|:---|:---|
| 1 | สาขาเซ็นทรัลลาดพร้าว | หน้าร้าน | กรุงเทพมหานคร |
| 2 | สาขาเมญ่า เชียงใหม่ | หน้าร้าน | เชียงใหม่ |
| 3 | ร้านค้าออนไลน์ Official | ออนไลน์ | กรุงเทพมหานคร |

### 7.5 FACT_SALES (ตารางข้อเท็จจริงยอดขาย)
*สังเกตว่าข้อมูล `date_key`, `product_key`, `customer_key`, `store_key` จะชี้กลับไปหาตารางมิติด้านบน*

| sales_key | date_key | product_key | customer_key | store_key | quantity | unit_price | net_amount | discount |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| 10001 | 20260910 | 101 | 501 | 1 | 2.00 | 15.00 | 30.00 | 0.00 |
| 10002 | 20260911 | 103 | 502 | 2 | 5.00 | 30.00 | 140.00 | 10.00 |
| 10003 | 20260912 | 102 | 503 | 3 | 100.00 | 10.00 | 900.00 | 100.00 |
| 10004 | 20260912 | 101 | 501 | 3 | 1.00 | 15.00 | 15.00 | 0.00 |

## 8. ภาพรวมการนำเสนอข้อมูลจริง (Denormalized View / BI Report)
เมื่อระบบปัจจุบัน (เช่น Power BI, Tableau, หรือระบบ Report) นำข้อมูลไปแสดงผลให้ผู้ใช้หรือผู้บริหารดู ระบบจะทำการเชื่อมโยง (Join) "ตัวเลขรหัส (Keys)" จากตาราง Fact วิ่งกลับไปดึง "รายละเอียด (Text)" จากตาราง Dimension มารวมเป็นตารางเดียวที่คนทั่วไปอ่านแล้วเข้าใจง่าย (Flattened Table หรือ Denormalized View) ดังตัวอย่างด้านล่างนี้:

| วันที่ขาย | สาขา | หมวดหมู่สินค้า | สินค้า | กลุ่มลูกค้า | ชื่อลูกค้า | จำนวน | ราคาต่อหน่วย | ยอดสุทธิ |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| 2026-09-10 | สาขาเซ็นทรัลลาดพร้าว | เครื่องดื่ม | โค้ก กระป๋อง 325ml | VIP | สมชาย ใจดี | 2 | 15.00 | 30.00 |
| 2026-09-11 | สาขาเมญ่า เชียงใหม่ | ขนมขบเคี้ยว | เลย์ รสมันฝรั่งแท้ | General | สมศรี มีทรัพย์ | 5 | 30.00 | 140.00 |
| 2026-09-12 | ร้านค้าออนไลน์ Official | เครื่องดื่ม | น้ำดื่มสิงห์ 600ml | Corporate | องค์กร ก ข ค | 100 | 10.00 | 900.00 |
| 2026-09-12 | ร้านค้าออนไลน์ Official | เครื่องดื่ม | โค้ก กระป๋อง 325ml | VIP | สมชาย ใจดี | 1 | 15.00 | 15.00 |

**สรุปหลักการทำงาน:**
*   **ตาราง Dimension (`DIM_DATE`, `DIM_PRODUCT`, `DIM_CUSTOMER`, `DIM_STORE`):** ทำหน้าที่เสมือน "พจนานุกรม" ที่เก็บข้อมูลเชิงพรรณนา (Descriptive Attributes) หรือข้อความรายละเอียดต่างๆ เพื่อให้คนอ่านเข้าใจ
*   **ตาราง Fact (`FACT_SALES`):** ทำหน้าที่เป็น "แกนกลางของการทำธุรกรรม" ที่เก็บเฉพาะข้อมูลตัวเลข 2 ชนิด คือ 1) รหัสเชื่อมโยง (Foreign Keys) และ 2) ตัวเลขชี้วัด (Measures) เพื่อให้ฐานข้อมูลประมวลผลยอดรวมและดึงข้อมูลได้อย่างรวดเร็วและประหยัดพื้นที่ที่สุด

## 9. โครงสร้างระบบฐานข้อมูลเชิงปฏิบัติการ (OLTP)
นอกเหนือจาก Data Warehouse (ที่เน้นการอ่านและดึงรายงาน) ในโลกของฐานข้อมูลยังมีระบบปฏิบัติการรายวัน หรือที่เรียกว่า **OLTP (Online Transaction Processing)** ซึ่งมีแนวคิดการออกแบบที่ต่างออกไป ดังนี้:

*   **จุดประสงค์:** เน้นให้แอปพลิเคชันสามารถ **บันทึก/อ่าน/แก้ไข** ข้อมูลได้เร็วที่สุด
*   **หลักการออกแบบ:** **"ต้องไม่มีข้อมูลซ้ำซ้อน" (Normalization)** เพื่อประหยัดพื้นที่และป้องกันปัญหาเมื่อมีการอัปเดตข้อมูล

นี่คือตัวอย่างข้อมูล (Mock Data) ของระบบ OLTP ที่ประกอบด้วย 4 ตารางหลัก:

### 9.1 Customers (ตารางข้อมูลลูกค้า)
เก็บข้อมูลผู้ใช้งาน/ลูกค้า (เช่น ชื่อ, อีเมล, รหัสผ่าน)

| customer_id | name | email | password_hash |
|:---|:---|:---|:---|
| 501 | สมชาย ใจดี | somchai@email.com | $2y$10$... |
| 502 | สมศรี มีทรัพย์ | somsri@email.com | $2y$10$... |

### 9.2 Products (ตารางข้อมูลสินค้า)
เก็บข้อมูลสินค้า (เช่น รหัสสินค้า, ราคาปัจจุบัน, จำนวนสต็อก)

| product_id | sku | product_name | current_price | stock_qty |
|:---|:---|:---|:---|:---|
| 101 | B001 | โค้ก กระป๋อง 325ml | 15.00 | 500 |
| 102 | B002 | น้ำดื่มสิงห์ 600ml | 10.00 | 1200 |

### 9.3 Orders (ตารางหัวบิล)
เก็บข้อมูลหลักของใบสั่งซื้อ (เช่น รหัสบิล, วันที่ซื้อ, รหัสลูกค้าที่ซื้อ, สถานะการจ่ายเงิน)

| order_id | order_date | customer_id | status |
|:---|:---|:---|:---|
| 1001 | 2026-09-10 | 501 | Completed |
| 1002 | 2026-09-11 | 502 | Pending |

### 9.4 Order_Items (ตารางรายละเอียดบิล)
เก็บรายละเอียดว่าใน 1 บิลซื้ออะไรบ้าง (เช่น รหัสบิล, รหัสสินค้า, จำนวนชิ้น, ราคา ณ ตอนที่ซื้อ)

| order_item_id | order_id | product_id | quantity | unit_price_at_purchase |
|:---|:---|:---|:---|:---|
| 1 | 1001 | 101 | 2 | 15.00 |
| 2 | 1001 | 102 | 1 | 10.00 |
| 3 | 1002 | 101 | 5 | 15.00 |

> [!NOTE] 
> **ไฟล์ตัวอย่างข้อมูลจริง (CSV):** ได้มีการสร้างไฟล์ตัวอย่างข้อมูล (Mock Data) สำหรับทั้ง 4 ตารางด้านบนในปริมาณมาก (Customers 500 รายการ, Products 2,000 รายการ, Orders 15,000 รายการ และ Order_Items 37,000+ รายการ) โดยจัดเก็บไว้ให้ในโฟลเดอร์ `Ex Database/data` เพื่อให้คุณนำไปทดลอง Import เข้าสู่ระบบฐานข้อมูลได้เลยครับ
