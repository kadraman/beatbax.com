---
sidebar_position: 4
title: BeatBax Copilot
---

# BeatBax Copilot (AI Assistant)

BeatBax Copilot is a **desktop-only** AI chat assistant. It understands the BeatBax language and can write songs, answer questions, and help debug errors — powered by any OpenAI-compatible REST API (OpenAI, Groq, Ollama, LM Studio, and others).

The hosted web-lite client at [app.beatbax.com](https://app.beatbax.com) does **not** include Copilot. Use [BeatBax Desktop](/docs/tools/desktop).

## Enabling the assistant

1. Open **BeatBax Desktop**.
2. Press `Ctrl+,` / `Cmd+,` (or **View → Settings…**) to open **Settings**.
3. On the **Features** tab, enable **AI Copilot**.
4. Switch to the **AI** tab to configure your provider (endpoint, API key, model).
5. Close Settings. Open the Copilot panel from **View → AI Assistant** or the robot icon in the toolbar.

You can jump directly to the AI settings tab by clicking the gear icon in the Copilot panel header.

## Configuring the API endpoint

Choose a built-in preset or enter a custom endpoint:

| Preset | Endpoint | Default model |
|---|---|---|
| OpenAI | `https://api.openai.com/v1` | `gpt-5.4-mini` |
| Groq (free, fast) | `https://api.groq.com/openai/v1` | `openai/gpt-oss-120b` |
| Ollama (local) | `http://localhost:11434/v1` | `qwen2.5-coder:7b` |
| LM Studio (local) | `http://localhost:1234/v1` | `local-model` |

The **Model** dropdown combines curated options with models fetched live from the provider’s `/models` endpoint, plus **Custom…** for any model ID. Use **Refresh** to reload the list.

Enter an API key when the provider requires one. Ollama and LM Studio run without a key.

### Where settings are stored

| Data | Storage |
|------|---------|
| Endpoint, model, max context chars | App preferences (`beatbax:ai.settings`) |
| Interaction mode (edit / ask) | App preferences |
| Chat history | App preferences (capped) |
| **API key** | OS **secure credential store** via the Electron main process (not `localStorage`) |

Use **Settings → AI → Clear key** to remove a stored API key.

## Edit mode vs Ask mode

Toggle the mode in the panel header:

- **Edit mode** — the assistant outputs a complete updated song in a fenced `bax` block that is applied to the editor. Parse-error self-correction and incomplete-song repair run a few times before giving up. Incomplete replies that would wipe most of the song are **blocked**. Applied changes can be undone with `Ctrl+Z` / `Cmd+Z`.
- **Ask mode** — the assistant answers questions and can include code snippets, but does not modify the editor.

## Example prompts

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

## Context injected automatically

On every request the assistant receives:

- The current editor content (within the configured max context size).
- Current diagnostics (errors and warnings).
- Recent conversation history for multi-turn context.
- A chip-aware language reference.

## Local Ollama setup

For fully private inference:

1. Install [Ollama](https://ollama.com/) and run `ollama serve`.
2. Pull a **code-oriented** model (recommended: `qwen2.5-coder:7b` on ~8 GB GPUs).
3. In BeatBax: **Settings → Features** → enable **AI Copilot**.
4. **Settings → AI** → preset **Ollama (local)** → refresh models and select yours.

### Context size (`num_ctx`)

Edit mode sends a large system prompt plus the full song and expects a **complete** song back. Ollama’s default **8192** context is often too small and causes snippet-only replies.

| `num_ctx` | Verdict |
|-----------|---------|
| 8,192 | Too tight for typical songs + history |
| **16,384** | Recommended minimum |
| 32,768 | Better for long threads or songs over ~200 lines |

Session example:

```bash
OLLAMA_CONTEXT_LENGTH=16384 ollama serve
```

Or a persistent Modelfile:

```
FROM qwen2.5-coder:7b
PARAMETER num_ctx 16384
```

Then `ollama create beatbax-coder -f Modelfile` and select `beatbax-coder` in Settings → AI.

Tips: clear Copilot chat before a large Edit; use Ask for explanations; raise `num_ctx` or use a cloud model if local edits keep failing.

## Security notes

- Cloud API keys live in the OS secure credential store on your machine only. Prefer a limited or low-spend key.
- Only printable ASCII characters are accepted as API keys.
- AI-generated code is validated by the BeatBax parser before apply. It is treated as text, not executed as JavaScript.
- Assistant responses are sanitised before rendering.
- Local Ollama / LM Studio keep all data on-device.

## Related docs

- [Desktop app](/docs/tools/desktop)
- [Settings](/docs/tools/settings)
