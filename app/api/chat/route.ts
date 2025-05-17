import { NextRequest, NextResponse } from 'next/server';
import { LLM_PROVIDERS, validateProviderAndModel, getAvailableProviders } from './llmProviders';
import { Message } from '@/components/useChatContext';

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const { provider = 'openai', model = 'gpt-3.5-turbo', chatContext } = await req.json();
    
    // Validate chat context
    if (!Array.isArray(chatContext)) {
      return NextResponse.json({ error: 'Missing or invalid chat context' }, { status: 400 });
    }

    // Validate provider and model
    if (!validateProviderAndModel(provider, model)) {
      return NextResponse.json(
        { 
          error: `Invalid provider or model: ${provider}/${model}`,
          availableProviders: getAvailableProviders()
        }, 
        { status: 400 }
      );
    }

    // Get the provider from registry
    const providerConfig = LLM_PROVIDERS[provider];
    
    // Check for required API key
    if (providerConfig.requiresApiKey) {
      const apiKeyName = `${provider.toUpperCase()}_API_KEY`;
      if (!process.env[apiKeyName]) {
        return NextResponse.json(
          { error: `Missing ${providerConfig.name} API key in server environment` }, 
          { status: 500 }
        );
      }
    }

    // Call the provider's handler function
    const response = await providerConfig.handler({
      model,
      chatContext
    });
    
    // Return standardized response
    return NextResponse.json(response);
    
  } catch (error: any) {
    console.error('[LLM API Error]', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' }, 
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve available providers and models
export async function GET() {
  try {
    return NextResponse.json({ providers: getAvailableProviders() });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Error retrieving providers' }, 
      { status: 500 }
    );
  }
}
