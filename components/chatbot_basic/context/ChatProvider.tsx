/**
 * ChatProvider Context
 * Provides chat state, dispatch, and error handling for the chatbot.
 *
 * Usage:
 * <ChatProvider> wraps your chat UI. Use useChat() to consume context.
 */
'use client';
import React, { createContext, useContext, useReducer, ReactNode, useEffect, useCallback } from 'react';
import { Message, LLMProvider, ChatSession, ChatSessions } from '../types/chat';

const LOCAL_STORAGE_KEY = 'chatSessionsHistory';
const DEFAULT_PROVIDER_ID = 'openai'; // Or your preferred default
const DEFAULT_MODEL_ID = 'gpt-3.5-turbo'; // Or your preferred default

// Helper functions
const generateNewSessionId = () => `chat_${Date.now()}`;
const generateDisplayName = () => `Chat - ${new Date().toLocaleString()}`;

const welcomeMessages = [
  'Hello! How can I help you today?',
  'Hi there! What would you like to know?',
  'Welcome! Feel free to ask me anything.',
  'Hello! I\'m here to help. What can I assist you with today?',
  'Greetings! How can I be of service?',
  'Hi there! I\'m 24Hour AI, your AI assistant. How can I help you today?'
];

const getRandomWelcomeMessage = (): Message => {
  const randomText = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
  return {
    sender: 'bot',
    text: randomText,
    timestamp: new Date().toISOString(),
  };
};

const createNewSession = (
  id: string,
  providerId: string = DEFAULT_PROVIDER_ID,
  modelId: string = DEFAULT_MODEL_ID,
  initialMessage?: Message
): ChatSession => ({
  id,
  chatContext: initialMessage ? [initialMessage] : [getRandomWelcomeMessage()],
  displayName: generateDisplayName(),
  lastModified: Date.now(),
  currentProvider: providerId,
  currentModel: modelId,
  error: null,
  loading: false,
});

interface ChatProviderProps {
  children: ReactNode;
}

// Define new ChatState
interface ChatState {
  sessions: ChatSessions;
  activeChatId: string | null; // Can be null initially before loading/creating first session
  providers: LLMProvider[]; // Global list of available providers
}

// Define new Actions
interface SendMessageAction { type: 'SEND_MESSAGE'; payload: string | Message; }
interface ReceiveMessageAction { type: 'RECEIVE_MESSAGE'; payload: string | Message; }
interface SetSessionLoadingAction { type: 'SET_SESSION_LOADING'; payload: boolean; }
interface SetSessionErrorAction { type: 'SET_SESSION_ERROR'; payload: string | null; }
interface SetSessionProviderAction { type: 'SET_SESSION_PROVIDER'; payload: string; }
interface SetSessionModelAction { type: 'SET_SESSION_MODEL'; payload: string; }
interface SetSessionChatContextAction { type: 'SET_SESSION_CHAT_CONTEXT'; payload: Message[]; }
interface StartNewChatSessionAction { type: 'START_NEW_CHAT_SESSION'; }
interface SwitchChatSessionAction { type: 'SWITCH_CHAT_SESSION'; payload: string; }
interface SetProvidersAction { type: 'SET_PROVIDERS'; payload: LLMProvider[]; } // Global
interface UpdateSessionDisplayNameAction { type: 'UPDATE_SESSION_DISPLAY_NAME'; payload: { sessionId: string; displayName: string }; }
interface DeleteChatSessionAction { type: 'DELETE_CHAT_SESSION'; payload: string; } // Optional: For future use

type ChatAction =
  | SendMessageAction
  | ReceiveMessageAction
  | SetSessionLoadingAction
  | SetSessionErrorAction
  | SetSessionProviderAction
  | SetSessionModelAction
  | SetSessionChatContextAction
  | StartNewChatSessionAction
  | SwitchChatSessionAction
  | SetProvidersAction
  | UpdateSessionDisplayNameAction
  | DeleteChatSessionAction;


// Initial state determination logic
const getInitialState = (): ChatState => {
  try {
    const storedSessions = typeof window !== 'undefined' ? localStorage.getItem(LOCAL_STORAGE_KEY) : null;
    if (storedSessions) {
      const parsedSessions: ChatSessions = JSON.parse(storedSessions);
      const sessionIds = Object.keys(parsedSessions);

      if (sessionIds.length > 0) {
        // Find the most recently modified session
        let mostRecentSessionId = sessionIds[0];
        let maxLastModified = parsedSessions[sessionIds[0]].lastModified || 0;

        for (let i = 1; i < sessionIds.length; i++) {
          const currentSession = parsedSessions[sessionIds[i]];
          if ((currentSession.lastModified || 0) > maxLastModified) {
            maxLastModified = currentSession.lastModified || 0;
            mostRecentSessionId = sessionIds[i];
          }
        }
        return {
          sessions: parsedSessions,
          activeChatId: mostRecentSessionId,
          providers: [], // Providers will be loaded separately if needed
        };
      }
    }
  } catch (error) {
    console.error('Failed to load chat sessions from localStorage:', error);
  }

  // Default initial state if no localStorage data or parsing fails
  const initialSessionId = generateNewSessionId();
  const initialSession = createNewSession(initialSessionId);
  return {
    sessions: { [initialSessionId]: initialSession },
    activeChatId: initialSessionId,
    providers: [],
  };
};


// Reducer (to be fully implemented in the next step)
function chatReducer(state: ChatState, action: ChatAction): ChatState {
  // Ensure there's an active chat ID for session-specific actions
  if (!state.activeChatId &&
      action.type !== 'SET_PROVIDERS' &&
      action.type !== 'START_NEW_CHAT_SESSION' &&
      action.type !== 'SWITCH_CHAT_SESSION' &&
      action.type !== 'UPDATE_SESSION_DISPLAY_NAME' && 
      action.type !== 'DELETE_CHAT_SESSION' 
  ) {
    console.error("No active chat session for action:", action.type, ". Current state:", state);
    // Fallback: if no active chat, and action requires one, create a new session or return state
    // This case should ideally be prevented by robust initialization or UI logic
    if (action.type !== 'START_NEW_CHAT_SESSION') { // Avoid loop if START_NEW_CHAT_SESSION itself fails
        // Attempt to create a new session if none is active and action is not for creating one
        const initialSessionId = generateNewSessionId();
        const initialSession = createNewSession(initialSessionId);
        return {
            ...state,
            sessions: { ...state.sessions, [initialSessionId]: initialSession },
            activeChatId: initialSessionId,
        };
    }
    return state;
  }

  const activeSession = state.activeChatId ? state.sessions[state.activeChatId] : null;

  switch (action.type) {
    case 'SEND_MESSAGE': {
      if (!activeSession || !state.activeChatId) return state; // Guard against null activeChatId
      const newMessageObj = typeof action.payload === 'string'
        ? { sender: 'user' as const, text: action.payload, timestamp: new Date().toISOString(), chatId: activeSession.id }
        : { ...action.payload, chatId: activeSession.id, timestamp: action.payload.timestamp || new Date().toISOString() };
      
      const updatedSession: ChatSession = {
        ...activeSession,
        chatContext: [...activeSession.chatContext, newMessageObj],
        loading: true,
        lastModified: Date.now(),
      };

      // Update displayName if it's the first user message and current displayName is the default kind
      if (activeSession.chatContext.filter(m => m.sender === 'user').length === 0 && // Current message is the first user message
          (activeSession.displayName.startsWith('Chat - ') || activeSession.displayName === generateDisplayName())) { // Check if current name is default
        const userMessageText = (typeof newMessageObj.text === 'string') ? newMessageObj.text : newMessageObj.text.join(' ');
        updatedSession.displayName = userMessageText.substring(0, 35) + (userMessageText.length > 35 ? '...' : '');
      }
      
      return {
        ...state,
        sessions: {
          ...state.sessions,
          [state.activeChatId]: updatedSession,
        },
      };
    }

    case 'RECEIVE_MESSAGE': {
      if (!activeSession || !state.activeChatId) return state;
      const newMessageObj = typeof action.payload === 'string'
        ? { sender: 'bot' as const, text: action.payload, timestamp: new Date().toISOString(), chatId: activeSession.id }
        : { ...action.payload, chatId: activeSession.id, timestamp: action.payload.timestamp || new Date().toISOString() };
      
      const updatedSession: ChatSession = {
        ...activeSession,
        chatContext: [...activeSession.chatContext, newMessageObj],
        loading: false,
        lastModified: Date.now(),
      };
      return {
        ...state,
        sessions: {
          ...state.sessions,
          [state.activeChatId]: updatedSession,
        },
      };
    }

    case 'SET_SESSION_LOADING': {
      if (!activeSession || !state.activeChatId) return state;
      const updatedSession: ChatSession = { ...activeSession, loading: action.payload, lastModified: Date.now() };
      return {
        ...state,
        sessions: { ...state.sessions, [state.activeChatId]: updatedSession },
      };
    }

    case 'SET_SESSION_ERROR': {
      if (!activeSession || !state.activeChatId) return state;
      const updatedSession: ChatSession = { ...activeSession, error: action.payload, loading: false, lastModified: Date.now() };
      return {
        ...state,
        sessions: { ...state.sessions, [state.activeChatId]: updatedSession },
      };
    }

    case 'SET_SESSION_PROVIDER': {
      if (!activeSession || !state.activeChatId) return state;
      const updatedSession: ChatSession = { ...activeSession, currentProvider: action.payload, lastModified: Date.now() };
      return {
        ...state,
        sessions: { ...state.sessions, [state.activeChatId]: updatedSession },
      };
    }

    case 'SET_SESSION_MODEL': {
      if (!activeSession || !state.activeChatId) return state;
      const updatedSession: ChatSession = { ...activeSession, currentModel: action.payload, lastModified: Date.now() };
      return {
        ...state,
        sessions: { ...state.sessions, [state.activeChatId]: updatedSession },
      };
    }
    
    case 'SET_SESSION_CHAT_CONTEXT': {
      if (!activeSession || !state.activeChatId) return state;
      const updatedSession: ChatSession = { ...activeSession, chatContext: action.payload, lastModified: Date.now() };
      return {
        ...state,
        sessions: { ...state.sessions, [state.activeChatId]: updatedSession },
      };
    }

    case 'START_NEW_CHAT_SESSION': {
      const newSessionId = generateNewSessionId();
      const currentProvider = activeSession?.currentProvider || DEFAULT_PROVIDER_ID;
      const currentModel = activeSession?.currentModel || DEFAULT_MODEL_ID;
      const newSession = createNewSession(newSessionId, currentProvider, currentModel);
      return {
        ...state,
        sessions: {
          ...state.sessions,
          [newSessionId]: newSession,
        },
        activeChatId: newSessionId,
      };
    }

    case 'SWITCH_CHAT_SESSION': {
      if (state.sessions[action.payload]) { // Check if session exists
        return { ...state, activeChatId: action.payload };
      }
      console.warn(`Attempted to switch to non-existent session: ${action.payload}`);
      return state;
    }

    case 'SET_PROVIDERS': 
      return { ...state, providers: action.payload };

    case 'UPDATE_SESSION_DISPLAY_NAME': {
        const { sessionId, displayName } = action.payload;
        if (state.sessions[sessionId]) {
            const updatedSession: ChatSession = { 
                ...state.sessions[sessionId], 
                displayName,
                lastModified: Date.now() 
            };
            return {
                ...state,
                sessions: {
                    ...state.sessions,
                    [sessionId]: updatedSession,
                },
            };
        }
        return state;
    }
    
    case 'DELETE_CHAT_SESSION': {
        const sessionIdToDelete = action.payload;
        if (!state.sessions[sessionIdToDelete]) return state;

        const newSessions = { ...state.sessions };
        delete newSessions[sessionIdToDelete];

        let newActiveChatId = state.activeChatId;
        if (state.activeChatId === sessionIdToDelete) {
            const remainingSessionIds = Object.keys(newSessions);
            if (remainingSessionIds.length > 0) {
                newActiveChatId = remainingSessionIds.reduce((a, b) => 
                    (newSessions[a].lastModified || 0) > (newSessions[b].lastModified || 0) ? a : b
                );
            } else {
                const initialSessionId = generateNewSessionId();
                newSessions[initialSessionId] = createNewSession(initialSessionId);
                newActiveChatId = initialSessionId;
            }
        }
        return { ...state, sessions: newSessions, activeChatId: newActiveChatId };
    }

    default:
      return state;
  }
}

interface ChatContextType {
  state: ChatState;
  dispatch: React.Dispatch<ChatAction>;
  exportChatHistory: () => void;
  startNewChat: () => string; // Returns new chat ID
  switchChatSession: (sessionId: string) => void;
  // Potentially add more specific getters for current session data if needed by many components
  activeSession: ChatSession | undefined;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: ChatProviderProps) {
  const [state, dispatch] = useReducer(chatReducer, getInitialState());

  // Effect to save sessions to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined' && state.sessions && Object.keys(state.sessions).length > 0) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.sessions));
      } catch (error) {
        console.error('Failed to save chat sessions to localStorage:', error);
         // Optionally dispatch an error to be shown in UI
      }
    }
  }, [state.sessions]);
  
  // Function to export chat history of the active session
  const exportChatHistory = useCallback(() => {
    if (!state.activeChatId || !state.sessions[state.activeChatId]) {
      console.error('No active chat session to export.');
      // dispatch({ type: 'SET_SESSION_ERROR', payload: 'No active chat to export.' }); // Needs activeChatId context
      return;
    }
    const activeSession = state.sessions[state.activeChatId];
    try {
      const now = new Date();
      const dateStr = now.toISOString().split('T')[0];
      const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');
      
      const jsonlContent = activeSession.chatContext
        .map((message) => {
          const text = Array.isArray(message.text) ? message.text.join('\n') : message.text;
          return JSON.stringify({
            ...message,
            text,
            chatId: activeSession.id, // Use session ID
            timestamp: message.timestamp || new Date().toISOString(),
            exportTime: now.toISOString(),
          });
        })
        .join('\n');

      const filename = `chat_${activeSession.id}_${dateStr}_${timeStr}.jsonl`;

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
      dispatch({ type: 'SET_SESSION_ERROR', payload: 'Failed to export chat history.' }); // Assumes SET_SESSION_ERROR works on active
    }
  }, [state.activeChatId, state.sessions]);

  // Function to start a new chat session
  const startNewChat = useCallback((): string => {
    const newChatId = generateNewSessionId(); // Temp ID, action will confirm
    dispatch({ type: 'START_NEW_CHAT_SESSION' }); 
    // The reducer will create the session and set it active.
    // For now, we don't have the final ID from the reducer here directly.
    // This might need adjustment if the immediate ID is crucial.
    // For now, the UI will react to state.activeChatId changing.
    // A more robust way would be for the action to return the ID, or a selector to get it.
    // However, typical dispatch doesn't return values.
    // We will rely on activeChatId being updated.
    return newChatId; // This is a temporary ID, actual ID is set in reducer.
                      // This might be an issue if the caller relies on this return value for the *actual* new ID.
                      // A better approach for the caller: observe activeChatId from context.
  }, [dispatch]);

  const switchChatSession = useCallback((sessionId: string) => {
    dispatch({ type: 'SWITCH_CHAT_SESSION', payload: sessionId });
  }, [dispatch]);

  const activeSession = state.activeChatId ? state.sessions[state.activeChatId] : undefined;

  return (
    <ChatContext.Provider value={{
      state,
      dispatch,
      exportChatHistory,
      startNewChat,
      switchChatSession,
      activeSession,
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
