/**
 * InputRow Molecule
 * Renders the chat input and send button.
 */
'use client';
import React from 'react';

interface InputRowProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading?: boolean;
}

export function InputRow({ value, onChange, onSend, isLoading }: InputRowProps) {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="border-t border-gray-700 p-4 bg-[#343541]">
      <div className="max-w-3xl mx-auto">
        <div className="relative flex items-end">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Send a message..."
            disabled={isLoading}
            className="flex-1 resize-none bg-[#40414f] text-white border border-gray-600 rounded-md px-4 py-3 pr-12 focus:outline-none focus:border-gray-400 disabled:opacity-50 min-h-[52px] max-h-[200px]"
            rows={1}
          />
          <button
            onClick={onSend}
            disabled={isLoading || !value.trim()}
            className="absolute right-2 bottom-2 p-2 rounded-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={`${value.trim() ? 'text-white' : 'text-gray-500'}`}>
              <path d="M7 11L12 6L17 11M12 18V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
