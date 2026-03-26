import { getGrokData } from "../services/grokService.js";
import { generateImage } from "../services/imageService.js";

export const generate = async (req, res) => {
  try {
    const { topic } = req.body;

    // 1. Get titles + prompt from Grok
    const grokData = await getGrokData(topic);

    // 2. Generate thumbnail
    const imageUrl = await generateImage(grokData.prompt);

    res.json({
      titles: grokData.titles,
      prompt: grokData.prompt,
      image: imageUrl
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};