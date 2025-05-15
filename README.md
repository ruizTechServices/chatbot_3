# 24Hour AI

An AI chatbot service providing access to multiple language models for 24 hours straight.

## Features

- Access to multiple LLMs for a fixed period (24 hours)
- Modern, responsive chat interface
- User authentication via Clerk
- Simple pricing ($1 per 24-hour access period)
- Modular architecture for multiple LLM providers (OpenAI, Anthropic, etc.)

## Tech Stack

- Next.js 15.3
- React 19
- TypeScript
- Tailwind CSS 4
- Clerk for authentication

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn package manager
- API keys for the LLM providers you want to use

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables (see `.env.local.example`)
   ```
   cp .env.local.example .env.local
   ```
   Then add your API keys to the `.env.local` file
4. Run the development server:
   ```
   npm run dev
   ```

## Project Structure

- `/app`: Next.js app router pages
- `/components`: Reusable React components
- `/app/api/chat`: Backend API for LLM providers
- `/public`: Static assets

## LLM Provider System

The application uses a modular architecture to support multiple LLM providers:

### Provider Registry

All LLM providers are defined in `app/api/chat/llmProviders.ts`. The registry exports:

- A configuration object with provider details
- Handler functions for each provider
- Utility functions for provider validation

### Adding a New Provider

1. Add the provider's API key to your `.env.local` file (format: `PROVIDER_API_KEY`)
2. Create a handler function in `llmProviders.ts` following this pattern:
   ```typescript
   async function handleNewProvider({ model, chatContext, ...options }): Promise<LLMResponse> {
     // Implementation here
   }
   ```
3. Add the provider to the `LLM_PROVIDERS` registry in the same file:
   ```typescript
   export const LLM_PROVIDERS = {
     // Existing providers...
     newProvider: {
       name: "New Provider",
       models: ["model-1", "model-2"],
       handler: handleNewProvider,
       requiresApiKey: true,
     }
   };
   ```

### Provider API Format

Each provider handler is responsible for:
- Converting generic message format to the provider's required format
- Making API calls to the provider
- Handling provider-specific errors
- Returning responses in a standardized format

## Deployment

This application is configured for deployment on platforms like Vercel or Netlify. Make sure to set all required environment variables in your deployment platform.

## Legal

- [Terms of Service](/app/terms)
- [Privacy Policy](/app/privacy)
