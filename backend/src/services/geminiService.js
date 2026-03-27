import axios from "axios";

// 🔥 OPTIONAL: simple category detection (helps accuracy)
const detectCategory = (topic) => {
  const t = topic.toLowerCase();

  if (t.includes("food") || t.includes("recipe")) return "food";
  if (t.includes("game") || t.includes("pubg")) return "gaming";
  if (t.includes("money") || t.includes("earn")) return "finance";

  return "general";
};

export const getGeminiData = async (topic) => {
  try {
    const category = detectCategory(topic);

    const prompt = `
You are a YouTube growth expert.

STRICT RULES:
- Topic: "${topic}"
- Category: ${category}
- ONLY generate content related to topic
- DO NOT include money unless category is finance
- DO NOT include unrelated ideas

Generate:
1. 3 viral YouTube titles
2. Thumbnail visual idea

Return ONLY valid JSON:

{
  "titles": ["title1", "title2", "title3"],
  "prompt": "visual description"
}
`;

    const response = await axios.post(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
  {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }]
      }
    ]
  }
);

    // 🔍 SAFE RESPONSE EXTRACTION
    const text =
      response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) throw new Error("Empty Gemini response");

    // 🧼 CLEAN JSON
    const clean = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed;

    try {
      parsed = JSON.parse(clean);
    } catch (err) {
      console.log("⚠️ JSON parse failed, raw:", clean);

      // 🔥 fallback if Gemini gives bad JSON
      parsed = {
        titles: [
          `${topic} You Must See 😱`,
          `Best ${topic} Ever 🔥`,
          `${topic} Secrets Revealed 💥`
        ],
        prompt: `${topic}, close-up, vibrant colors, high contrast`
      };
    }

    // 🔥 SAFETY: ensure titles exist
    if (!parsed.titles || !Array.isArray(parsed.titles)) {
      parsed.titles = [
        `${topic} You Must See 😱`,
        `Best ${topic} Ever 🔥`,
        `${topic} Secrets Revealed 💥`
      ];
    }

    // 🔥 SAFETY: ensure prompt exists
    if (!parsed.prompt) {
      parsed.prompt = `${topic}, close-up, vibrant`;
    }

    // 🔥 FORCE TOPIC IN TITLES (fix your issue)
    parsed.titles = parsed.titles.map((t) =>
      t.toLowerCase().includes(topic.toLowerCase())
        ? t
        : `${t}`
    );

    // 🔥 REMOVE WRONG WORDS
    if (!topic.toLowerCase().includes("money")) {
      parsed.titles = parsed.titles.map((t) =>
        t.replace(/money|cash|dollar/gi, "")
      );

      parsed.prompt = parsed.prompt.replace(
        /money|cash|dollar/gi,
        ""
      );
    }

    return parsed;

  } catch (error) {
    console.error("❌ GEMINI ERROR:", error.message);

    // 🔥 FINAL FALLBACK (NEVER FAIL)
    return {
      titles: [
        `${topic} You Must See 😱`,
        `Best ${topic} Ever 🔥`,
        `${topic} Secrets Revealed 💥`
      ],
      prompt: `${topic}, close-up, bright colors`
    };
  }
};