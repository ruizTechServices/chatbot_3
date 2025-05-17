/**
 * providerMap Helper
 * Maps providerId to provider config and models. Extend as needed for new LLMs.
 */
import { LLMProvider } from '../types/chat';

export const LLM_PROVIDERS: LLMProvider[] = [
  {
    providerId: 'openai',
    providerName: 'OpenAI',
    models: ['gpt-3.5-turbo', 'gpt-4'],
    requiresApiKey: true,
  },
  {
    providerId: 'anthropic',
    providerName: 'Anthropic',
    models: ['claude-instant', 'claude-2'],
    requiresApiKey: true,
  },
  // Add more providers here
];

export function getProviderById(providerId: string): LLMProvider | undefined {
  return LLM_PROVIDERS.find(p => p.providerId === providerId);
}
