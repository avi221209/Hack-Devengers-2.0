import { executeAIGeneration } from "@/lib/ai/providerManager";
import { CreateBusinessInput } from "@/lib/types";

describe("AI Provider Failover Chain Unit Test", () => {
  const sampleInput: CreateBusinessInput = {
    name: "Sai Krupa Auto Garage",
    category: "Mechanic/Repair",
    services: "Full Servicing, Oil Change, Puncture Fitting",
    address: "Station Road, Kolhapur",
    whatsapp_number: "9823011223",
    timings: "9:00 AM – 8:30 PM",
  };

  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    // Set dummy API keys to force remote providers to be evaluated
    process.env.OPENAI_API_KEY = "sk-dummy-openai-key";
    process.env.ANTHROPIC_API_KEY = "sk-ant-dummy-anthropic-key";
    process.env.GEMINI_API_KEY = "dummy-gemini-key";

    // Mock global fetch to fail for remote APIs
    global.fetch = jest.fn().mockImplementation((url: string) => {
      if (url.includes("openai.com") || url.includes("anthropic.com") || url.includes("googleapis.com")) {
        return Promise.resolve({
          ok: false,
          status: 500,
          json: async () => ({ error: "Simulated Provider API Failure" }),
        } as Response);
      }
      return Promise.reject(new Error("Unexpected fetch URL"));
    });
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.restoreAllMocks();
  });

  it("should gracefully failover down to LocalFallback Provider when all external APIs fail", async () => {
    const result = await executeAIGeneration(sampleInput);

    expect(result).toBeDefined();
    expect(result.providerUsed).toBe("LocalFallback");
    expect(result.content).toBeDefined();
    expect(result.content.tagline).toBeDefined();
    expect(result.content.about).toBeDefined();
    expect(result.content.services_list.length).toBeGreaterThan(0);
    expect(result.content.highlight_chips.length).toBeGreaterThan(0);
  });
});
