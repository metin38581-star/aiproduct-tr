import { GoogleGenAI, Type } from "@google/genai";
import { ProductAnalysis } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // API anahtarı hem process.env hem de fallback kontrolüyle alınır
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("API_KEY bulunamadı! Lütfen Vercel ortam değişkenlerini kontrol edin.");
    }
    this.ai = new GoogleGenAI({ apiKey: apiKey || '' });
  }

  async analyzeProductImage(base64Data: string, mimeType: string): Promise<ProductAnalysis> {
    const cleanBase64 = base64Data.includes(',') ? base64Data.split(',')[1] : base64Data;
    
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview', // Hızlı ve kararlı model
        contents: [
          {
            parts: [
              {
                inlineData: {
                  mimeType: mimeType,
                  data: cleanBase64,
                },
              },
              {
                text: `Sen profesyonel bir e-ticaret uzmanısın. Bu ürünü analiz et ve yanıtı sadece JSON formatında ver.`
              },
            ],
          },
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              productName: { type: Type.STRING },
              usageAreas: { type: Type.ARRAY, items: { type: Type.STRING } },
              competitionScore: { type: Type.NUMBER },
              marketSaturation: { type: Type.STRING },
              verdict: { type: Type.STRING, enum: ["SAT", "SATMA"] },
              reasoning: { type: Type.STRING },
              targetAudience: { type: Type.ARRAY, items: { type: Type.STRING } },
              metaTargeting: { type: Type.ARRAY, items: { type: Type.STRING } },
              metaAdCopy: {
                type: Type.OBJECT,
                properties: {
                  hook: { type: Type.STRING },
                  body: { type: Type.STRING },
                  cta: { type: Type.STRING }
                },
                required: ["hook", "body", "cta"]
              },
              adAdvisor: {
                type: Type.OBJECT,
                properties: {
                  status: { type: Type.STRING, enum: ["GOOD", "BAD", "NEUTRAL"] },
                  action: { type: Type.STRING },
                  message: { type: Type.STRING }
                },
                required: ["status", "action", "message"]
              }
            },
            required: ["productName", "usageAreas", "competitionScore", "marketSaturation", "verdict", "reasoning", "targetAudience", "metaTargeting", "metaAdCopy", "adAdvisor"]
          }
        }
      });

      const text = response.text;
      if (!text) throw new Error("Modelden boş yanıt döndü.");
      
      return JSON.parse(text);
    } catch (error: any) {
      console.error("Gemini API Hatası:", error);
      throw new Error(error.message || "Analiz sırasında teknik bir sorun oluştu.");
    }
  }
}