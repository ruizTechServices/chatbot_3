/**
 * ChatUI Component
 * Main presentational component for the chatbot.
 */
'use client';
import React, { useState, useEffect } from 'react';
import { ChatWindow } from './organisms/ChatWindow';
import { ChatProvider, useChatContextInternal } from './context/ChatProvider';
import { ChatControls } from './molecules/ChatControls';

function Sidebar({ onNewChat, onClose }: { onNewChat: () => void, onClose: () => void }) {
  return (
    <div className="p-4">
      <button 
        className="w-full flex items-center gap-3 px-3 py-3 rounded-md border border-gray-600 hover:bg-gray-700 transition-colors"
        onClick={(e) => {
          e.preventDefault();
          onNewChat();
          onClose();
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <span className="text-sm text-white">New chat</span>
      </button>
      
      <div className="mt-8">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">
          Chat History
        </h3>
        <div className="space-y-1">
          <div className="px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-md cursor-pointer">
            Previous conversation 1
          </div>
          <div className="px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-md cursor-pointer">
            Previous conversation 2
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Chat UI component
export function ChatUI() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isNewChat, setIsNewChat] = useState(false);
  
  return (
    <ChatProvider>
      <ChatUIInner 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isNewChat={isNewChat}
        setIsNewChat={setIsNewChat}
      />
    </ChatProvider>
  );
}

// Inner component that has access to the chat context
interface ChatUIInnerProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  isNewChat: boolean;
  setIsNewChat: (value: boolean) => void;
}

function ChatUIInner({ 
  sidebarOpen, 
  setSidebarOpen,
  isNewChat,
  setIsNewChat 
}: ChatUIInnerProps) {
  const { startNewChat, state } = useChatContextInternal();
  
  // Handle starting a new chat
  const handleNewChat = () => {
    const newChatId = startNewChat();
    setIsNewChat(true);
    setSidebarOpen(false);
    return newChatId;
  };
  
  // Reset new chat state when chat context changes
  useEffect(() => {
    if (isNewChat) {
      setIsNewChat(false);
    }
  }, [state.chatContext, isNewChat, setIsNewChat]);
  
  return (
    <div className="flex h-full bg-[#343541]">
      <div className="flex h-full bg-[#343541]">
        {/* Mobile menu button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed top-4 left-4 z-50 p-2 rounded-md hover:bg-gray-700 md:hidden"
          aria-label="Toggle sidebar"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
            <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Sidebar */}
        <div className={`fixed md:relative top-0 left-0 h-full bg-[#202123] transition-all duration-300 z-40 ${
          sidebarOpen ? 'w-[260px]' : 'w-0 md:w-[260px]'
        } overflow-hidden`}>
          <Sidebar 
            onNewChat={handleNewChat} 
            onClose={() => setSidebarOpen(false)} 
          />
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">
          <ChatWindow />
          <ChatControls onNewChat={handleNewChat} />
        </div>
      </div>
    </div>
  );
}
