import axios from "axios";

export const getGeminiData = async (topic) => {
  const prompt = `
Generate YouTube content ONLY for topic: ${topic}

STRICT:
- No unrelated content
- No money unless topic is finance

Return JSON:
{
 "titles": ["...","...","..."],
 "prompt": "visual idea"
}
`;

  const res = await axios.post(
    `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [{ parts: [{ text: prompt }] }]
    }
  );

  const text = res.data.candidates[0].content.parts[0].text;

  return JSON.parse(text.replace(/```json|```/g, "").trim());
};