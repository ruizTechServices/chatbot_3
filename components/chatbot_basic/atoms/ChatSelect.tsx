/**
 * ChatSelect Atom
 * Styled select dropdown for provider/model selection.
 * @param {props} React.SelectHTMLAttributes<HTMLSelectElement>
 */
'use client';
import React from 'react';

export function ChatSelect(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className="flex-1 py-1 px-2 border rounded-md text-sm bg-white"
      {...props}
    >
      {props.children}
    </select>
  );
}
