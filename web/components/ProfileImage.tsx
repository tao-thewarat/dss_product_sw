"use client";

import React from "react";

export default function ProfileImage() {
  return <img src="/profile.jpg" alt="Pangpond" className="profile-img" onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=Pangpond&background=2b3157&color=fff&size=200"; }} />;
}
