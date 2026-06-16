---
sidebar_position: 4
title: BeatBax Copilot
---

## BeatBax Copilot (AI Assistant)

BeatBax Copilot is a built-in AI chat assistant in the Web UI. It understands the full BeatBax language and can write songs, answer questions, and help debug errors — powered by any OpenAI-compatible REST API.

### Enabling the assistant

1. Open the Web UI at [app.beatbax.com](https://app.beatbax.com) (or run `npm run web-ui:dev` locally).
2. Press `Ctrl+,` (or **View → Settings…**) to open **Settings**, then go to the **Features** tab and enable **AI Copilot**.
3. Switch to the **AI** tab in Settings to configure your provider (endpoint, API key, model).
4. Close Settings. Go to **View → AI Assistant** (or click the robot icon in the toolbar) to open the Copilot panel.

You can also jump directly to the AI settings tab at any time by clicking the ⚙ gear icon in the Copilot panel header.

### Configuring the API endpoint

Choose a built-in preset or enter a custom endpoint:

| Preset | Endpoint | Default model |
|---|---|---|
| OpenAI | `https://api.openai.com/v1` | `gpt-4o-mini` |
| Groq (free, fast) | `https://api.groq.com/openai/v1` | `llama-3.3-70b-versatile` |
| Ollama (local) | `http://localhost:11434/v1` | `llama3.2` |
| LM Studio (local) | `http://localhost:1234/v1` | `local-model` |

Enter your API key if required (Ollama and LM Studio run without one). Settings are **persisted to `localStorage`** — your API key, endpoint, and model are remembered across page reloads so you only need to configure them once. To clear the saved key go to **Settings → AI → Clear key**.

### Edit mode vs Ask mode

Toggle the mode in the panel header:

- **Edit mode** — the assistant outputs a complete updated song in a ` ```bax ``` ` block that is applied directly to the editor. If the generated code has parse errors the assistant self-corrects up to 4 times before giving up. Applied changes can be undone with `Ctrl+Z`.
- **Ask mode** — the assistant answers questions and can include code snippets, but does not modify the editor. Use this for learning syntax, understanding effects, or exploring ideas.

### Example prompts

```
# Edit mode — song creation
compose a 4-channel Game Boy chiptune in C minor with a punchy bass line and arpeggio lead

# Edit mode — editing an existing song
add a wave channel melody that harmonises with channel 1

# Edit mode — fixing an error
the error says "Unknown instrument 'fuzz'" — please fix it

# Ask mode — learning
how do I write a portamento bass line that slides between notes?
what does inst(snare, 2) mean?
```

### Context injected automatically

On every request the assistant receives:

- The complete current editor content (truncated to 3000 characters for large songs).
- All current diagnostics (errors and warnings shown as red/yellow squiggles in the editor).
- The last 10 messages of the conversation for multi-turn context.

### Security notes

- Your API key is stored in `localStorage` (plain text) and persisted across sessions. Do not use a high-spend production key. Use **Settings → AI → Clear key** to remove it at any time.
- Only printable ASCII characters are accepted as API keys; non-ASCII values are rejected with a clear error message before any network request is made.
- AI-generated code is validated by the BeatBax parser before being applied to the editor. It is treated as text, not executed as JavaScript.
- All assistant responses are sanitised with DOMPurify before rendering to prevent XSS.
- Users who point the endpoint at a local Ollama or LM Studio instance keep all data on-device.

See [docs/features/complete/ai-chatbot-assistant.md](https://github.com/kadraman/beatbax/blob/main/docs/features/complete/ai-chatbot-assistant.md) for full architecture details, the self-correction loop, and the RAG enhancement roadmap.
