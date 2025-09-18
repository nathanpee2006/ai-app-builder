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
    if (!description || description.trim().length === 0) {
      return res.status(400).json({
        error: "Please provide a valid description.",
      });
    }
    if (description.trim().length < 20) {
      return res.status(400).json({
        error: "Description must be at least 20 characters long.",
      });
    }
    if (description.trim().length > 1000) {
      return res.status(400).json({
        error: "Description must be less than 1000 characters.",
      });
    }

    let response;
    try {
      response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: description.trim() },
        ],
        temperature: 0.3,
        max_tokens: 1000,
      });
    } catch (openaiError) {
      console.error("OpenAI API error:", openaiError);
      if (openaiError.status === 429) {
        return res.status(503).json({
          error: "AI service is busy. Please try again in a moment.",
        });
      }
      return res.status(500).json({
        error: "AI service temporarily unavailable",
      });
    }

    let aiResponse;
    try {
      aiResponse = JSON.parse(response.choices[0].message.content);
    } catch (parseError) {
      console.error("Failed to parse OpenAI response:", parseError);
      return res.status(500).json({
        error: "AI returned invalid response format",
      });
    }

    if (!aiResponse.extractedRequirements || !aiResponse.uiMetadata) {
      console.error("Invalid OpenAI response structure:", aiResponse);
      return res.status(500).json({
        error: "AI response missing required sections",
      });
    }

    const formConfigMap = new Map(
      Object.entries(aiResponse.uiMetadata.formConfig || {})
    );

    const roleFeatureMappingMap = new Map(
      Object.entries(aiResponse.uiMetadata.roleFeatureMapping || {})
    );

    // Save to database
    let savedProject;
    try {
      savedProject = await Project.create({
        userDescription: description.trim(),
        extractedRequirements: aiResponse.extractedRequirements,
        uiMetadata: {
          formConfig: formConfigMap,
          roleFeatureMapping: roleFeatureMappingMap,
        },
      });
    } catch (dbError) {
      console.error("Database save error:", dbError);
      return res.status(500).json({
        error: "Failed to save project to database",
        details: dbError.message,
      });
    }

    res.status(201).json({
      success: true,
      projectId: savedProject._id,
      originalDescription: savedProject.userDescription,
      extractedRequirements: savedProject.extractedRequirements,
      uiMetadata: savedProject.uiMetadata,
    });
  } catch (error) {
    console.error("Error in analyseController:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
