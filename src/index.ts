import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    CallToolRequestSchema,
  ListPromptsRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { getWeather } from "./tools/weather";

const server = new Server(
  {
    name: "mcp-weather-travel-assistant",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
      resources: {},
      prompts: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [{
        name: 'get_weather',
        description: 'Get current weather and forecast for a city',
        inputSchema: {
          type: 'object',
          properties: {
            city: { type: 'string', description: 'City name' },
            country: { type: 'string', description: 'Country code (optional)' },
          },
          required: ['city']
        }
    }],
  };
});

server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [],
  };
});

server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: [],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, args } = request.params;
    
    if(!args) throw new Error("Tool name is required");

    switch (name) {
        case 'get_weather':
            return await getWeather(args as any);
        default:
            throw new Error(`Tool ${name} not found`);
    }
});

async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("Server started. Waiting for requests...");
}

main().catch((error) => {
  console.error("Error starting server:", error);
  process.exit(1);
}); 