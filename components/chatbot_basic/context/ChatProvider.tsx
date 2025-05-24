/**
 * ChatProvider Context
 * Provides chat state, dispatch, and error handling for the chatbot.
 *
 * Usage:
 * <ChatProvider> wraps your chat UI. Use useChat() to consume context.
 */
'use client';
import React, { createContext, useContext, useReducer, ReactNode, useState } from 'react';
import { Message, LLMProvider, ChatContextState } from '../types/chat';

interface ChatProviderProps {
  children: ReactNode;
}

interface SendMessageAction {
  type: 'SEND_MESSAGE';
  payload: string | Message;
}

interface ReceiveMessageAction {
  type: 'RECEIVE_MESSAGE';
  payload: string | Message;
}

interface SetLoadingAction {
  type: 'SET_LOADING';
  payload: boolean;
}

interface SetErrorAction {
  type: 'SET_ERROR';
  payload: string | null;
}

interface SetProviderAction {
  type: 'SET_PROVIDER';
  payload: string;
}

interface SetModelAction {
  type: 'SET_MODEL';
  payload: string;
}

interface SetProvidersAction {
  type: 'SET_PROVIDERS';
  payload: LLMProvider[];
}

interface SetChatContextAction {
  type: 'SET_CHAT_CONTEXT';
  payload: Message[];
}

interface ResetChatAction {
  type: 'RESET_CHAT';
  payload?: string;
}

type ChatAction = 
  | SendMessageAction
  | ReceiveMessageAction
  | SetLoadingAction
  | SetErrorAction
  | SetProviderAction
  | SetModelAction
  | SetProvidersAction
  | SetChatContextAction
  | ResetChatAction;

const initialState: ChatContextState = {
  chatContext: [
    { 
      sender: 'bot', 
      text: [
        'Hello! How can I help you today?',
        'Hi there! What would you like to know?',
        'Welcome! Feel free to ask me anything.',
        'Hello! I\'m here to help. What can I assist you with today?',
        'Greetings! How can I be of service?',
        'Hi there! I\'m 24Hour AI, your AI assistant. How can I help you today?',
        
      ] 
    },
  ],
  loading: false,
  error: null,
  providers: [],
  currentProvider: '',
  currentModel: '',
};

function chatReducer(state: ChatContextState, action: ChatAction): ChatContextState {
  switch (action.type) {
    case 'SEND_MESSAGE': {
      const newMessage = typeof action.payload === 'string' 
        ? { sender: 'user' as const, text: action.payload }
        : action.payload;
      
      return { 
        ...state, 
        chatContext: [...state.chatContext, newMessage],
        loading: true
      };
    }
    
    case 'RECEIVE_MESSAGE': {
      const newMessage = typeof action.payload === 'string' 
        ? { sender: 'bot' as const, text: action.payload }
        : action.payload;
      
      return { 
        ...state, 
        chatContext: [...state.chatContext, newMessage],
        loading: false
      };
    }
    
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
      
    case 'SET_CHAT_CONTEXT':
      return { ...state, chatContext: action.payload };
      
    case 'RESET_CHAT': {
      const welcomeMessages = [
        'Hello! How can I help you today?',
        'Hi there! What would you like to know?',
        'Welcome! Feel free to ask me anything.',
        'Hello! I\'m here to help. What can I assist you with today?',
        'Greetings! How can I be of service?',
        'Hi there! I\'m 24Hour AI, your AI assistant. How can I help you today?'
      ];
      
      const randomWelcome = welcomeMessages[
        Math.floor(Math.random() * welcomeMessages.length)
      ];
      
      const chatId = action.payload || `chat_${Date.now()}`;
      const timestamp = new Date().toISOString();
      
      return {
        ...state,
        chatContext: [{
          sender: 'bot',
          text: randomWelcome,
          timestamp,
          chatId
        }],
        loading: false,
        error: null
      };
    }
      
    default:
      return state;
  }
}

interface ChatContextType {
  state: ChatContextState;
  dispatch: React.Dispatch<ChatAction>;
  exportChatHistory: () => void;
  startNewChat: () => void;
  chatId: string;
  currentChatId: string;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: ChatProviderProps) {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  
  // Generate a unique chat ID for this session
  const [chatId] = useState(() => `chat_${Date.now()}`);

  // Function to export chat history
  const exportChatHistory = () => {
    try {
      // Get the current chat ID from the first message or generate a new one
      const currentChatId = state.chatContext[0]?.chatId || chatId;
      const now = new Date();
      const dateStr = now.toISOString().split('T')[0];
      const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');
      
      // Convert messages to JSONL format
      const jsonlContent = state.chatContext
        .map((message) => {
          // If text is an array, join it with newlines
          const text = Array.isArray(message.text) 
            ? message.text.join('\n') 
            : message.text;
          
          // Include metadata with each message
          return JSON.stringify({
            ...message,
            text,
            chatId: message.chatId || currentChatId,
            timestamp: message.timestamp || new Date().toISOString(),
            exportTime: now.toISOString(),
          });
        })
        .join('\n');

      // Generate filename with chat ID and timestamp
      const filename = `chat_${currentChatId}_${dateStr}_${timeStr}.jsonl`;

      // Trigger download
      const blob = new Blob([jsonlContent], { type: 'application/jsonl' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting chat history:', error);
      // Dispatch error to state
      dispatch({
        type: 'SET_ERROR',
        payload: 'Failed to export chat history. Please try again.'
      });
    }
  };

  // Function to start a new chat
  const startNewChat = () => {
    // Generate a new chat ID
    const newChatId = `chat_${Date.now()}`;
    
    // Reset chat context with a new welcome message
    dispatch({
      type: 'RESET_CHAT',
      payload: newChatId
    });
    
    // Return the new chat ID in case it's needed
    return newChatId;
  };

  // Get the current chat ID from the first message's chatId or generate a new one
  const currentChatId = state.chatContext[0]?.chatId || chatId;
  
  return (
    <ChatContext.Provider value={{ 
      state, 
      dispatch, 
      exportChatHistory, 
      startNewChat,
      chatId,
      currentChatId
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContextInternal(): ChatContextType {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
}
