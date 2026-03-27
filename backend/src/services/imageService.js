import dotenv from "dotenv";
dotenv.config();
import axios from "axios";

export const generateImage = async (topic, data) => {
  try {
    const prompt = `
YouTube thumbnail of ${topic}

- Close-up subject
- Bright colors
- High contrast
- Viral YouTube style

Scene: ${topic}, ${data.prompt}
`;

    const response = await axios.post(
      "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        inputs: prompt
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_API_KEY}`,
          Accept: "image/png", 
        },
        responseType: "arraybuffer" // 🔥 VERY IMPORTANT
      }
    );

    // Convert image buffer → base64
    const base64 = Buffer.from(response.data).toString("base64");

    return `data:image/png;base64,${base64}`;

  } catch (error) {
  if (error.response?.data) {
    const decoded = Buffer.from(error.response.data).toString("utf-8");
    console.error("❌ ERROR:", decoded);
  } else {
    console.error("❌ ERROR:", error.message);
  }
}
};