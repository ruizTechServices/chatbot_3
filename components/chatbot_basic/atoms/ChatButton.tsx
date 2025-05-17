/**
 * ChatButton Atom
 * Styled button for sending chat messages.
 * @param {props} React.ButtonHTMLAttributes<HTMLButtonElement>
 */
'use client';
import React from 'react';

export function ChatButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors"
      {...props}
    >
      {props.children}
    </button>
  );
}
