/**
 * Chatbot Basic Page
 * Main page wrapper for the basic chatbot.
 * Serves as the entry point for /chatbot_basic route.
 * Renders the ChatUI component which contains all the chat functionality.
 */
'use client';
import { ChatProvider } from '@/components/chatbot_basic/context/ChatProvider';
import { ChatErrorBoundary } from '@/components/chatbot_basic/ChatErrorBoundary';
import { ChatUI } from '@/components/chatbot_basic/ChatUI';

export default function ChatbotBasicPage() {
  return (
    <main className="flex h-screen w-full bg-[#343541] text-white">
      <ChatErrorBoundary>
        <ChatProvider>
          <ChatUI />
        </ChatProvider>
      </ChatErrorBoundary>
    </main>
  );
}
