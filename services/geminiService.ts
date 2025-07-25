
import { GoogleGenAI, Type } from "@google/genai";
import type { BookSummary } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const summarySchema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: 'A comprehensive summary of the book. Should be in Hebrew.',
    },
    keyIdeas: {
      type: Type.ARRAY,
      description: 'A list of 3-5 key ideas or themes from the book. Each idea should be a string. All text must be in Hebrew.',
      items: {
        type: Type.STRING,
      },
    },
    interpretation: {
      type: Type.STRING,
      description: 'A literary and spiritual interpretation of the book, offering deeper meaning beyond a superficial analysis. Must be in Hebrew.',
    },
  },
  required: ['summary', 'keyIdeas', 'interpretation'],
};

export const generateBookSummary = async (bookTitle: string): Promise<BookSummary> => {
  try {
    const systemInstruction = `
        You are an expert literary analyst specializing in summarizing books for a Hebrew-speaking audience. 
        Your summaries are for students, lifelong learners, and busy people who need to understand a book's essence quickly.
        Your mission is to provide original, high-quality Hebrew content in a clear, structured format.
        For any book title you receive, you must generate a response in JSON format according to the provided schema.
        The response must include:
        1.  A concise yet comprehensive summary ('summary').
        2.  A list of the main ideas ('keyIdeas').
        3.  A literary-spiritual interpretation ('interpretation') that goes beyond superficial analysis.
        All text in your response MUST be in Hebrew.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Please generate a summary for the book: "${bookTitle}"`,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: summarySchema,
      }
    });

    const text = response.text.trim();
    const parsedJson: BookSummary = JSON.parse(text);
    return parsedJson;

  } catch (error) {
    console.error("Error generating book summary from Gemini:", error);
    throw new Error("Failed to generate summary from API.");
  }
};
