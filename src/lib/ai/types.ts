import { CreateBusinessInput, ServiceItem, ThemeColor } from "../types";

export interface AIGeneratedContent {
  tagline: string;
  about: string;
  services_list: ServiceItem[];
  highlight_chips: string[];
  theme_color: ThemeColor;
}

export interface AIProviderResponse {
  success: boolean;
  content?: AIGeneratedContent;
  providerName: "OpenAI" | "Anthropic" | "Gemini" | "LocalFallback";
  error?: string;
}

export interface AIProvider {
  name: "OpenAI" | "Anthropic" | "Gemini" | "LocalFallback";
  isConfigured(): boolean;
  generate(input: CreateBusinessInput): Promise<AIProviderResponse>;
}
