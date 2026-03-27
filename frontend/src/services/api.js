import axios from "axios";

export const generateThumbnail = async (topic, style) => {
  const res = await axios.post("http://127.0.0.1:5000/api/generate", {
    topic,
    style
  });

  return res.data;
};