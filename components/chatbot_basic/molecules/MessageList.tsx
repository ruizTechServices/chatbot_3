/**
 * MessageList Molecule
 * Renders a list of chat messages using ChatMessageBubble.
 */
'use client';
import React from 'react';
import { Message } from '../types/chat';
import { ChatMessageBubble } from '../atoms/ChatMessageBubble';

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
      {messages.map((msg, idx) => (
        <ChatMessageBubble
          key={idx}
          message={msg.text}
          isUser={msg.sender === 'user'}
        />
      ))}
    </div>
  );
}
