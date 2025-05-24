/**
 * ChatWindow Organism
 * Assembles ModelSelector, MessageList, and InputRow for the chatbot UI.
 */
'use client';
import React, { useRef, useState } from 'react';
import { useChat } from '../hooks/useChat';
import { useScrollBottom } from '../hooks/useScrollBottom';
import { ModelSelector } from '../molecules/ModelSelector';
import { MessageList } from '../molecules/MessageList';
import { InputRow } from '../molecules/InputRow';
import { fetchLLMResponse } from '../services/chatService';
import { LLM_PROVIDERS } from '../helpers/providerMap';

export function ChatWindow() {
  const { state, dispatch } = useChat();
  // Ensure provider/model are always initialized
  React.useEffect(() => {
    if (!state.currentProvider && LLM_PROVIDERS.length > 0) {
      dispatch({ type: 'SET_PROVIDER', payload: LLM_PROVIDERS[0].providerId });
      dispatch({ type: 'SET_MODEL', payload: LLM_PROVIDERS[0].models[0] });
    }
  }, [state.currentProvider, state.currentModel, dispatch]);
  const [input, setInput] = useState('');
  const chatContextEndRef = useRef<HTMLDivElement | null>(null);
  useScrollBottom(chatContextEndRef, [state.chatContext]);

  // Handle provider change
  const handleProviderChange = (providerId: string) => {
    dispatch({ type: 'SET_PROVIDER', payload: providerId });
    const newProviderData = LLM_PROVIDERS.find(p => p.providerId === providerId);
    if (newProviderData && newProviderData.models.length > 0) {
      dispatch({ type: 'SET_MODEL', payload: newProviderData.models[0] });
    }
  };

  // Handle model change
  const handleModelChange = (modelId: string) => {
    dispatch({ type: 'SET_MODEL', payload: modelId });
  };

  // Handle user input submission
  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
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
    } catch (err: any) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[80vh] w-full max-w-lg mx-auto border rounded-lg shadow-lg bg-white overflow-hidden">
      <ModelSelector
        providers={state.providers.length ? state.providers : LLM_PROVIDERS}
        currentProvider={state.currentProvider || LLM_PROVIDERS[0].providerId}
        currentModel={state.currentModel || LLM_PROVIDERS[0].models[0]}
        onProviderChange={handleProviderChange}
        onModelChange={handleModelChange}
        disabled={state.loading}
      />
      <MessageList messages={state.chatContext} />
      <div ref={chatContextEndRef} />
      <InputRow
        value={input}
        onChange={e => setInput(e.target.value)}
        onSend={handleSend}
        loading={state.loading}
      />
      {state.error && (
        <div className="p-2 text-xs text-red-600 bg-red-50 border-t">{state.error}</div>
      )}
    </div>
  );
}
