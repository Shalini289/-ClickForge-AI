import axios from "axios";

export const generateThumbnail = async (topic) => {
  const res = await axios.post("https://clickforge-ai.onrender.com/generate", {
    topic
  });
  return res.data;
};