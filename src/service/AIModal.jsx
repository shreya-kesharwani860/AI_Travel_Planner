import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-lite",
});

const generationConfig={
    temperature:1,
    maxOutputTokens:8192,
    responseMimeType:"application/json",
};

export const chatSession = async (prompt) => {
  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }]
      }
    ],
    generationConfig
  });

  return result.response.text();
};