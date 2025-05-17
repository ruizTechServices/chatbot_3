/**
 * ChatUI
 * Main presentational component for the modular chatbot. Assembles the ChatWindow organism.
 */
'use client';
import React from 'react';
import { ChatWindow } from './organisms/ChatWindow';

export default function ChatUI() {
  return <ChatWindow />;
}
