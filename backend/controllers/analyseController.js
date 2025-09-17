import dotenv from "dotenv";
import { OpenAI } from "openai";
import { SYSTEM_PROMPT } from "../prompts/systemPrompts.js";
import { Project } from "../models/Project.js";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const analyseController = async (req, res) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "Server configuration error" });
    }

    const { description } = req.body;
    if (!description || description.trim.length === 0) {
      return res.status(400).json({ error: "Please provide a description." });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: description },
      ],
      temperature: 0.3,
      max_tokens: 1000,
    });

    const extractedRequirements = response.choices[0].message.content;

    // Parse the JSON response
    let parsedResult;
    try {
      parsedResult = JSON.parse(extractedRequirements);
    } catch (parseError) {
      console.error("Failed to parse OpenAI response:", parseError);
      return res.status(500).json({
        error: "Failed to parse result",
      });
    }

    res.json({
      analysis: parsedResult,
      originalDescription: description.trim(),
    });
  } catch (error) {
    console.error("Error in analyseController:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
