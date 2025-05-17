/**
 * ChatInput Atom
 * Styled input field for chat message entry.
 * @param {props} React.InputHTMLAttributes<HTMLInputElement>
 */
'use client';
import React from 'react';

export function ChatInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
      {...props}
    />
  );
}
