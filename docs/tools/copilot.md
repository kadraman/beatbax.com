---
sidebar_position: 4
title: BeatBax Copilot
---

# BeatBax Copilot (AI Assistant)

BeatBax Copilot is an AI chat assistant. It understands the BeatBax language and can help you write songs, answer questions, and debug errors. It is powered by any OpenAI-compatible LLM (OpenAI, Groq, Ollama, LM Studio, and others).

> BeatBax Copilot is only available in BeatBax Desktop.

## Limitations

Copilot is a helper for the BeatBax grammar — targeted edits, construction, and debugging — not a replacement for human inspiration and writing.

It is **not** really intended to compose a complete song from scratch, or to make a comprehensive rework of an existing arrangement. Those requests often produce generic, incomplete, or structurally clumsy results. You are welcome to try; treat whatever comes back as a sketch to rewrite, not a finished track.

It is more reliable on small, specific jobs: fix a parse error, add a complementary voice, explain a modifier, or suggest an instrument. Keep authorship with you.

## Enabling the assistant

1. Open [BeatBax Desktop](/docs/tools/desktop).
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

### AI settings (two different “context” controls)

| Setting | What it does |
|---|---|
| **Ask song excerpt** | Character cap on how much of the **open song** is pasted into **Ask** questions only. Presets from 4K to 32K characters. **Edit mode ignores this** and always sends the full song. |
| **Model token window** | The model’s max token limit for **Ask and Edit**. This is the denominator for the footer context meter. For Ollama, set it equal to `num_ctx`. |

OpenAI defaults to 128k tokens (200k for `o3`); Ollama and LM Studio default to 16k.

### Where settings are stored

| Data | Storage |
|------|---------|
| Endpoint, model, Ask song excerpt, model token window | App preferences (`beatbax:ai.settings`) |
| Interaction mode (edit / ask) | App preferences |
| Active chat transcript | App preferences (capped; mirrors the active session) |
| Chat sessions (list + titles) | App preferences (`beatbax:ai.sessions`, `beatbax:ai.activeSessionId`) |
| Submitted prompt recall (↑/↓ in the input) | App preferences (`beatbax:ai.promptHistory`) |
| **API key** | OS **secure credential store** via the Electron main process (not `localStorage`) |

Use **Settings → AI → Clear key** to remove a stored API key. **Clear ↑/↓ prompts** only forgets input recall — it does not delete chat sessions.

## Edit mode vs Ask mode

Toggle the mode in the panel header:

- **Edit mode** — the assistant outputs a complete updated song in a fenced `bax` block, then a short **what/why** explanation. The song is applied to the editor immediately. Parse-error self-correction and incomplete-song repair run a few times before giving up. Incomplete replies that would wipe most of the song are **blocked**. Applied changes can be reviewed in the editor (see below) and undone with `Ctrl+Z` / `Cmd+Z`.
- **Ask mode** — the assistant answers questions and can include code snippets, but does not modify the editor.

## Chat sessions

The Copilot header has a **+** button for **New chat** and a session menu to switch between earlier threads.

- **New chat** starts an empty transcript without deleting the previous session.
- The menu lists chats by title (from the first user prompt) and shows per-session token totals when available.
- Delete a session from the menu to discard that thread permanently.
- Switching songs does **not** auto-create a session — start **New chat** when you want a clean thread for a different file.

## Reviewing applied edits

After an Edit apply with structural changes, the editor shows a review banner:

- **↑ / ↓** — move between changed definitions (patterns, sequences, instruments, and so on).
- **✓ Keep** — accept the current highlighted change.
- **✗ Discard** — revert that change back to the pre-edit song.

Changes are classified as **added**, **updated**, **removed**, or **moved**. A **moved** definition is the same body on a different line (for example rearranging `pat` blocks between sections) — Copilot treats that as a relocation, not a body edit. **Discard** on a moved item restores it to its original line.

When every change has been kept or discarded, the banner closes. The Copilot transcript shows a summary card with the model’s explanation and a collapsible **N changes** list. Click a change to jump to it in the editor.

While review is open, the applied message also offers an **Actions** menu:

- **Keep remaining** / **Discard remaining** — settle all pending hunks at once.
- **Revert entire edit** — restore the whole song to its pre-edit state.

Edits with no line diff skip the banner and show **✓ Kept in editor** immediately. `Ctrl+Z` / `Cmd+Z` still works in the editor; the transcript is not updated automatically when you undo.

## Referencing editor lines

Right-click a selection in the song editor and choose **Add Selection to Copilot** (or open `F1` and search for that command). Copilot adds a removable **Line N** / **Lines N–M** chip above the input and includes those lines when you send the message — useful for “explain this pattern” or “change only this section” without pasting manually.

## Prompt input recall

Press **↑** / **↓** in the Copilot input to cycle through previously **submitted** prompts. This is separate from chat sessions: it only recalls what you typed, not full assistant replies.

## Context meter and token usage

The footer shows an estimated **model window** fill % for the **next** request (instructions + song + packed chat history + your message + room reserved for the reply). Hover or click the meter for a breakdown:

- **Instructions + song** — system prompt and live editor content.
- **Chat** — recent turns from the active session (prior full-song Edit replies are summarized, not resent verbatim).
- **This message** — your current draft, or the last sent question if the box is empty.
- **Room for reply** — reserved completion budget (8192 tokens Edit / 2048 Ask).

When the meter is high or full, start **New chat** or switch to a shorter thread. An empty composer is not 0% — the system prompt and reserved reply space are always counted.

When the provider returns OpenAI-compatible `usage`, assistant messages show **prompt → completion** token counts (for example `1.2k → 800`). Local servers that omit `usage` fall back to character-based estimates.

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

- The current editor content (**full song in Edit**; **Ask song excerpt** cap in Ask).
- Current diagnostics (errors and warnings).
- Recent conversation history from the **active session** (last 10 turns; oversized prior Edit songs are stubbed to summaries so the live file stays authoritative).
- A chip-aware language reference.

## Arrangement layout fixes

When the [Pattern Grid](/docs/tools/pattern-grid) is enabled and a song uses a **phased** or **monolithic** layout, parse diagnostics may suggest improvements so section focus and the section lane work better.

Copilot can respond to those hints with a short proposal (split monolithic channel sequences, restructure phased sections into `# --- Section N ---` headers, or add section header comments). Reply **yes** / **run it** / **apply split** in chat to run the matching [command palette](/docs/tools/editor#command-palette) action **locally** — no extra model call, and the same commands you can run yourself from `F1`.

Review the buffer edit, then save when satisfied. These commands only change the open editor; they do not alter playback until you apply the updated source.

## Local Ollama setup

For fully private inference:

1. Install [Ollama](https://ollama.com/) and run `ollama serve`.
2. Pull a **code-oriented** model (recommended: `qwen2.5-coder:7b` on ~8 GB GPUs).
3. In BeatBax: **Settings → Features** → enable **AI Copilot**.
4. **Settings → AI** → preset **Ollama (local)** → refresh models and select yours.
5. Set **Model token window** to match your Ollama `num_ctx` (see below).

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

Tips: start **New chat** before a large Edit on a long thread; use Ask for explanations; raise `num_ctx` and match **Model token window**, or use a cloud model if local edits keep failing.

## Security notes

- Cloud API keys live in the OS secure credential store on your machine only. Prefer a limited or low-spend key.
- Only printable ASCII characters are accepted as API keys.
- AI-generated code is validated by the BeatBax parser before apply. It is treated as text, not executed as JavaScript.
- Assistant responses are sanitised before rendering.
- Local Ollama / LM Studio keep all data on-device.

## Related docs

- [BeatBax Desktop](/docs/tools/desktop)
- [Settings](/docs/tools/settings)
- [Channel Mixer](/docs/tools/channel-mixer)
- [Song Visualizer](/docs/tools/song-visualizer)
- [Pattern Grid](/docs/tools/pattern-grid)
