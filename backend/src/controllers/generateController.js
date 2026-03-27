import { getGeminiData } from "../services/geminiService.js";
import { generateImage } from "../services/imageService.js";

export const generate = async (req, res) => {
  try {
    const { topic, style } = req.body;

    if (!topic) {
      return res.status(400).json({ error: "Topic is required" });
    }

    console.log("🔥 CONTROLLER HIT:", topic);

    // 🧠 STEP 1: Get AI data
    const aiData = await getGeminiData(topic, style);

    if (!aiData || !aiData.titles) {
      return res.status(500).json({ error: "AI failed" });
    }

    // 🎯 STEP 2: MULTI THUMBNAIL VARIATIONS
    const variations = [
      `${aiData.prompt}, extreme close-up, shocked expression`,
      `${aiData.prompt}, dramatic lighting, arrows, high contrast`,
      `${aiData.prompt}, zoomed subject, vibrant colors`
    ];

    // 🎨 STEP 3: Generate images
    const images = await Promise.all(
      variations.map((prompt) =>
        generateImage(topic, { prompt })
      
      )
      
    );

    // 📊 STEP 4: Assign simple CTR score
    const thumbnails = images.map((img, i) => ({
      image: img,
      prompt: variations[i],
      ctr: 70 + Math.floor(Math.random() * 30)
    }));
console.log("IMAGE SAMPLE:", thumbnails[0]?.image?.slice(0, 50));
    // 🏆 STEP 5: Best thumbnail
    const best = thumbnails.reduce((a, b) =>
      a.ctr > b.ctr ? a : b
    );

    // 🚀 RESPONSE
    res.json({
      titles: aiData.titles,
      thumbnails,
      best
    });

  } catch (error) {
    console.error("❌ CONTROLLER ERROR:", error.message);

    res.status(500).json({
      error: "Server error",
      details: error.message
    });
  }
};