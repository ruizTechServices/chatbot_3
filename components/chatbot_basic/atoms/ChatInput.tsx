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
      className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-50 placeholder-slate-400 dark:placeholder-slate-500"
      {...props}
    />
  );
}
