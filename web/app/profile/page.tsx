import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ผู้สร้าง (Creator Profile) — DSS",
  description: "ประวัติและผลงานของผู้สร้างระบบ DSS Simulations",
};

export default function ProfilePage() {
  return (
    <>
      <div className="pagehead">
        <h1>
          👨‍💻 โปรไฟล์ผู้สร้าง (Creator Profile)
          <small>ทำความรู้จักกับผู้พัฒนาเบื้องหลังระบบนี้</small>
        </h1>
      </div>

      <div className="profile-card">
        <div className="profile-head">
          <img
            src="/profile.jpg"
            alt="Pangpond"
            className="profile-img"
            onError={(e) => {
              // Fallback if user hasn't added the image yet
              e.currentTarget.src = "https://ui-avatars.com/api/?name=Pangpond&background=2b3157&color=fff&size=200";
            }}
          />
          <div className="profile-title">
            <h1>นายเทวนารถ จารุสิทธิ์ (ปังปอนด์)</h1>
            <p>Artificial Intelligence & Prompt Engineering Student</p>
            <span>🎂 25 เมษายน 2007</span>
          </div>
        </div>

        <div className="profile-grid">
          {/* ข้อมูลการศึกษา & บุคลิกภาพ */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div className="profile-section">
              <h3>🎓 การศึกษา (Education)</h3>
              <p>
                นักศึกษาชั้นปีที่ 2 สาขา <b>Artificial Intelligence and Prompt Engineering</b>
                <br />
                ณ มหาวิทยาลัยอุบลราชธานี
              </p>
            </div>

            <div className="profile-section" style={{ flex: 1 }}>
              <h3>✨ บุคลิกภาพ (Personality)</h3>
              <p>
                ปกติจะเป็นคนสไตล์ <b>Introvert</b> ที่ชอบความสงบและใช้เหตุผล 
                แต่ถ้าได้อยู่กับเพื่อนที่รู้ใจเมื่อไหร่ ก็พร้อมปล่อยจอยเต็มที่! 🎮🎉
              </p>
            </div>
          </div>

          {/* ทักษะความสามารถ */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div className="profile-section">
              <h3>💻 ทักษะด้าน Tech & AI</h3>
              <div className="skill-tags">
                <span className="skill-tag">Prompt Engineering</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">React</span>
                <span className="skill-tag">Face-API.js</span>
                <span className="skill-tag alt">Python (ML)</span>
                <span className="skill-tag alt">IoT (ESP32)</span>
              </div>
            </div>

            <div className="profile-section" style={{ flex: 1 }}>
              <h3>🎮 นักพัฒนาเกม (Game Developer)</h3>
              <p>
                มีความสนใจและสร้างสรรค์ผลงานเกมบนแพลตฟอร์ม <b>Roblox</b> มาอย่างต่อเนื่อง 
                ผสมผสานจินตนาการและทักษะการเขียนโปรแกรมเข้าด้วยกัน
              </p>
              <div className="skill-tags" style={{ marginTop: "12px" }}>
                <span className="skill-tag" style={{ background: "rgba(34,197,94,0.12)", color: "var(--ok)", borderColor: "rgba(34,197,94,0.25)" }}>
                  Roblox Studio
                </span>
                <span className="skill-tag" style={{ background: "rgba(34,197,94,0.12)", color: "var(--ok)", borderColor: "rgba(34,197,94,0.25)" }}>
                  Luau
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
