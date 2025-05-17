/**
 * ModelSelector Molecule
 * Handles provider and model selection for the chatbot.
 */
'use client';
import React from 'react';
import { LLMProvider } from '../types/chat';
import { ChatSelect } from '../atoms/ChatSelect';

interface ModelSelectorProps {
  providers: LLMProvider[];
  currentProvider: string;
  currentModel: string;
  onProviderChange: (providerId: string) => void;
  onModelChange: (modelId: string) => void;
  disabled: boolean;
}

export function ModelSelector({
  providers,
  currentProvider,
  currentModel,
  onProviderChange,
  onModelChange,
  disabled
}: ModelSelectorProps) {
  const currentProviderData = providers.find(p => p.providerId === currentProvider);
  const availableModels = currentProviderData?.models || [];

  return (
    <div className="flex flex-col md:flex-row gap-2 p-2 bg-gray-100 border-b">
      <div className="flex flex-1 items-center">
        <label htmlFor="provider-select" className="mr-2 text-sm font-medium text-gray-700">Provider:</label>
        <ChatSelect
          id="provider-select"
          value={currentProvider}
          onChange={e => onProviderChange(e.target.value)}
          disabled={disabled}
        >
          {providers.map(provider => (
            <option key={provider.providerId} value={provider.providerId}>
              {provider.providerName}
            </option>
          ))}
        </ChatSelect>
      </div>
      <div className="flex flex-1 items-center">
        <label htmlFor="model-select" className="mr-2 text-sm font-medium text-gray-700">Model:</label>
        <ChatSelect
          id="model-select"
          value={currentModel}
          onChange={e => onModelChange(e.target.value)}
          disabled={disabled || availableModels.length === 0}
        >
          {availableModels.map(model => (
            <option key={model} value={model}>{model}</option>
          ))}
        </ChatSelect>
      </div>
    </div>
  );
}
