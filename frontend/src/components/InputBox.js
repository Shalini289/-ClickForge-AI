"use client";

import { useState } from "react";

export default function InputBox({ onGenerate }) {
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState("mrbeast");

  const handleSubmit = () => {
    if (!topic.trim()) return alert("Enter a topic!");
  console.log(topic);
    onGenerate({ topic, style });
  
  };

  return (
    <div className="card">
      <h3>🎯 Create Viral Thumbnail</h3>

      {/* INPUT */}
      <input
        type="text"
        placeholder="Enter topic (e.g. earn money online)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="input-box"
      />

      {/* STYLE SELECT */}
      <select
        value={style}
        onChange={(e) => setStyle(e.target.value)}
        className="input-box"
      >
        <option value="mrbeast">🔥 MrBeast</option>
        <option value="gaming">🎮 Gaming</option>
        <option value="finance">💰 Finance</option>
        <option value="podcast">🎙 Podcast</option>
        <option value="tech">⚡ Tech</option>
        <option value="Other">Other</option>
      </select>

      {/* BUTTON */}
      <button
        className="btn"
        style={{ width: "100%", marginTop: "10px" }}
        onClick={handleSubmit}
      >
        Generate Thumbnail
      </button>
    </div>
  );
}