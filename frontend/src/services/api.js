import axios from "axios";

export const generateThumbnail = async (topic) => {
  const res = await axios.post("http://localhost:5000/generate", {
    topic
  });
  return res.data;
};