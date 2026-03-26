import { useState } from "react";

export default function InputBox({ onGenerate }) {
  const [topic, setTopic] = useState("");

  return (
    <div className="container">
      <h1>AI Thumbnail Generator 🚀</h1>
      <p>Create high CTR thumbnails instantly</p>

      <input
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter topic..."
        className="input-box"
      />

      <button className="btn" onClick={() => onGenerate(topic)}>
        Generate
      </button>
    </div>
  );
}