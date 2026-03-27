import { getGeminiData } from "../services/geminiService.js";
import { generateImage } from "../services/imageService.js";

export const generate = async (req, res) => {
  try {
    const { topic, style } = req.body;

    console.log("🔥 CONTROLLER HIT:", topic);

    let aiData = await getGeminiData(topic, style);

    // 🔥 FORCE FIX
    aiData.titles = aiData.titles.map(t =>
      t.toLowerCase().includes(topic.toLowerCase())
        ? t
        : `${topic} ${t}`
    );

    aiData.prompt = `${topic}, ${aiData.prompt}`;

    const image = await generateImage(topic, aiData);

    res.json({
      ...aiData,
      image
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error generating" });
  }
};