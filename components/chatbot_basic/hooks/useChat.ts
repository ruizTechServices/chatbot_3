/**
 * useChat Hook
 * Consumer hook for accessing chat context state and dispatch.
 * Usage: const { state, dispatch } = useChat();
 */
'use client';
import { useChatContextInternal } from '../context/ChatProvider';

export function useChat() {
  return useChatContextInternal();
}
