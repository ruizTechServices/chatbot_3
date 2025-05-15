"use client"
// Modular Chatbot Component with multiple provider support
import React, { useState, useRef, useEffect } from 'react';
import { useChatContext, Message, LLMProvider } from './useChatContext';

// Message bubble component (modular for both user and bot)
const MessageBubble = ({ message, isUser }: { message: string; isUser: boolean }) => (
  <div
    className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}
  >
    <div
      className={`rounded-lg px-4 py-2 max-w-xs break-words shadow-md text-sm md:text-base '
        ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'}`}
    >
      {message}
    </div>
  </div>
);

// Model Selector component
interface ModelSelectorProps {
  providers: LLMProvider[];
  currentProvider: string;
  currentModel: string;
  onProviderChange: (providerId: string) => void;
  onModelChange: (modelId: string) => void;
  disabled: boolean;
}

const ModelSelector = ({
  providers,
  currentProvider,
  currentModel,
  onProviderChange,
  onModelChange,
  disabled
}: ModelSelectorProps) => {
  // Find current provider's available models
  const currentProviderData = providers.find(p => p.providerId === currentProvider);
  const availableModels = currentProviderData?.models || [];
  
  return (
    <div className="flex flex-col md:flex-row gap-2 p-2 bg-gray-100 border-b">
      <div className="flex flex-1 items-center">
        <label htmlFor="provider-select" className="mr-2 text-sm font-medium text-gray-700">Provider:</label>
        <select
          id="provider-select"
          className="flex-1 py-1 px-2 border rounded-md text-sm bg-white"
          value={currentProvider}
          onChange={(e) => onProviderChange(e.target.value)}
          disabled={disabled}
        >
          {providers.map((provider) => (
            <option key={provider.providerId} value={provider.providerId}>
              {provider.providerName}
            </option>
          ))}
        </select>
      </div>
      
      <div className="flex flex-1 items-center">
        <label htmlFor="model-select" className="mr-2 text-sm font-medium text-gray-700">Model:</label>
        <select
          id="model-select"
          className="flex-1 py-1 px-2 border rounded-md text-sm bg-white"
          value={currentModel}
          onChange={(e) => onModelChange(e.target.value)}
          disabled={disabled || availableModels.length === 0}
        >
          {availableModels.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

// Main Chatbot UI
const Chatbot = () => {
  const [input, setInput] = useState('');
  const chatContextEndRef = useRef<HTMLDivElement | null>(null);

  // LLM handler: calls our provider-agnostic API endpoint
  const fetchLLMResponse = async (context: Message[], requestOptions: any): Promise<Message> => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        provider: requestOptions.provider,
        model: requestOptions.model,
        chatContext: context,
        temperature: requestOptions.temperature,
        maxTokens: requestOptions.maxTokens,
      }),
    });
    
    const data = await response.json();
    if (data.error) throw new Error(data.error);
    return data;
  };

  // Use enhanced chat context hook with provider support
  const {
    chatContext,
    sendMessage,
    loading,
    error,
    providers,
    currentProvider,
    setCurrentProvider,
    currentModel,
    setCurrentModel
  } = useChatContext({
    initialContext: [
      { sender: 'bot', text: 'Hello! How can I help you today? You can select different AI providers and models above.' },
    ],
    defaultProvider: 'openai',
    defaultModel: 'gpt-3.5-turbo',
    onLLMResponse: fetchLLMResponse,
  });

  // Handle provider change
  const handleProviderChange = (providerId: string) => {
    setCurrentProvider(providerId);
    // Set first model as default when changing provider
    const newProviderData = providers.find(p => p.providerId === providerId);
    if (newProviderData && newProviderData.models.length > 0) {
      setCurrentModel(newProviderData.models[0]);
    }
  };

  // Scroll to bottom when chat context updates
  useEffect(() => {
    chatContextEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatContext]);

  // Handle user input submission
  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;
    await sendMessage(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full max-h-[80vh] w-full max-w-lg mx-auto border rounded-lg shadow-lg bg-white overflow-hidden">
      {/* Model selector */}
      <ModelSelector
        providers={providers}
        currentProvider={currentProvider}
        currentModel={currentModel}
        onProviderChange={handleProviderChange}
        onModelChange={setCurrentModel}
        disabled={loading}
      />

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {chatContext.map((msg, idx) => (
          <MessageBubble
            key={idx}
            message={msg.text}
            isUser={msg.sender === 'user'}
          />
        ))}
        <div ref={chatContextEndRef} />
      </div>
      
      {/* Input area */}
      <form onSubmit={handleSend} className="flex items-center p-2 bg-white border-t">
        <input
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-label="Message input"
          disabled={loading}
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors"
          disabled={loading}
        >
          {loading ? '...' : 'Send'}
        </button>
      </form>
      {error && <div className="p-2 text-xs text-red-600 bg-red-50 border-t">{error}</div>}
    </div>
  );
};

export default Chatbot;
