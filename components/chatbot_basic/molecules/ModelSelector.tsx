/**
 * ModelSelector Molecule
 * Allows the user to select LLM provider and model.
 */
'use client';
import React from 'react';
import { LLMProvider } from '../types/chat';

interface ModelSelectorProps {
  providers: LLMProvider[];
  currentProvider: string;
  currentModel: string;
  onProviderChange: (providerId: string) => void;
  onModelChange: (modelId: string) => void;
  disabled?: boolean;
}

export function ModelSelector({
  providers,
  currentProvider,
  currentModel,
  onProviderChange,
  onModelChange,
  disabled = false,
}: ModelSelectorProps) {
  const selectedProvider = providers.find(p => p.providerId === currentProvider);
  const models = selectedProvider?.models || [];

  return (
    <div className="p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
          <div className="flex-1 sm:flex-initial min-w-[150px] sm:min-w-[200px]"> {/* Added min-w for better layout */}
            <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Provider</label>
            <select
              className="w-full bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-50 border border-slate-300 dark:border-slate-600 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400"
              value={currentProvider}
              onChange={e => onProviderChange(e.target.value)}
              disabled={disabled}
            >
              {providers.map(provider => (
                <option key={provider.providerId} value={provider.providerId}>
                  {provider.providerName}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex-1 sm:flex-initial min-w-[150px] sm:min-w-[200px]"> {/* Added min-w for better layout */}
            <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Model</label>
            <select
              className="w-full bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-50 border border-slate-300 dark:border-slate-600 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400"
              value={currentModel}
              onChange={e => onModelChange(e.target.value)}
              disabled={disabled || !selectedProvider}
            >
              {models.map(model => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
