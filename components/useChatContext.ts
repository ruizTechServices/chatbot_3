import { useState, useEffect } from 'react';

export type Message = { sender: 'user' | 'bot'; text: string };

// Local Storage Keys
const LOCAL_STORAGE_PROVIDER_KEY = 'chatProvider';
const LOCAL_STORAGE_MODEL_KEY = 'chatModel';

// Provider and model types
export interface Model { // Assuming Model interface from previous tasks
  id: string;
  name: string;
  description?: string;
}

export interface LLMProvider {
  providerId: string;
  providerName: string;
  models: Model[]; // Updated to use Model interface
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

  const [currentProvider, setCurrentProvider] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const savedProvider = localStorage.getItem(LOCAL_STORAGE_PROVIDER_KEY);
      if (savedProvider) {
        return savedProvider;
      }
    }
    return options?.defaultProvider || 'openai';
  });

  const [currentModel, setCurrentModel] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const savedModel = localStorage.getItem(LOCAL_STORAGE_MODEL_KEY);
      if (savedModel) {
        return savedModel;
      }
    }
    return options?.defaultModel || 'gpt-3.5-turbo';
  });
  
  // Fetch available providers and models on mount, then validate stored selections
  useEffect(() => {
    const fetchProvidersAndValidate = async () => {
      try {
        const response = await fetch('/api/chat');
        if (!response.ok) throw new Error('Failed to fetch providers');
        const data = await response.json();
        
        if (data.providers && Array.isArray(data.providers) && data.providers.length > 0) {
          const fetchedProviders: LLMProvider[] = data.providers;
          setProviders(fetchedProviders);

          let finalProvider = currentProvider;
          let finalModel = currentModel;

          const providerExists = fetchedProviders.some(p => p.providerId === finalProvider);

          if (!providerExists) {
            finalProvider = options?.defaultProvider || fetchedProviders[0].providerId;
            const selectedProviderData = fetchedProviders.find(p => p.providerId === finalProvider);
            if (selectedProviderData && selectedProviderData.models.length > 0) {
              finalModel = options?.defaultModel && selectedProviderData.models.some(m => m.id === options.defaultModel) 
                           ? options.defaultModel 
                           : selectedProviderData.models[0].id;
            } else {
              // Fallback if the default/first provider has no models (unlikely based on structure)
              finalModel = options?.defaultModel || ''; 
            }
          } else {
            const selectedProviderData = fetchedProviders.find(p => p.providerId === finalProvider);
            const modelExists = selectedProviderData?.models.some(m => m.id === finalModel);
            if (!modelExists) {
              if (selectedProviderData && selectedProviderData.models.length > 0) {
                finalModel = options?.defaultModel && selectedProviderData.models.some(m => m.id === options.defaultModel)
                             ? options.defaultModel
                             : selectedProviderData.models[0].id;
              } else {
                finalModel = options?.defaultModel || '';
              }
            }
          }
          setCurrentProvider(finalProvider);
          setCurrentModel(finalModel);
        } else {
          // No providers fetched, potentially clear or set to defaults
          setProviders([]);
          setCurrentProvider(options?.defaultProvider || 'openai');
          setCurrentModel(options?.defaultModel || 'gpt-3.5-turbo');
        }
      } catch (err: any) {
        console.error('Error fetching providers or validating selection:', err);
        // Potentially set to safe defaults if fetch fails
        setProviders([]);
        setCurrentProvider(options?.defaultProvider || 'openai');
        setCurrentModel(options?.defaultModel || 'gpt-3.5-turbo');
      }
    };
    
    fetchProvidersAndValidate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options?.defaultProvider, options?.defaultModel]); // currentProvider and currentModel removed to prevent re-validation loops

  // Save currentProvider to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_PROVIDER_KEY, currentProvider);
    }
  }, [currentProvider]);

  // Save currentModel to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_MODEL_KEY, currentModel);
    }
  }, [currentModel]);

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
