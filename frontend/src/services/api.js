import axios from "axios";

export const generateThumbnail = async (topic, style) => {
  const res = await axios.post("https://clickforge-ai.onrender.com/api/generate", {
    topic,
    style
  });

  return res.data;
};