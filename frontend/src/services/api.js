import axios from "axios";

export const generateThumbnail = async (topic, style) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/generate",
      {
        topic,
        style,
      }
    );

    console.log("✅ API RESPONSE:", res.data);

    return res.data;

  } catch (error) {
    console.error("❌ API CALL FAILED:", error.message);

    // Detailed debugging 👇
    if (error.response) {
      console.error("Server Error:", error.response.data);
    } else if (error.request) {
      console.error("No response from backend");
    }

    return null;
  }
};