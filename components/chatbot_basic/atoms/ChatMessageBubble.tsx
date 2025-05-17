/**
 * ChatMessageBubble Atom
 * Renders a single chat message (user or bot).
 * @param {message} string - The message text
 * @param {isUser} boolean - Whether the message is from the user
 */
'use client';
import React from 'react';

export function ChatMessageBubble({ message, isUser }: { message: string; isUser: boolean }) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <div
        className={`rounded-lg px-4 py-2 max-w-xs break-words shadow-md text-sm md:text-base '
          ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'}`}
      >
        {message}
      </div>
    </div>
  );
}
