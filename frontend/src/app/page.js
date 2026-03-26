"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import InputBox from "../components/InputBox";
import ResultCard from "../components/ResultCard";
import Loader from "../components/Loader";
import { generateThumbnail } from "../services/api";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (topic) => {
    if (!topic) return;

    setLoading(true);
    try {
      const res = await generateThumbnail(topic);
      setData(res);
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Input Section */}
      <InputBox onGenerate={handleGenerate} />

      {/* Loader */}
      {loading && <Loader />}

      {/* Results */}
      {data && <ResultCard data={data} />}
    </div>
  );
}