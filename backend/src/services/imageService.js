import axios from "axios";

export const generateImage = async (prompt) => {
  try {
    const enhancedPrompt = `
YouTube thumbnail, ultra high CTR, viral style:

- Close-up shocked human face 😱
- Bright yellow and red contrast
- Big bold text (few words only)
- Arrows, circles, highlights
- Dramatic lighting
- Clean composition
- Focus on emotion

Scene: ${prompt}
`;

    const response = await axios.post(
      "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
      {
        text_prompts: [{ text: enhancedPrompt }],
        cfg_scale: 7,
        height: 1024,
        width: 1024,
        samples: 1
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    );

    const base64 = response.data.artifacts[0].base64;

    return `data:image/png;base64,${base64}`;

  } catch (error) {
    console.error("STABILITY ERROR:", error.response?.data || error.message);

    // fallback image
    return "https://via.placeholder.com/512?text=Thumbnail";
  }
};