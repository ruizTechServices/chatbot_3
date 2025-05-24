/**
 * ChatWindow Organism
 * Assembles ModelSelector, MessageList, and InputRow for the chatbot UI.
 */
'use client';
import React, { useState, useEffect } from 'react';
import { useChat } from '../hooks/useChat';
import { MessageList } from '../molecules/MessageList';
import { InputRow } from '../molecules/InputRow';
import { ModelSelector } from '../molecules/ModelSelector';
import { fetchLLMResponse } from '../services/chatService';
import { LLM_PROVIDERS } from '../helpers/providerMap';

export function ChatWindow() {
  const { state, dispatch } = useChat();
  const [input, setInput] = useState('');

  // Initialize providers on mount
  useEffect(() => {
    // Set providers from the constant
    dispatch({
      type: 'SET_PROVIDERS',
      payload: LLM_PROVIDERS
    });

    // Set default provider and model if not set
    if (!state.currentProvider && LLM_PROVIDERS.length > 0) {
      dispatch({
        type: 'SET_PROVIDER',
        payload: LLM_PROVIDERS[0].providerId
      });
      dispatch({
        type: 'SET_MODEL',
        payload: LLM_PROVIDERS[0].models[0]
      });
    }
  }, []);

  const handleProviderChange = (providerId: string) => {
    dispatch({
      type: 'SET_PROVIDER',
      payload: providerId
    });
    
    // Also update the model to the first model of the new provider
    const provider = LLM_PROVIDERS.find(p => p.providerId === providerId);
    if (provider && provider.models.length > 0) {
      dispatch({
        type: 'SET_MODEL',
        payload: provider.models[0]
      });
    }
  };

  const handleModelChange = (modelId: string) => {
    dispatch({
      type: 'SET_MODEL',
      payload: modelId
    });
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    dispatch({ type: 'SEND_MESSAGE', payload: input });
    setInput('');

    try {
      const response = await fetchLLMResponse({
        provider: state.currentProvider,
        model: state.currentModel,
        chatContext: [...state.chatContext, { sender: 'user', text: input }],
      });
      dispatch({ type: 'RECEIVE_MESSAGE', payload: response.text });
    } catch (error: any) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error.message || 'Sorry, there was an error processing your message.'
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-gray-700">
        <ModelSelector
          providers={state.providers}
          currentProvider={state.currentProvider}
          currentModel={state.currentModel}
          onProviderChange={handleProviderChange}
          onModelChange={handleModelChange}
          disabled={state.loading}
        />
      </div>
      <MessageList messages={state.chatContext} />
      <InputRow
        value={input}
        onChange={setInput}
        onSend={handleSend}
        isLoading={state.loading}
      />
      {state.error && (
        <div className="px-4 py-2 text-sm text-red-400 bg-red-900/20">{state.error}</div>
      )}
    </div>
  );
}
