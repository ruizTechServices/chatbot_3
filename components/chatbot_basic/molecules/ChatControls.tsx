'use client';

import { useChatContextInternal } from '../context/ChatProvider';

interface ChatControlsProps {
  onNewChat?: () => void;
}

export function ChatControls({ onNewChat }: ChatControlsProps) {
  const { exportChatHistory, startNewChat: contextNewChat } = useChatContextInternal();

  const handleNewChat = () => {
    if (onNewChat) {
      onNewChat();
    } else {
      contextNewChat();
    }
  };

  return (
    <div className="flex justify-end space-x-4 p-4 border-t border-gray-200 dark:border-gray-700">
      <button
        onClick={handleNewChat}
        className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
        aria-label="Start a new chat"
      >
        New Chat
      </button>
      <button
        onClick={exportChatHistory}
        className="px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        aria-label="Export chat history"
      >
        Export Chat
      </button>
    </div>
  );
}
