import 'openai/shims/web';
import OpenAI from "openai";
import { OPENAI_API_KEY } from "@env";
import { GPTResponse, UserSettings } from "@/types/types";

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Required for React Native
});

export const gptApi = {
  async generateQuestions(
    userPreferences?: UserSettings
  ): Promise<GPTResponse> {
    try {
      console.log("1. Starting generateQuestions...");
      
      const preferencesContext = userPreferences
        ? `Based on the following user preferences: ${JSON.stringify(
            userPreferences
          )}, `
        : "For a general audience, ";

      console.log("2. Creating chat completion...");
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are an expert at creating personalized experiences for users.",
          },
          {
            role: "user",
            content: `${preferencesContext} Generate 3 personalized questions to better understand the user's preferences across any domain or topic. Ensure the output is in JSON format with the structure: { questions: [{ id, question, options: [{ id, label }] }] }.`,
          },
        ],
        temperature: 0.7,
      });

      console.log("3. Parsing response...");
      const parsedResponse = JSON.parse(response.choices[0].message.content || "{}");
      console.log("4. Response parsed successfully:", parsedResponse);
      
      return parsedResponse;
    } catch (error: any) {
      console.error("Error in generateQuestions:", error);
      throw new Error(`Failed to generate questions: ${error.message}`);
    }
  },

  async getPersonalizedRecommendations(
    answers: Record<string, string>
  ): Promise<string[]> {
    try {
      console.log("1. Starting getPersonalizedRecommendations...");
      
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are an expert at providing personalized recommendations.",
          },
          {
            role: "user",
            content: `Using the following responses: ${JSON.stringify(
              answers
            )}, generate 5 personalized recommendations in JSON array format.`,
          },
        ],
        temperature: 0.7,
      });

      console.log("2. Parsing recommendations response...");
      const parsedResponse = JSON.parse(response.choices[0].message.content || "[]");
      console.log("3. Recommendations parsed successfully:", parsedResponse);
      
      return parsedResponse;
    } catch (error: any) {
      console.error("Error in getPersonalizedRecommendations:", error);
      throw new Error(`Failed to generate recommendations: ${error.message}`);
    }
  },
};
