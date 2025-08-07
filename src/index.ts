import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListPromptsRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { getWeather } from "./tools/weather.js";
import { searchFlight } from "./tools/flight.js";

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
    console.log("🛠️ ListTools request received");
  return {
    tools: [
      {
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
      },
      {
        name: 'search_flights',
        description: 'Search for avaliable flight between two cities',
        inputSchema: {
          type: 'object',
          properties: {
            from: {
              type: 'string',
              description: 'Deaprture city'
            },
            to: {
              type: 'string',
              description: 'Destination city'
            },
            date: {
              type: 'string',
              description: 'Departure date (YYYY-MM-DD)'
            }
          },
          required: ['from','to','date']
        }
      }
    ],
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
        case 'search_flight':
          return await searchFlight(args as any);
        default:
            throw new Error(`Tool ${name} not found`);
    }
});

async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  //console.log("Server started. Waiting for requests...");
}

main().catch((error) => {
  console.error("Error starting server:", error);
  process.exit(1);
}); 