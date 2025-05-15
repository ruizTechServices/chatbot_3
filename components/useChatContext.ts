import { useState, useEffect } from 'react';

export type Message = { sender: 'user' | 'bot'; text: string };

// Provider and model types
export interface LLMProvider {
  providerId: string;
  providerName: string;
  models: string[];
}

interface LLMRequestOptions {
  provider: string;
  model: string;
  temperature?: number;
  maxTokens?: number;
}

interface UseChatContextOptions {
  initialContext?: Message[];
  defaultProvider?: string;
  defaultModel?: string;
  onLLMResponse?: (
    context: Message[],
    requestOptions: LLMRequestOptions
  ) => Promise<Message>;
}

export function useChatContext(options?: UseChatContextOptions) {
  const [chatContext, setChatContext] = useState<Message[]>(options?.initialContext || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [providers, setProviders] = useState<LLMProvider[]>([]);
  const [currentProvider, setCurrentProvider] = useState<string>(options?.defaultProvider || 'openai');
  const [currentModel, setCurrentModel] = useState<string>(options?.defaultModel || 'gpt-3.5-turbo');
  
  // Fetch available providers and models on mount
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch('/api/chat');
        if (!response.ok) throw new Error('Failed to fetch providers');
        const data = await response.json();
        if (data.providers && Array.isArray(data.providers)) {
          setProviders(data.providers);
        }
      } catch (err: any) {
        console.error('Error fetching providers:', err);
      }
    };
    
    fetchProviders();
  }, []);

  // Send a user message and get LLM response if handler provided
  const sendMessage = async (
    userText: string,
    requestOptions?: Partial<LLMRequestOptions>
  ) => {
    setError(null);
    const userMsg: Message = { sender: 'user', text: userText };
    const updatedContext = [...chatContext, userMsg];
    setChatContext(updatedContext);
    
    if (options?.onLLMResponse) {
      setLoading(true);
      try {
        // Combine defaults with any overrides
        const llmOptions: LLMRequestOptions = {
          provider: requestOptions?.provider || currentProvider,
          model: requestOptions?.model || currentModel,
          temperature: requestOptions?.temperature,
          maxTokens: requestOptions?.maxTokens
        };
        
        const botMsg = await options.onLLMResponse(updatedContext, llmOptions);
        setChatContext((ctx) => [...ctx, botMsg]);
      } catch (err: any) {
        setError(err?.message || 'Error fetching LLM response');
      } finally {
        setLoading(false);
      }
    }
  };

  return { 
    chatContext, 
    setChatContext, 
    sendMessage, 
    loading, 
    error, 
    providers,
    currentProvider,
    setCurrentProvider,
    currentModel,
    setCurrentModel
  };
}
