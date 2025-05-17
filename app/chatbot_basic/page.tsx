// Chatbot Basic Page
// This is the main page for the modular, responsive chatbot UI.
// TODO: For production, you may want to add authentication, error boundaries, and connect to your backend/chat API.
// See components/Chatbot.tsx for detailed comments on production upgrades.

import { ChatProvider } from '@/components/chatbot_basic/context/ChatProvider';
import { ChatErrorBoundary } from '@/components/chatbot_basic/ChatErrorBoundary';
import ChatUI from '@/components/chatbot_basic/ChatUI';

export default function ChatbotBasicPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-blue-700">Chatbot Demo (Frontend Only)</h1>
      <ChatErrorBoundary>
        <ChatProvider>
          <ChatUI />
        </ChatProvider>
      </ChatErrorBoundary>
    </main>
  );
}
