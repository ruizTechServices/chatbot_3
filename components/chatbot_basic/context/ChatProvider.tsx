/**
 * ChatProvider Context
 * Provides chat state, dispatch, and error handling for the chatbot.
 *
 * Usage:
 * <ChatProvider> wraps your chat UI. Use useChat() to consume context.
 */
'use client';
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Message, LLMProvider, ChatContextState } from '../types/chat';

interface ChatProviderProps {
  children: ReactNode;
}

interface ChatAction {
  type: 'SEND_MESSAGE' | 'RECEIVE_MESSAGE' | 'SET_LOADING' | 'SET_ERROR' | 'SET_PROVIDER' | 'SET_MODEL' | 'SET_PROVIDERS';
  payload?: any;
}

const initialState: ChatContextState = {
  chatContext: [
    { sender: 'bot', text: 'Hello! How can I help you today? You can select different AI providers and models above.' },
  ],
  loading: false,
  error: null,
  providers: [],
  currentProvider: '',
  currentModel: '',
};

function chatReducer(state: ChatContextState, action: ChatAction): ChatContextState {
  switch (action.type) {
    case 'SEND_MESSAGE':
      return { ...state, chatContext: [...state.chatContext, { sender: 'user', text: action.payload }], loading: true };
    case 'RECEIVE_MESSAGE':
      return { ...state, chatContext: [...state.chatContext, { sender: 'bot', text: action.payload }], loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_PROVIDER':
      return { ...state, currentProvider: action.payload };
    case 'SET_MODEL':
      return { ...state, currentModel: action.payload };
    case 'SET_PROVIDERS':
      return { ...state, providers: action.payload };
    default:
      return state;
  }
}

const ChatContext = createContext<{
  state: ChatContextState;
  dispatch: React.Dispatch<ChatAction>;
} | undefined>(undefined);

export function ChatProvider({ children }: ChatProviderProps) {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  return <ChatContext.Provider value={{ state, dispatch }}>{children}</ChatContext.Provider>;
}

export function useChatContextInternal() {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChatContext must be used within a ChatProvider');
  return context;
}
