"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <div className="navbar">
      <h2>ClickForge AI</h2>

      <div style={{ display: "flex", gap: "10px" }}>
        <button className="btn" onClick={() => router.push("/")}>
          Home
        </button>

        <button className="btn" onClick={() => router.push("/dashboard")}>
          Dashboard
        </button>
      </div>
    </div>
  );
}