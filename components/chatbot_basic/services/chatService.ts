/**
 * chatService
 * Handles all network calls to the LLM chat API (fetch, stream, abort logic).
 * Pure, typed, and ready for future streaming/abort extensions.
 */
export async function fetchLLMResponse({
  provider,
  model,
  chatContext
}: {
  provider: string;
  model: string;
  chatContext: any[];
}): Promise<any> {
  // Debug log to trace outgoing data
  console.log('[fetchLLMResponse] Sending:', { provider, model, chatContext });
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ provider, model, chatContext })
  });
  const data = await response.json();
  if (data.error) throw new Error(data.error);
  return data;
}
