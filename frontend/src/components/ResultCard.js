"use client";

import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { Rnd } from "react-rnd";

export default function ResultCard({ data }) {
  const [text, setText] = useState("SHOCKING 😱");
  const [bgStyle, setBgStyle] = useState("dark");

  const canvasRef = useRef();

  if (!data) return null;

  // 📥 Download image
  const downloadImage = async () => {
    const canvas = await html2canvas(canvasRef.current);
    const link = document.createElement("a");
    link.download = "thumbnail.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="result">

      {/* TITLES */}
      <div className="card">
        <h3>Titles</h3>
        <ul>
          {data.titles?.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </div>

      {/* EDITOR */}
      <div className="card">
        <h3>Pro Thumbnail Editor</h3>

        {/* Background selector */}
        <select
          value={bgStyle}
          onChange={(e) => setBgStyle(e.target.value)}
          className="input-box"
        >
          <option value="none">Original</option>
          <option value="dark">Dark</option>
          <option value="gradient">Gradient</option>
          <option value="blur">Blur</option>
        </select>

        <br /><br />

        {/* CANVAS */}
        <div
          ref={canvasRef}
          style={{
            position: "relative",
            display: "inline-block",
            overflow: "hidden",
            borderRadius: "10px"
          }}
        >
          {/* Gradient */}
          {bgStyle === "gradient" && (
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)",
                zIndex: 1
              }}
            />
          )}

          {/* IMAGE */}
          <img
            src={data.image}
            className="thumbnail"
            style={{
              filter:
                bgStyle === "dark"
                  ? "brightness(0.6)"
                  : bgStyle === "blur"
                  ? "blur(2px)"
                  : "none"
            }}
          />

          {/* 🔥 DRAG TEXT */}
          <Rnd
  default={{
    x: 50,
    y: 50,
    width: 200,
    height: 50
  }}
>
  <div
    style={{
      color: "yellow",
      fontSize: "28px",
      fontWeight: "bold",
      textShadow: "2px 2px 6px black",
      cursor: "move"
    }}
  >
    {text}
  </div>
</Rnd>
<Rnd
  default={{
    x: 150,
    y: 150,
    width: 50,
    height: 50
  }}
>
  <img
    src="https://cdn-icons-png.flaticon.com/512/545/545682.png"
    style={{ width: "100%", height: "100%" }}
  />
</Rnd>
        </div>

        <br /><br />

        {/* TEXT INPUT */}
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="input-box"
        />

        <br /><br />

        {/* DOWNLOAD */}
        <button className="btn" onClick={downloadImage}>
          Download Final Thumbnail
        </button>
      </div>
      <h3>📊 CTR Score: {data.ctr_score}/100</h3>

<div style={{ marginTop: "10px" }}>
  <h4>💡 Suggestions:</h4>
  <ul>
    {data.suggestions?.map((s, i) => (
      <li key={i}>{s}</li>
    ))}
  </ul>
</div>
    </div>
  );
}