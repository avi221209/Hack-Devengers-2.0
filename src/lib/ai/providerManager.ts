import { CreateBusinessInput } from "../types";
import { AIGeneratedContent, AIProvider, AIProviderResponse } from "./types";
import { generateLocalFallback } from "../ai";
import { sanitizeAndValidateAIContent } from "./safetyValidator";

function buildPrompt(input: CreateBusinessInput): string {
  const langPrompt =
    input.language === "hi"
      ? "Write in warm, attractive Hindi (in Devanagari script) or natural Hinglish as appropriate for Indian customers."
      : input.language === "mr"
      ? "Write in warm, professional Marathi (in Devanagari script) or natural Marathish as appropriate for Maharashtra customers."
      : "Write in warm, professional English tailored for Indian local business customers.";

  return `You are an expert copywriter for micro-businesses in India (tailors, tuition classes, mechanics, home kitchens, salons, clinics, repair shops).
Create high-converting, trustworthy, and authentic copy.

Business Input:
- Name: ${input.name}
- Category: ${input.category}
- Services: ${input.services}
- Address: ${input.address} ${input.city ? ", " + input.city : ""} ${input.state ? ", " + input.state : ""}
- Timings: ${input.timings}
- Price range: ${input.price_range || "Not specified"}
- Description: ${input.raw_description || "None"}

Language Instructions: ${langPrompt}

CRITICAL RULES:
1. Do NOT invent certifications, awards, medical recovery guarantees, or unsupplied prices.
2. Return ONLY a valid JSON object strictly matching this schema:
{
  "tagline": "Crisp 8-14 word tagline emphasizing trust & quality",
  "about": "Warm 2-3 sentence description emphasizing dedication & hospitality",
  "services_list": [
    {
      "id": "s1",
      "name": "Service Name",
      "description": "Short explanation",
      "price": "Price if provided or 'Contact for pricing'"
    }
  ],
  "highlight_chips": ["Badge 1", "Badge 2", "Badge 3", "Badge 4"],
  "theme_color": "terracotta" | "mustard" | "forest" | "clean" | "warm"
}`;
}

export class OpenAIProvider implements AIProvider {
  name = "OpenAI" as const;

  isConfigured(): boolean {
    const key = process.env.OPENAI_API_KEY;
    return Boolean(key && key.startsWith("sk-"));
  }

  async generate(input: CreateBusinessInput): Promise<AIProviderResponse> {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You output pure structured JSON for Indian business storefronts." },
            { role: "user", content: buildPrompt(input) },
          ],
          response_format: { type: "json_object" },
          temperature: 0.7,
        }),
      });

      if (!res.ok) {
        throw new Error(`OpenAI HTTP ${res.status}`);
      }

      const data = await res.json();
      const contentStr = data.choices?.[0]?.message?.content;
      if (!contentStr) throw new Error("Empty OpenAI response");

      const parsed: AIGeneratedContent = JSON.parse(contentStr);
      return {
        success: true,
        providerName: this.name,
        content: sanitizeAndValidateAIContent(parsed, input),
      };
    } catch (err: any) {
      return { success: false, providerName: this.name, error: err.message };
    }
  }
}

export class AnthropicProvider implements AIProvider {
  name = "Anthropic" as const;

  isConfigured(): boolean {
    const key = process.env.ANTHROPIC_API_KEY;
    return Boolean(key && key.startsWith("sk-ant-"));
  }

  async generate(input: CreateBusinessInput): Promise<AIProviderResponse> {
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.ANTHROPIC_API_KEY!,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-3-haiku-20240307",
          max_tokens: 1000,
          system: "You output pure JSON only.",
          messages: [{ role: "user", content: buildPrompt(input) }],
        }),
      });

      if (!res.ok) throw new Error(`Anthropic HTTP ${res.status}`);

      const data = await res.json();
      const text = data.content?.[0]?.text;
      if (!text) throw new Error("Empty Anthropic response");

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("Could not parse JSON from Anthropic response");

      const parsed: AIGeneratedContent = JSON.parse(jsonMatch[0]);
      return {
        success: true,
        providerName: this.name,
        content: sanitizeAndValidateAIContent(parsed, input),
      };
    } catch (err: any) {
      return { success: false, providerName: this.name, error: err.message };
    }
  }
}

export class GeminiProvider implements AIProvider {
  name = "Gemini" as const;

  isConfigured(): boolean {
    return Boolean(process.env.GEMINI_API_KEY);
  }

  async generate(input: CreateBusinessInput): Promise<AIProviderResponse> {
    try {
      const key = process.env.GEMINI_API_KEY;
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: buildPrompt(input) + "\nOutput strictly pure JSON format only." }] }],
          }),
        }
      );

      if (!res.ok) throw new Error(`Gemini HTTP ${res.status}`);

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error("Empty Gemini response");

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("Could not parse JSON from Gemini response");

      const parsed: AIGeneratedContent = JSON.parse(jsonMatch[0]);
      return {
        success: true,
        providerName: this.name,
        content: sanitizeAndValidateAIContent(parsed, input),
      };
    } catch (err: any) {
      return { success: false, providerName: this.name, error: err.message };
    }
  }
}

export class LocalFallbackProvider implements AIProvider {
  name = "LocalFallback" as const;

  isConfigured(): boolean {
    return true; // Always available
  }

  async generate(input: CreateBusinessInput): Promise<AIProviderResponse> {
    const rawContent = generateLocalFallback(input);
    const sanitized = sanitizeAndValidateAIContent(rawContent, input);
    return {
      success: true,
      providerName: this.name,
      content: sanitized,
    };
  }
}

/**
 * Orchestrates AI generation across configured providers with automatic failover chain.
 */
export async function executeAIGeneration(input: CreateBusinessInput): Promise<{
  content: AIGeneratedContent;
  providerUsed: string;
}> {
  const providers: AIProvider[] = [
    new OpenAIProvider(),
    new AnthropicProvider(),
    new GeminiProvider(),
    new LocalFallbackProvider(),
  ];

  for (const provider of providers) {
    if (provider.isConfigured()) {
      const result = await provider.generate(input);
      if (result.success && result.content) {
        return {
          content: result.content,
          providerUsed: result.providerName,
        };
      }
      console.warn(`AI Provider ${provider.name} failed (${result.error}), trying next provider...`);
    }
  }

  // Guaranteed fallback
  const fallback = new LocalFallbackProvider();
  const res = await fallback.generate(input);
  return {
    content: res.content!,
    providerUsed: "LocalFallback",
  };
}
