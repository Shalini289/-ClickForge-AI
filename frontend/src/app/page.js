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
  setLoading(true);

const res = await generateThumbnail(topic, style);

setData(res);
setLoading(false);
// SAVE TO FIREBASE
await saveThumbnail({
  topic,
  titles: res.titles,
  image: res.image
});

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
