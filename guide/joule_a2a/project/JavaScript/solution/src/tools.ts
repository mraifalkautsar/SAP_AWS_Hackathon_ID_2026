import { RPT1Client } from "./rptClient.js";
import { OrchestrationClient } from "@sap-ai-sdk/orchestration";
import type { RPT1Payload } from "./types.js";

const rpt1Client = new RPT1Client();

export async function callRPT1Tool(payload: RPT1Payload): Promise<string> {
  try {
    const response = await rpt1Client.predictWithoutSchema(payload);
    return JSON.stringify(response, null, 2);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ RPT-1 call failed:", errorMessage);
    return `Error calling RPT-1: ${errorMessage}`;
  }
}

export async function callGroundingServiceTool(user_question: string): Promise<string> {
  // Grounding is not activated for this hackathon — return a placeholder, matching the Python solution.
  return `Grounding service not yet configured. Query received: ${user_question}`;
}

const webSearchClient = new OrchestrationClient(
  {
    promptTemplating: {
      model: {
        name: "sonar-pro",
        params: {
          temperature: 0.2,
        },
      },
      prompt: {
        template: [
          {
            role: "system",
            content:
              "You are a web search assistant specializing in criminal intelligence. Search for accurate, recent information and always provide source citations with URLs and dates.",
          },
          { role: "user", content: "{{?search_query}}" },
        ],
      },
    },
  },
  { resourceGroup: process.env.RESOURCE_GROUP },
);

export async function callSonarProSearchTool(search_query: string): Promise<string> {
  try {
    const response = await webSearchClient.chatCompletion({
      placeholderValues: { search_query },
    });
    return response.getContent() ?? "No search results found";
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ Sonar-pro web search failed:", errorMessage);
    if (error instanceof Error && error.stack) console.error(error.stack);
    return `Error calling sonar-pro web search: ${errorMessage}`;
  }
}
