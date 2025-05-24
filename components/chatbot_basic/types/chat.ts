/**
 * Types for Chatbot context, messages, and providers.
 * Only public types should be exported from here.
 */

export interface Message {
  sender: 'user' | 'bot';
  text: string | string[];
  timestamp?: string;
  chatId?: string;
}

export interface LLMProvider {
  providerId: string;
  providerName: string;
  models: string[];
  requiresApiKey?: boolean;
}

export interface ChatContextState {
  chatContext: Message[];
  loading: boolean;
  error: string | null;
  providers: LLMProvider[];
  currentProvider: string;
  currentModel: string;
}

export interface ChatSession {
  id: string;
  chatContext: Message[];
  displayName: string;
  lastModified: number; // Using number (timestamp) for easier sorting
  // Include provider and model in each session for per-session settings
  currentProvider: string;
  currentModel:string;
  error: string | null; // Session-specific error
  loading: boolean; // Session-specific loading state
}

export interface ChatSessions {
  [sessionId: string]: ChatSession;
}
