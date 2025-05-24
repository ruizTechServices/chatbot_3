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

### Extending Frontend LLM Support

To add new LLM providers or new models to existing providers on the frontend, you primarily need to modify the `components/chatbot_basic/helpers/providerMap.ts` file. This file contains the `LLM_PROVIDERS` array, which dictates what options are available in the chatbot's model selection UI.

The `LLM_PROVIDERS` array is a list of provider objects. Each provider object has the following structure:

*   `providerId`: A unique string identifier for the provider (e.g., `'openai'`, `'anthropic'`).
*   `providerName`: A string used for displaying the provider's name in the UI (e.g., `'OpenAI'`, `'Anthropic'`).
*   `models`: An array of model objects that this provider offers.
*   `requiresApiKey`: A boolean indicating if the provider needs an API key. While primarily a backend concern, it's part of the shared data structure.

Each model object within the `models` array must have the following fields:

*   `id`: A unique string identifier for the model within that provider (e.g., `'gpt-4o-mini'`, `'claude-3-opus-20240229'`). This is the value sent to the backend.
*   `name`: A string used for displaying the model's name in the UI (e.g., `'GPT-4o Mini'`, `'Claude 3 Opus'`).
*   `description` (optional): A string that provides a short description of the model. This will be displayed as a tooltip in the model selection dropdown.

**Example: Adding a new provider**

```typescript
// In components/chatbot_basic/helpers/providerMap.ts
export const LLM_PROVIDERS: LLMProvider[] = [
  // ... existing providers
  {
    providerId: 'new-provider',
    providerName: 'New AI Provider',
    models: [
      { id: 'model-x', name: 'Model X', description: 'The latest and greatest Model X.' },
      { id: 'model-y-beta', name: 'Model Y (Beta)', description: 'A beta version of Model Y.' },
    ],
    requiresApiKey: true, // Or false, depending on the provider
  },
];
```

**Example: Adding a new model to an existing provider**

```typescript
// In components/chatbot_basic/helpers/providerMap.ts
// Find the provider you want to update, for example, OpenAI:
{
  providerId: 'openai',
  providerName: 'OpenAI',
  models: [
    // ... existing OpenAI models
    { id: 'gpt-5-preview', name: 'GPT-5 Preview', description: 'An early look at GPT-5.' },
  ],
  requiresApiKey: true,
},
// ... other providers
```

**Important Note:**

Adding a new provider or model to the frontend configuration makes it visible in the UI. However, for the chatbot to actually *use* the new provider or model, corresponding backend support must also be implemented. This includes updating the backend's provider registry, request handling logic, and API key management for the new options. Refer to the "Adding a New Provider" section under "LLM Provider System" for backend modification details.

## Deployment

This application is configured for deployment on platforms like Vercel or Netlify. Make sure to set all required environment variables in your deployment platform.

## Legal

- [Terms of Service](/app/terms)
- [Privacy Policy](/app/privacy)
