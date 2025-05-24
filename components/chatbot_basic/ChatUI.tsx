/**
 * ChatUI Component
 * Main presentational component for the chatbot.
 */
'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { ChatWindow } from './organisms/ChatWindow';
import { ChatProvider, useChatContextInternal } from './context/ChatProvider';
import { ChatControls } from './molecules/ChatControls';
import { ChatSessions, ChatSession } from '../types/chat'; // Import ChatSession type

interface SidebarProps {
  sessions: ChatSession[]; // Changed from ChatSessions to ChatSession[] (sorted array)
  activeChatId: string | null;
  onNewChat: () => void;
  onClose: () => void;
  onSwitchChat: (sessionId: string) => void;
  onDeleteChat: (sessionId: string) => void;
  // onRenameChat?: (sessionId: string, newName: string) => void; // Optional
}

function Sidebar({
  sessions,
  activeChatId,
  onNewChat,
  onClose,
  onSwitchChat,
  onDeleteChat,
}: SidebarProps) {
  return (
    <div className="p-4 flex flex-col h-full">
      <button
        className="w-full flex items-center gap-3 px-3 py-3 rounded-md border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        onClick={(e) => {
          e.preventDefault();
          onNewChat();
          onClose(); // Close sidebar on mobile after creating new chat
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-slate-700 dark:text-slate-200">
          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <span className="text-sm text-slate-700 dark:text-slate-200">New chat</span>
      </button>

      <div className="mt-8 flex-grow overflow-y-auto">
        <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-3 mb-2">
          Chat History
        </h3>
        <div className="space-y-1">
          {sessions.length === 0 && (
            <p className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400">No chats yet.</p>
          )}
          {sessions.map((session) => (
            <div
              key={session.id}
              className={`group flex items-center justify-between px-3 py-2 text-sm rounded-md cursor-pointer transition-colors
                ${session.id === activeChatId
                  ? 'bg-blue-500 dark:bg-blue-600 text-white'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              onClick={() => {
                onSwitchChat(session.id);
                onClose(); // Close sidebar on mobile after switching chat
              }}
            >
              <span className="truncate flex-grow mr-2">{session.displayName}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent onClick of parent div (chat switching)
                  onDeleteChat(session.id);
                }}
                className={`p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity
                  ${session.id === activeChatId 
                    ? 'text-blue-200 hover:bg-blue-700 dark:text-blue-300 dark:hover:bg-blue-800' 
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-600'
                  }`}
                aria-label="Delete chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                  <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Main Chat UI component
export function ChatUI() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [isNewChat, setIsNewChat] = useState(false); // This might be obsolete

  return (
    // ChatProvider is expected to be higher up in the component tree now,
    // typically in layout.tsx or a similar top-level component.
    // For this exercise, we'll assume it's correctly placed.
    // If ChatProvider was here, it would re-initialize on every ChatUI mount.
    // <ChatProvider>
    <ChatUIInner
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      // isNewChat={isNewChat}
      // setIsNewChat={setIsNewChat}
    />
    // </ChatProvider>
  );
}

// Inner component that has access to the chat context
interface ChatUIInnerProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  // isNewChat: boolean; // Potentially obsolete
  // setIsNewChat: (value: boolean) => void; // Potentially obsolete
}

function ChatUIInner({
  sidebarOpen,
  setSidebarOpen,
  // isNewChat, // Potentially obsolete
  // setIsNewChat // Potentially obsolete
}: ChatUIInnerProps) {
  const { state, dispatch, startNewChat, switchChatSession, activeSession } = useChatContextInternal();

  const handleNewChat = useCallback(() => {
    startNewChat(); // This function now handles creating and switching to a new session
    // setIsNewChat(true); // This local state might no longer be needed
    setSidebarOpen(false); // Close sidebar on mobile
  }, [startNewChat, setSidebarOpen]);

  const handleDeleteChat = useCallback((sessionId: string) => {
    if (window.confirm('Are you sure you want to delete this chat session? This action cannot be undone.')) {
      dispatch({ type: 'DELETE_CHAT_SESSION', payload: sessionId });
    }
  }, [dispatch]);
  
  // The old useEffect for isNewChat might need adjustment or removal.
  // If new chat creation automatically updates activeChatId, UI should react to that.
  // useEffect(() => {
  //   if (isNewChat) {
  //     setIsNewChat(false);
  //   }
  // }, [activeSession?.id, isNewChat, setIsNewChat]); // Watch activeSession or activeChatId

  const sortedSessions = Object.values(state.sessions).sort((a, b) => b.lastModified - a.lastModified);

  return (
    <div className="flex h-full bg-[var(--background)]">
      <div className="flex h-full bg-[var(--background)]">
        {/* Mobile menu button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed top-4 left-4 z-50 p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 md:hidden"
          aria-label="Toggle sidebar"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[var(--foreground)]">
            <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Sidebar */}
        <div className={`fixed md:relative top-0 left-0 h-full bg-slate-100 dark:bg-slate-800 transition-all duration-300 z-40 ${
          sidebarOpen ? 'w-[260px]' : 'w-0 md:w-[260px]'
        } overflow-hidden`}>
          <Sidebar
            sessions={sortedSessions}
            activeChatId={state.activeChatId}
            onNewChat={handleNewChat}
            onClose={() => setSidebarOpen(false)}
            onSwitchChat={(sessionId) => {
              switchChatSession(sessionId);
              setSidebarOpen(false); // Also close sidebar on mobile after switching
            }}
            onDeleteChat={handleDeleteChat}
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
