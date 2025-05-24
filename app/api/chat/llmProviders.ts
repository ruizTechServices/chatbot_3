import { Message } from '@/components/useChatContext';

// Define standardized response type
export interface LLMResponse {
  sender: 'bot';
  text: string;
}

// Define interface for provider handlers
export interface LLMHandlerParams {
  model: string;
  chatContext: Message[];
  temperature?: number;
  maxTokens?: number;
}

// Provider registry types
export interface LLMProvider {
  name: string;
  models: string[];
  handler: (params: LLMHandlerParams) => Promise<LLMResponse>;
  requiresApiKey: boolean;
}

export interface LLMProviderRegistry {
  [providerId: string]: LLMProvider;
}

/**
 * Handle OpenAI API requests
 */
async function handleOpenAI({ model, chatContext, temperature = 0.7, maxTokens = 256 }: LLMHandlerParams): Promise<LLMResponse> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('Missing OpenAI API key in server environment');
  }

  // Convert generic messages to OpenAI format
  const openaiMessages = chatContext.map((m: Message) => ({
    role: m.sender === 'user' ? 'user' : 'assistant',
    content: m.text,
  }));

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: openaiMessages,
        temperature,
        max_tokens: maxTokens,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || 'OpenAI API error');
    }

    const data = await response.json();
    const botText = data.choices?.[0]?.message?.content || 'No response.';
    return { sender: 'bot', text: botText };
  } catch (error: any) {
    throw new Error(error.message || 'Error calling OpenAI API');
  }
}

/**
 * Handle Anthropic API requests
 */
async function handleAnthropic({ model, chatContext, temperature = 0.7, maxTokens = 256 }: LLMHandlerParams): Promise<LLMResponse> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('Missing Anthropic API key in server environment');
  }

  // Prepare messages for Anthropic's format
  // The format slightly differs from OpenAI
  const messages = chatContext.map((m: Message) => ({
    role: m.sender === 'user' ? 'user' : 'assistant',
    content: m.text,
  }));

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: maxTokens,
        temperature,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || 'Anthropic API error');
    }

    const data = await response.json();
    const botText = data.content?.[0]?.text || 'No response.';
    return { sender: 'bot', text: botText };
  } catch (error: any) {
    throw new Error(error.message || 'Error calling Anthropic API');
  }
}

/**
 * LLM Provider Registry
 * Add new providers here with their supported models and handler functions
 * Models are organized by tier for pricing considerations
 */
export const LLM_PROVIDERS: LLMProviderRegistry = {
  openai: {
    name: 'OpenAI',
    models: [
      // Basic Tier - Most cost-effective models
      'gpt-3.5-turbo',        // $0.50 per 1M input tokens, $1.50 per 1M output tokens
      'gpt-3.5-turbo-0125',   // Latest GPT-3.5 Turbo model
      'gpt-3.5-turbo-1106',   // Previous stable version
      
      // Standard Tier - Balanced performance and cost
      'gpt-4o-mini',          // Most cost-effective GPT-4 level model
      'gpt-4.1-nano',         // Fastest, most cost-effective for low-latency
      'gpt-4.1-mini',         // Affordable model balancing speed and intelligence
      
      // Premium Tier - Most capable models
      'gpt-4',                // $30 per 1M input tokens, $60 per 1M output tokens
      'gpt-4-turbo',          // Latest GPT-4 Turbo with vision capabilities
      'gpt-4-turbo-preview',  // Preview of GPT-4 Turbo
      'gpt-4-0613',           // Stable GPT-4 version
      'gpt-4-32k',            // Extended context window (32K tokens)
      'gpt-4-32k-0613',       // Stable 32K context version
      'gpt-4.1',              // Smartest model for complex tasks
      
      // Reasoning Models - For complex multi-step problems
      'o4-mini',              // Cost-efficient reasoning model
      'o3',                   // Most powerful reasoning model (when available)
    ],
    handler: handleOpenAI,
    requiresApiKey: true,
  },
  anthropic: {
    name: 'Anthropic',
    models: [
      // Basic Tier - Fast and cost-effective
      'claude-3-haiku-20240307',   // $0.25 per 1M input, $1.25 per 1M output (Legacy)
      'claude-3-5-haiku-latest',   // $0.80 per 1M input, $4 per 1M output
      
      // Standard Tier - Balanced performance
      'claude-3-sonnet-20240229',  // Legacy Sonnet model
      'claude-3-5-sonnet-20241022', // Previous Sonnet 3.5 version
      'claude-3-5-sonnet-latest',  // Latest Sonnet 3.5
      'claude-3.7-sonnet',         // $3 per 1M input, $15 per 1M output
      
      // Premium Tier - Most intelligent models
      'claude-3-opus-20240229',    // $15 per 1M input, $75 per 1M output (Legacy)
      'claude-4-opus',             // $15 per 1M input, $75 per 1M output (Latest)
      'claude-4-sonnet',           // $3 per 1M input, $15 per 1M output
    ],
    handler: handleAnthropic,
    requiresApiKey: true,
  },
};

/**
 * Get all available providers and models
 * Returns an array of { providerId, providerName, models }
 */
export function getAvailableProviders() {
  return Object.entries(LLM_PROVIDERS).map(([providerId, provider]) => ({
    providerId,
    providerName: provider.name,
    models: provider.models,
  }));
}

/**
 * Validate that a provider and model combination exists
 */
export function validateProviderAndModel(providerId: string, modelId: string): boolean {
  const provider = LLM_PROVIDERS[providerId];
  if (!provider) return false;
  return provider.models.includes(modelId);
}

/**
 * How to add a new provider:
 * 1. Create a handler function that implements the LLMHandlerParams interface
 * 2. Add the provider to the LLM_PROVIDERS registry with supported models
 * 3. Add any required environment variables (.env.local)
 */
