# TODO: Modular LLM Provider Backend Refactor

## Objective
Refactor the backend chat API to support multiple LLM providers (OpenAI, Anthropic, etc.) and models in a modular, extensible, and stateless way. Ensure it is easy to add new providers/models (e.g., Mistral, Google, Huggingface) in the future.

---

## 1. Provider & Model Registry

- [x] Create a provider/model registry (e.g., `llmProviders.ts`) that exports a config object or array describing:
  - Each provider's unique ID and display name.
  - Supported models for each provider.
  - Handler function for each provider.
  - Example structure:
    ```ts
    export const LLM_PROVIDERS = {
      openai: {
        name: "OpenAI",
        models: ["gpt-4", "gpt-4o-mini-search-preview", "gpt-3.5-turbo", "gpt-4-turbo"],
        handler: handleOpenAI,
      },
      anthropic: {
        name: "Anthropic",
        models: ["claude-3-haiku-20240307", "claude-3-5-haiku-latest"],
        handler: handleAnthropic,
      }
      // Add more providers here...
    };
    ```

---

## 2. Unified Request Handling

- [x] Update the API route (e.g., [app/api/chat/route.ts](cci:7://file:///c:/Users/giost/Documents/websites/24hourGPT/chatbot_3/app/api/chat/route.ts:0:0-0:0)) to:
  - Accept `provider`, `model`, and `chatContext` in the request body.
  - Validate that the requested provider/model exists in the registry.
  - Route the request to the correct provider handler function.

---

## 3. Provider Handler Functions

- [x] For each provider, implement a handler function:
  - Receives `{ model, chatContext }`.
  - Converts the generic `chatContext` to the provider's required message format.
  - Calls the provider’s API (using fetch, SDK, or HTTP request).
  - Handles provider-specific errors and returns a unified response format.
- [x] Example handler signatures:
    ```ts
    async function handleOpenAI({ model, chatContext }): Promise<LLMResponse> { ... }
    async function handleAnthropic({ model, chatContext }): Promise<LLMResponse> { ... }
    ```

---

## 4. Message Format Mapping

- [x] Implement mapping logic to convert the generic context window (`{ sender, text }`) into the format required by each provider.
  - For OpenAI: `{ role, content }`
  - For Anthropic: `{ role, content }` or as specified by the Anthropic SDK
- [x] Ensure this mapping is stateless (no server-side memory between requests).

---

## 5. Environment Variables & API Keys

- [x] Use environment variables for each provider's API key (e.g., `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`).
- [x] Validate that the required API key is present for the selected provider.
- [x] Return a clear error if the API key is missing.

---

## 6. Error Handling

- [x] Standardize error responses across all providers.
- [x] Return error messages in a unified format to the frontend.

---

## 7. Extensibility

- [x] Document in code how to add a new provider/model:
  - Add entry to the registry.
  - Implement a handler function if needed.
  - Update environment variables as necessary.
- [x] Ensure no provider/model logic is hardcoded outside the registry/handlers.

---

## 8. Testing

- [x] Add backend unit tests for:
  - Provider/model validation logic.
  - Each provider handler (mocking API calls).
  - Message format mapping.
  - Error handling for missing/invalid API keys and invalid providers/models.

---

## 9. Documentation

- [x] Add a section to `README.md` describing:
  - How the provider registry works.
  - How to add new providers/models.
  - Required environment variables for each provider.

---

## 10. (Optional) Advanced

- [x] Support per-provider/model configuration (e.g., temperature, max_tokens) via the registry or request payload.
- [ ] Implement rate limiting or abuse prevention logic per provider.

---

**End of TODO**