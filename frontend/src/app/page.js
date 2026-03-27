"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import InputBox from "../components/InputBox";
import ResultCard from "../components/ResultCard";
import Loader from "../components/Loader";
import { generateThumbnail } from "../services/api";
 import { saveThumbnail } from "../firebase/db";
export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async ({ topic, style }) => {
  try {
    const res = await generateThumbnail(topic, style);

    // 🔥 SAFETY CHECK
    if (!res || !res.titles || !res.thumbnails) {
      console.log("❌ Invalid API response:", res);
      return;
    }

    setData(res);

    // ✅ Save ONLY if image exists
    if (res.best?.image) {
      await saveThumbnail({
        topic,
        titles: res.titles,
        image: res.best.image
      });
    }

  } catch (error) {
    console.error("❌ FRONTEND ERROR:", error);
  }
};

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      <div className="container">

  <InputBox onGenerate={handleGenerate} />

  {loading && <Loader />}

  <ResultCard data={data} />
</div>
      
    </div>
  );
}
