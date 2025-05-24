/**
 * MessageList Molecule
 * Renders a list of chat messages. Handles display of user and bot messages.
 */
'use client';
import React, { useState, useEffect } from 'react';
import { Message } from '../types/chat';

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages: initialMessages }: MessageListProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Function to get a random element from an array
  const getRandomMessage = (text: string | string[]): string => {
    if (Array.isArray(text)) {
      return text[0]; // Always use the first message for server-side rendering
    }
    return text;
  };

  // Update messages with random selection after component mounts (client-side only)
  useEffect(() => {
    const updatedMessages = initialMessages.map((msg: Message) => ({
      ...msg,
      text: Array.isArray(msg.text) 
        ? msg.text[Math.floor(Math.random() * msg.text.length)] 
        : msg.text
    }));
    setMessages(updatedMessages);
    setIsMounted(true);
  }, [initialMessages]);

  // Use the initial messages for server-side rendering and first client render
  const displayMessages = isMounted ? messages : initialMessages;

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        {displayMessages.map((msg: Message, idx: number) => (
          <div 
            key={idx} 
            className={`px-4 py-8 ${msg.sender === 'user' ? 'bg-[#343541]' : 'bg-[#444654]'}`}
          >
            <div className="flex gap-4 max-w-full">
              <div className="w-8 h-8 flex-shrink-0 rounded-full bg-gray-600 flex items-center justify-center text-white text-sm">
                {msg.sender === 'user' ? 'U' : 'AI'}
              </div>
              <div className="flex-1 min-w-0 text-gray-100 whitespace-pre-wrap break-words">
                {Array.isArray(msg.text) ? getRandomMessage(msg.text) : msg.text}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
