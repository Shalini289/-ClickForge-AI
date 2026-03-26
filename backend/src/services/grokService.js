import axios from "axios";

export const getGrokData = async (topic) => {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "Llama 3.1 8B Instant",
        temperature: 0.8,
        messages: [
          {
            role: "system",
            content: "You are an expert YouTube growth strategist."
          },
          {
            role: "user",
            content: `
Generate 3 HIGH CTR YouTube titles and a thumbnail idea.

Rules:
- Use curiosity
- Add emotion (😱🔥💰)
- Use numbers or urgency
- Make it clickbait but realistic

Return ONLY JSON:
{
  "titles": ["title1", "title2", "title3"],
  "prompt": "viral thumbnail description"
}

Topic: ${topic}
`
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const content = response.data.choices[0].message.content;

    // Clean JSON (important)
    const clean = content.replace(/```json|```/g, "").trim();

    return JSON.parse(clean);

  } catch (error) {
    console.error("GROQ ERROR:", error.response?.data || error.message);

    return {
      titles: ["Amazing Secret 😱", "You Won’t Believe This 🔥", "Earn Fast 💰"],
      prompt: "shocked face, money, bold text, youtube thumbnail"
    };
  }
};