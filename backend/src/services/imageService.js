import axios from "axios";

export const generateImage = async (topic, data) => {
  const prompt = `
YouTube thumbnail of ${topic}

STRICT:
- ONLY show ${topic}
- No unrelated items

STYLE:
- Bright colors
- Close-up subject
- High contrast

SCENE:
${topic}, ${data.prompt}
`;

  const res = await axios.post(
    "https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image",
    {
      text_prompts: [{ text: prompt }],
      height: 512,
      width: 512,
      steps: 30
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.STABILITY_API_KEY}`
      }
    }
  );

  return `data:image/png;base64,${res.data.artifacts[0].base64}`;
};