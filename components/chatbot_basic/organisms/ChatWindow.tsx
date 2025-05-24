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
    // Set global providers list if not already set (or if it can change)
    if (!state.providers || state.providers.length === 0) {
        dispatch({
            type: 'SET_PROVIDERS',
            payload: LLM_PROVIDERS
        });
    }

    // Set default provider and model for the active session IF NOT ALREADY SET by ChatProvider's createNewSession
    // This effect depends on activeSession, so it runs when activeSession changes or on mount if activeSession is ready.
    if (state.activeSession && !state.activeSession.currentProvider && LLM_PROVIDERS.length > 0) {
      dispatch({
        type: 'SET_SESSION_PROVIDER',
        payload: LLM_PROVIDERS[0].providerId
      });
      // Check if model also needs to be set for this provider
      const defaultProvider = LLM_PROVIDERS[0];
      if (defaultProvider.models.length > 0 && !state.activeSession.currentModel) {
          dispatch({
            type: 'SET_SESSION_MODEL',
            payload: defaultProvider.models[0]
          });
      }
    }
  }, [dispatch, state.providers, state.activeSession]); // Added state.activeSession to dependency array

  const handleProviderChange = (providerId: string) => {
    dispatch({
      type: 'SET_SESSION_PROVIDER',
      payload: providerId
    });
    
    const provider = state.providers.find(p => p.providerId === providerId);
    if (provider && provider.models.length > 0) {
      dispatch({
        type: 'SET_SESSION_MODEL',
        payload: provider.models[0]
      });
    }
  };

  const handleModelChange = (modelId: string) => {
    dispatch({
      type: 'SET_SESSION_MODEL',
      payload: modelId
    });
  };

  const handleSend = async () => {
    if (!input.trim() || !state.activeSession) return;
    
    // The SEND_MESSAGE action in the reducer will add the message to the active session's context
    dispatch({ type: 'SEND_MESSAGE', payload: input });
    const messageToSend = input; // Capture input before clearing
    setInput('');

    try {
      // Ensure chatContext for the API call includes the latest user message
      // The reducer handles adding the message to state.activeSession.chatContext
      // For the API call, we construct it here to ensure it's absolutely current
      // or rely on the state to update quickly enough (which it should with useReducer)
      const currentChatContext = state.activeSession.chatContext; 
      // The SEND_MESSAGE dispatch should have updated the context. If not immediately reflected,
      // we might need to pass messageToSend to fetchLLMResponse separately.
      // However, the reducer updates state, and this component re-renders with new state.
      // So, state.activeSession.chatContext should be up-to-date here for the API call.

      const response = await fetchLLMResponse({
        provider: state.activeSession.currentProvider,
        model: state.activeSession.currentModel,
        // Pass the most up-to-date chat context from the active session
        chatContext: currentChatContext, 
      });
      dispatch({ type: 'RECEIVE_MESSAGE', payload: response.text });
    } catch (error: any) {
      dispatch({ 
        type: 'SET_SESSION_ERROR', 
        payload: error.message || 'Sorry, there was an error processing your message.'
      });
    }
  };
  
  const activeChatMessages = state.activeSession?.chatContext || [];
  const isLoading = state.activeSession?.loading || false;
  const currentError = state.activeSession?.error || null;
  const currentProvider = state.activeSession?.currentProvider || '';
  const currentModel = state.activeSession?.currentModel || '';

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-gray-700 dark:border-slate-700"> {/* Updated border color for theme */}
        <ModelSelector
          providers={state.providers} // Global providers
          currentProvider={currentProvider}
          currentModel={currentModel}
          onProviderChange={handleProviderChange}
          onModelChange={handleModelChange}
          disabled={isLoading}
        />
      </div>
      <MessageList messages={activeChatMessages} />
      <InputRow
        value={input}
        onChange={setInput}
        onSend={handleSend}
        isLoading={isLoading}
      />
      {currentError && (
        <div className="px-4 py-2 text-sm text-red-500 dark:text-red-400 bg-red-100 dark:bg-red-900/30">{currentError}</div> // Updated error colors
      )}
    </div>
  );
}
