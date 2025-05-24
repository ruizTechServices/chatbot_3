/**
 * providerMap Helper
 * Maps providerId to provider config and models. Extend as needed for new LLMs.
 */
import { LLMProvider } from '../types/chat';

export const LLM_PROVIDERS: LLMProvider[] = [
  {
    providerId: 'openai',
    providerName: 'OpenAI',
    models: [
      // Basic Tier - Most cost-effective models
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', description: 'Fast and cost-effective model for general tasks.' },
      { id: 'gpt-3.5-turbo-0125', name: 'GPT-3.5 Turbo 0125', description: 'Updated version of GPT-3.5 Turbo.' },
      { id: 'gpt-3.5-turbo-1106', name: 'GPT-3.5 Turbo 1106', description: 'Another version of GPT-3.5 Turbo with function calling improvements.' },
      
      // Standard Tier - Balanced performance and cost
      { id: 'gpt-4o-mini', name: 'GPT-4o Mini', description: 'Most cost-effective GPT-4 level model.' },
      { id: 'gpt-4.1-nano', name: 'GPT-4.1 Nano', description: 'A smaller, faster GPT-4 model.' },
      { id: 'gpt-4.1-mini', name: 'GPT-4.1 Mini', description: 'A compact and efficient GPT-4 model.' },
      
      // Premium Tier - Most capable models
      { id: 'gpt-4', name: 'GPT-4', description: 'Powerful model for complex tasks.' },
      { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', description: 'High-performance model with a large context window.' },
      // { id: 'gpt-4-turbo-preview', name: 'GPT-4 Turbo Preview', description: 'Preview version of GPT-4 Turbo.' },
      // { id: 'gpt-4-0613', name: 'GPT-4 0613', description: 'Version of GPT-4 from June 2023.' },
      // { id: 'gpt-4-32k', name: 'GPT-4 32k', description: 'GPT-4 with a 32k context window.' },
      // { id: 'gpt-4-32k-0613', name: 'GPT-4 32k 0613', description: 'Version of GPT-4 32k from June 2023.' },
      // { id: 'gpt-4.1', name: 'GPT-4.1', description: 'An advanced iteration of GPT-4.' },
      
      // Reasoning Models - For complex multi-step problems
      // { id: 'o4-mini', name: 'O4 Mini', description: 'A model focused on reasoning tasks.' },
      // { id: 'o3', name: 'O3', description: 'Another reasoning-focused model.' },
    ],
    requiresApiKey: true,
  },
  {
    providerId: 'anthropic',
    providerName: 'Anthropic',
    models: [
      // Basic Tier - Fast and cost-effective
      { id: 'claude-3-haiku-20240307', name: 'Claude 3 Haiku', description: 'Fastest and most compact model for near-instant responsiveness.' },
      { id: 'claude-3-5-haiku-latest', name: 'Claude 3.5 Haiku (latest)', description: 'Latest version of Claude 3 Haiku.' },
      
      // Standard Tier - Balanced performance
      { id: 'claude-3-sonnet-20240229', name: 'Claude 3 Sonnet', description: 'Ideal balance of intelligence and speed for enterprise workloads.' },
      { id: 'claude-3-5-sonnet-20241022', name: 'Claude 3.5 Sonnet (20241022)', description: 'Version of Claude 3.5 Sonnet from October 2022.' },
      { id: 'claude-3-5-sonnet-latest', name: 'Claude 3.5 Sonnet (latest)', description: 'Latest version of Claude 3.5 Sonnet.' },
      // { id: 'claude-3.7-sonnet', name: 'Claude 3.7 Sonnet', description: 'An upcoming Sonnet model.' },
      
      // // Premium Tier - Most intelligent models
      // { id: 'claude-3-opus-20240229', name: 'Claude 3 Opus', description: 'Most powerful model for highly complex tasks.' },
      // { id: 'claude-4-opus', name: 'Claude 4 Opus', description: 'Next generation Opus model.' },
      // { id: 'claude-4-sonnet', name: 'Claude 4 Sonnet', description: 'Next generation Sonnet model.' },
    ],
    requiresApiKey: true,
  },
  // Add more providers here
];

export function getProviderById(providerId: string): LLMProvider | undefined {
  return LLM_PROVIDERS.find(p => p.providerId === providerId);
}
