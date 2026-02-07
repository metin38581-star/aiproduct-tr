
import { GoogleGenAI, Type } from "@google/genai";
import { ProductAnalysis } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async analyzeProductImage(base64Data: string, mimeType: string): Promise<ProductAnalysis> {
    // Verinin sadece base64 kısmını al
    const cleanBase64 = base64Data.includes(',') ? base64Data.split(',')[1] : base64Data;
    
    // Karmaşık analizler için Gemini 3 Pro daha kararlıdır
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-pro-preview',
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
              text: `Sen profesyonel bir e-ticaret ve dropshipping uzmanısın. Bu görseldeki ürünü analiz et.
              
              Gereksinimler:
              1. Ürünün adını belirle.
              2. Kullanım alanlarını liste halinde yaz.
              3. Türkiye pazarı için rekabet puanı ver (0-100, 100 en zor).
              4. Pazar doygunluğunu (Düşük, Orta, Yüksek) olarak belirle.
              5. 'SAT' veya 'SATMA' kararı ver.
              6. Kararının nedenini açıkla.
              7. Hedef kitle segmentlerini belirle.
              
              PRO ÖZELLİKLER (ZORUNLU):
              8. Meta reklamları için ilgi alanları (targeting interests).
              9. Profesyonel bir Meta reklam metni (başlık, gövde, CTA).
              10. Bir reklam danışmanı gibi 'Scale up' veya 'Change creative' tavsiyesi ver.
              
              Yanıtı sadece JSON formatında ver.`
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
    if (!text) throw new Error("Modelden yanıt alınamadı.");
    
    return JSON.parse(text);
  }
}
