# TODO: Modular LLM Model Selection Frontend

## Objective
Implement a modular, extensible frontend interface for selecting and using multiple LLM providers and models (OpenAI, Anthropic, etc.) in the chatbot. All changes must be data-driven and future-proof.

---

## 1. Model & Provider Registry

- [x] Create a `models.ts` or similar config file exporting an array/object of available LLM providers and their models.  
  - Example structure:
    ```ts
    export const LLM_PROVIDERS = [
      {
        name: "OpenAI",
        id: "openai",
        models: [
          { name: "GPT-4", id: "gpt-4" },
          { name: "GPT-4o-mini-search-preview", id: "gpt-4o-mini-search-preview" },
          { name: "GPT-3.5-turbo", id: "gpt-3.5-turbo" },
          { name: "GPT-4-turbo", id: "gpt-4-turbo" }
        ]
      },
      {
        name: "Anthropic",
        id: "anthropic",
        models: [
          { name: "Claude 3 Haiku", id: "claude-3-haiku-20240307" },
          { name: "Claude 3.5 Haiku", id: "claude-3-5-haiku-latest" }
        ]
      }
    ];
    ```

---

## 2. Dropdown UI Component

- [x] In the chat UI (e.g., `Chatbot.tsx`), add a dropdown menu for model selection.
  - [x] Group models by provider.
  - [x] Display both provider and model names.
- [x] Bind dropdown value to component state (`selectedProvider`, `selectedModel`).

---

## 3. State Management

- [x] Store selected provider and model in React state.
- [x] On dropdown change, update state accordingly.

---

## 4. Sending Messages

- [x] When sending a message, include `provider` and `model` in the request payload to the backend, along with `chatContext`.
  - Example payload:
    ```json
    {
      "provider": "openai",
      "model": "gpt-4",
      "chatContext": [...]
    }
    ```

---

## 5. Extensibility

- [x] Ensure all provider/model options are generated from the config file, not hardcoded in components.
- [x] Document in code how to add a new provider/model (update config, no UI changes needed).

---

## 6. UI/UX

- [x] Clearly indicate the currently selected model/provider to the user.
- [x] Optionally, display short descriptions/tooltips for each model.

---

## 7. Testing

- [x] Test sending messages with each available model/provider.
- [x] Confirm correct request payloads are sent for each selection.
- [x] Confirm chat context is preserved when switching models/providers.

---

## 8. Documentation

- [x] Add a section to `README.md` describing how to add new LLM providers/models to the frontend.

---

## 9. (Optional) Advanced

- [x] Persist the last used model/provider in local storage or URL params for user convenience.

---

**End of TODO**