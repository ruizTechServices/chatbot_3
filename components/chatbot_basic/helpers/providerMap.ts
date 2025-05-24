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
      'gpt-3.5-turbo',        
      'gpt-3.5-turbo-0125',   
      'gpt-3.5-turbo-1106',   
      
      // Standard Tier - Balanced performance and cost
      'gpt-4o-mini',          
      'gpt-4.1-nano',         
      'gpt-4.1-mini',         
      
      // Premium Tier - Most capable models
      'gpt-4',                
      'gpt-4-turbo',          
      // 'gpt-4-turbo-preview',  
      // 'gpt-4-0613',           
      // 'gpt-4-32k',            
      // 'gpt-4-32k-0613',       
      // 'gpt-4.1',              
      
      // Reasoning Models - For complex multi-step problems
      // 'o4-mini',              
      // 'o3',                   
    ],
    requiresApiKey: true,
  },
  {
    providerId: 'anthropic',
    providerName: 'Anthropic',
    models: [
      // Basic Tier - Fast and cost-effective
      'claude-3-haiku-20240307',   
      'claude-3-5-haiku-latest',   
      
      // Standard Tier - Balanced performance
      'claude-3-sonnet-20240229',  
      'claude-3-5-sonnet-20241022', 
      'claude-3-5-sonnet-latest',  
      // 'claude-3.7-sonnet',         
      
      // // Premium Tier - Most intelligent models
      // 'claude-3-opus-20240229',    
      // 'claude-4-opus',             
      // 'claude-4-sonnet',           
    ],
    requiresApiKey: true,
  },
  // Add more providers here
];

export function getProviderById(providerId: string): LLMProvider | undefined {
  return LLM_PROVIDERS.find(p => p.providerId === providerId);
}
