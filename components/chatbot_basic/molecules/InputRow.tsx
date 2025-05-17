/**
 * InputRow Molecule
 * Renders the chat input and send button.
 */
'use client';
import React from 'react';
import { ChatInput } from '../atoms/ChatInput';
import { ChatButton } from '../atoms/ChatButton';

interface InputRowProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: (e?: React.FormEvent) => void;
  loading: boolean;
}

export function InputRow({ value, onChange, onSend, loading }: InputRowProps) {
  return (
    <form onSubmit={onSend} className="flex items-center p-2 bg-white border-t">
      <ChatInput
        type="text"
        placeholder="Type your message..."
        value={value}
        onChange={onChange}
        aria-label="Message input"
        disabled={loading}
      />
      <ChatButton type="submit" disabled={loading}>
        {loading ? '...' : 'Send'}
      </ChatButton>
    </form>
  );
}
