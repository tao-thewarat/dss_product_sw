import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ข้อมูลรายวิชา (Course Info) — DSS",
  description: "ภาพรวมและแผนการเรียนรายวิชาระบบสนับสนุนการตัดสินใจ (Decision Support Systems)",
};

export default function CoursePage() {
  return (
    <>
      <div className="course-hero">
        <h1>
          📚 ระบบสนับสนุนการตัดสินใจ
          <br />
          (Decision Support Systems)
        </h1>
        <p>
          คลังเนื้อหาหลักและการเรียนรู้ตลอด 16 สัปดาห์ ที่มุ่งเน้นทั้งทฤษฎีรากฐาน (Foundations) 
          การจัดการข้อมูล (Data) โมเดลการตัดสินใจ (Models) และการนำเทคโนโลยี AI มาประยุกต์ใช้ในยุคใหม่ 
          เพื่อให้ผู้เรียนสามารถออกแบบและพัฒนาระบบสนับสนุนการตัดสินใจที่มีประสิทธิภาพ
        </p>
      </div>

      <div className="card">
        <h2>📌 โครงสร้างเนื้อหารายวิชา (16 สัปดาห์)</h2>
        <p className="muted" style={{ marginBottom: "16px", fontSize: "14px" }}>
          เนื้อหาถูกออกแบบให้ครอบคลุมกระบวนการทำงานของ DSS แบบครบวงจร ตั้งแต่ Data ไปจนถึง Action
        </p>
        
        <table style={{ width: "100%", fontSize: "14px" }}>
          <thead>
            <tr>
              <th style={{ width: "20%" }}>ช่วง (Phase)</th>
              <th style={{ width: "15%", textAlign: "center" }}>สัปดาห์ที่</th>
              <th style={{ textAlign: "left" }}>หัวข้อการเรียนรู้</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><b>Part I — รากฐาน</b></td>
              <td style={{ textAlign: "center" }}>W1–W2</td>
              <td style={{ textAlign: "left" }}>การตัดสินใจ (Simon's Phases) และสถาปัตยกรรม DSS 4 ระบบย่อย</td>
            </tr>
            <tr>
              <td><b>Part II — ข้อมูล</b></td>
              <td style={{ textAlign: "center" }}>W3–W7</td>
              <td style={{ textAlign: "left" }}>Data Warehouse, ETL, OLAP, Data Mining (CRISP-DM, ML เบื้องต้น) และ Dashboard</td>
            </tr>
            <tr style={{ background: "rgba(251,191,36,0.1)" }}>
              <td><b>Midterm Exam</b></td>
              <td style={{ textAlign: "center", color: "var(--warn)" }}><b>W8</b></td>
              <td style={{ textAlign: "left", color: "var(--warn)" }}><b>สอบกลางภาค</b></td>
            </tr>
            <tr>
              <td><b>Part III — ตัวแบบ</b></td>
              <td style={{ textAlign: "center" }}>W9–W11</td>
              <td style={{ textAlign: "left" }}>Predictive Modeling, Optimization และ Simulation (Monte Carlo, Heuristics)</td>
            </tr>
            <tr>
              <td><b>Part IV — ความไม่แน่นอน</b></td>
              <td style={{ textAlign: "center" }}>W12–W14</td>
              <td style={{ textAlign: "left" }}>Fuzzy Logic, Bayesian Networks, และ Expert Systems (DMN)</td>
            </tr>
            <tr>
              <td><b>Part V — ยุคใหม่</b></td>
              <td style={{ textAlign: "center" }}>W15–W16</td>
              <td style={{ textAlign: "left" }}>Decision Intelligence, Agentic AI, DecisionOps และการนำเสนอโครงงานกลุ่ม</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="card" style={{ marginTop: "16px" }}>
        <h2>📝 สื่อการเรียนรู้และการประเมินผล</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "16px" }}>
          <div>
            <h3>การวัดผล (Grading)</h3>
            <ul style={{ color: "var(--dim)", fontSize: "14px", lineHeight: "1.7", paddingLeft: "20px" }}>
              <li><b>สอบกลางภาค:</b> 25%</li>
              <li><b>สอบปลายภาค:</b> 30%</li>
              <li><b>งานกลุ่ม (Mini-DSS Prototype):</b> 25%</li>
              <li><b>งานเดี่ยว (DSS Data Analysis):</b> 15%</li>
              <li><b>ปฏิบัติการ (Labs):</b> 5%</li>
            </ul>
          </div>
          <div>
            <h3>เกี่ยวกับ Vault นี้</h3>
            <p className="muted" style={{ fontSize: "14px", lineHeight: "1.7" }}>
              โปรเจกต์นี้ทำงานร่วมกับคลังความรู้แบบ Obsidian (Vault) ซึ่งเป็นศูนย์รวม (Map of Content) 
              สำหรับอาจารย์ผู้สอนและผู้เรียน เพื่อใช้เป็นแหล่งอ้างอิง เนื้อหา สไลด์ แผนการสอน 
              และเชื่อมต่อมายังสื่อจำลอง (Simulations) ภายในเว็บแอปพลิเคชันนี้
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
