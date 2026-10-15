---
sidebar_position: 4
title: BeatBax Copilot
---

# BeatBax Copilot (AI Assistant)

BeatBax Copilot is an AI chat assistant. It understands the BeatBax language and can help you write songs, answer questions, and debug errors. It is powered by any OpenAI-compatible LLM (OpenAI, Ollama, LM Studio, and others).

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
| Ollama (local) | `http://localhost:11434/v1` | `qwen2.5-coder:7b` |
| LM Studio (local) | `http://localhost:1234/v1` | `local-model` (placeholder; pick the loaded model) |

The **Model** dropdown combines curated options with models fetched live from the provider’s `/models` endpoint, plus **Custom…** for any model ID. Use **Refresh** to reload the list.

Enter an API key when the provider requires one. Ollama and LM Studio run without a key.

Groq is no longer a preset. Its free tier limits each request to 8,000 tokens per minute, counting the prompt and the reply budget, so every Edit request (full song in, full song out) is rejected. Paid Groq plans still work through **Custom** with the endpoint `https://api.groq.com/openai/v1`.

### AI settings (two different “context” controls)

| Setting | What it does |
|---|---|
| **Ask song excerpt** | Character cap on how much of the **open song** is pasted into **Ask** questions only. Presets from 4K to 32K characters. **Edit mode ignores this** and always sends the full song. |
| **Model token window** | The model’s max token limit for **Ask and Edit**. This is the denominator for the footer context meter. For Ollama, set it equal to `num_ctx`. |

OpenAI defaults to 128k tokens (200k for `o3`); Ollama and LM Studio default to 16,384, the recommended minimum `num_ctx` for Edit mode.

To check how well a model or provider handles BeatBax, run the [Copilot test scenarios](https://github.com/kadraman/beatbax/blob/main/docs/qa/copilot-test-scenarios.md) (also linked from **Settings → AI**).

### Reply budget and reasoning effort

**Settings → AI → Advanced** (collapsed by default) controls how much the model may write per reply and how much it reasons first. All three settings default to **Auto**, and each Auto option shows the value in use, for example *Auto (about 5.2k for this chat)*.

| Setting | Auto | Custom range |
|---|---|---|
| **Edit reply budget** | 16,384 tokens on OpenAI (and other endpoints that use `max_completion_tokens`), 8,192 elsewhere, reduced to fit the room left in the **Model token window** (never below 2,048) | 2,048–65,536 tokens |
| **Ask reply budget** | 2,048 tokens, reduced to fit the room left (never below 512) | 512–16,384 tokens |
| **Reasoning effort** | Low | Provider default, Off, Minimal, Low, Medium, High, Custom… |

The reply budget is the most tokens the model may write in one reply, **including hidden reasoning**. A full-song Edit reply needs roughly one token per two characters of song. On Auto, the budget shrinks as the song and chat history grow, so the request never asks for more than the window can hold. A number you enter is always sent as entered; Settings warns if it fills the whole Model token window on its own.

**Reasoning effort** matters for thinking models (OpenAI GPT-5 and o-series, `qwen3`, and similar), which reason before answering and spend that reasoning from the reply budget. Copilot sends it as the `reasoning_effort` request field:

- **Off** — use this for thinking models on a Model token window of 16k or less, so the budget goes on the song.
- **Provider default** — sends nothing and leaves it to the server.
- **Custom…** — sends the value you type exactly (lowercase letters, digits, `-` and `_`, up to 32 characters), for example `xhigh`.

Servers accept different values. If a model rejects one, Copilot tries the nearest alternative (Off tries `none`, then `minimal`, then `low`), and finally sends the request without the field. Settings then shows what happened, for example *Sent as `minimal` for this model* or *This model does not accept reasoning effort*. Copilot remembers rejected parameters for each endpoint and model until you restart the app, so later requests are not rejected again.

**Reset to Auto** returns all three settings to Auto.

### Where settings are stored

| Data | Storage |
|------|---------|
| Endpoint, model, Ask song excerpt, model token window, reply budgets, reasoning effort | App preferences (`beatbax:ai.settings`) |
| Interaction mode (edit / ask) | App preferences |
| Active chat transcript | App preferences (capped; mirrors the active session) |
| Chat sessions (list + titles) | App preferences (`beatbax:ai.sessions`, `beatbax:ai.activeSessionId`) |
| Submitted prompt recall (↑/↓ in the input) | App preferences (`beatbax:ai.promptHistory`) |
| **API key** | OS **secure credential store** via the Electron main process (not `localStorage`) |

Use **Settings → AI → Clear key** to remove a stored API key. **Clear ↑/↓ prompts** only forgets input recall — it does not delete chat sessions.

## Edit mode vs Ask mode

Toggle the mode in the panel header:

- **Edit mode** — the assistant outputs a complete updated song in a fenced `bax` block, then a short **what/why** explanation. The song is applied to the editor immediately. Parse-error self-correction and incomplete-song repair run a few times before giving up. Incomplete replies that would wipe most of the song are **blocked**, and any turn that leaves the editor unchanged says so (see [How Edit results are reported](#how-edit-results-are-reported)). Applied changes can be reviewed in the editor (see below) and undone with `Ctrl+Z` / `Cmd+Z`.

  Copilot asks the model to change only what you requested. Existing `seq` and `channel` entries are kept in order. A new pattern used in a sequence replaces one occurrence of the pattern it was copied from, so the sequence keeps its length. A copied or varied pattern keeps the original's length, and adding an effect does not change a note's duration. Words such as "each", "every" or "all" apply to every matching place, for example every phrase.
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

A reply with no line changes skips the banner and shows **⚠ Not applied — editor unchanged**. `Ctrl+Z` / `Cmd+Z` still works in the editor; the transcript is not updated automatically when you undo.

## How Edit results are reported

The summary card describes what actually reached the editor, not what the model claims it did. This matters most with small local models, which often reformat the whole song, leave definitions out, or need a retry.

- **⚠ Not applied — editor unchanged** appears, with the reason, on every Edit turn that leaves the song as it was: parse errors after retries, an incomplete song, a retry that returned no song, a reply with no `bax` block, a song identical to the current one, or a large reply that only removed comments, reformatted, or reordered lines. The model's reply stays available under the badge (**View returned song**, or **View reply** when it has no code block).
- **No song in the reply.** Copilot asks once more for the full song before giving up.
- **Reply ran out of budget.** When the model stops at the [reply budget](#reply-budget-and-reasoning-effort), Copilot does not retry with the same budget, which would fail the same way. It says which of two things happened, with the token counts: the model spent the whole budget on reasoning and returned no song, or the song was cut off before the end. The message names the setting to change (lower **Reasoning effort**, raise the **Edit reply budget**, or start a **New chat**), and the editor is not changed. In Ask mode, a cut-off answer gets a note suggesting a larger **Ask reply budget**.
- **Definitions left out.** If the reply is invalid only because it omitted definitions your song already has, Copilot merges its new and changed `pat` / `seq` / `inst` / `effect` / `channel` definitions into your song (*Merged definition updates into your song*) instead of asking the model to "repair" it by deleting references. Other lines the merge cannot apply, such as `play` or `bpm`, are listed in a *Not merged* note.
- **Explanation.** The card shows the explanation from the model's first reply. A retry's explanation is used only when the first reply had none, because retries describe fixes to the model's own draft rather than your request.
- **Comment-only changes** are applied for review, with a note that no patterns, sequences, instruments, or other song lines were edited.
- **Explanation mismatch.** When the explanation names patterns, sequences, or effects that were not changed, the card adds a warning that the changes listed are what reached the editor.
- **Line endings.** Replies are converted to your song's line endings first, so a Windows (CRLF) song no longer shows every line as changed.

## Referencing editor lines

Right-click a selection in the song editor and choose **Add Selection to Copilot** (or open `F1` and search for that command). Copilot adds a removable **Line N** / **Lines N–M** chip above the input and includes those lines when you send the message — useful for “explain this pattern” or “change only this section” without pasting manually.

## Prompt input recall

Press **↑** / **↓** in the Copilot input to cycle through previously **submitted** prompts. This is separate from chat sessions: it only recalls what you typed, not full assistant replies.

## Context meter and token usage

The footer shows an estimated **model window** fill % for the **next** request (instructions + song + packed chat history + your message + room reserved for the reply). Hover or click the meter for a breakdown:

- **Instructions + song** — system prompt and live editor content.
- **Chat** — recent turns from the active session (prior full-song Edit replies are summarized, not resent verbatim).
- **This message** — your current draft, or the last sent question if the box is empty.
- **Room for reply** (hatched) — the [reply budget](#reply-budget-and-reasoning-effort) the next request will send.

An empty composer is not 0%, and a high percentage on its own is normal. The system prompt (including the song) is always counted, and on Auto the reply budget grows to fill the room left in the window. For example, a fresh Edit chat on a 140-line song with a 16k window reads over 90% with no warning. The meter's **colour** tells you whether the next reply is at risk:

| Colour | Meaning | What to do |
|---|---|---|
| None | The reply fits | Nothing |
| Amber | Chat history is shrinking the room for the reply | **Start a new chat** (button in the popup) |
| Red | The song's reply will not fit the reply budget, or the request is larger than the window | Raise the **Model token window** (and the server's context, such as Ollama `num_ctx`), set **Reasoning effort** to Off, or use a cloud model. With a reply budget you set yourself, raise it |

When the meter is amber or red, the popup shows a one-line reason, with the token figures when known.

Estimates count song text at about 2 characters per token and other text at about 4. After the provider reports how many prompt tokens a request used, Copilot calibrates its estimates for that model for the rest of the session.

When the provider returns OpenAI-compatible `usage`, assistant messages show **prompt → completion** token counts (for example `1.2k → 800`). When the provider also reports reasoning tokens, the badge adds them, for example `12.3k → 7.5k · 214 reasoning`. A model that reasoned but did not report a count shows `· thinking`. Local servers that omit `usage` fall back to character-based estimates.

### Warning before a large Edit

Before sending an Edit request, Copilot estimates the size of the full-song reply: about one token per two characters of song, plus about 1,000 tokens for reasoning unless **Reasoning effort** is Off or Provider default. If that is larger than the reply budget, Copilot does not send yet. It shows a warning with both numbers, for example *This song needs about 8k tokens to reply, but only about 6k fit in your 16k model window*, with two actions:

- **Send anyway** — send with the current budget. Copilot does not ask again for the same song and settings in this chat.
- **Open Settings** — change the Model token window, reply budget or reasoning effort first.

The warning appears in Edit mode only, and matches a red meter.

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
- Recent conversation history from the **active session** (last 10 turns; oversized prior Edit songs are stubbed to summaries so the live file stays authoritative). In **Edit** mode, earlier Edit turns are left out because small models tend to copy them instead of returning a song. The new request lists up to three earlier Edit requests as already applied, so follow-ups like "now do the same for the bass" still work. Ask turns are still sent.
- A chip-aware language reference.

## Arrangement layout fixes

When the [Pattern Grid](/docs/tools/pattern-grid) is enabled and a song uses a **phased** or **monolithic** layout, parse diagnostics may suggest improvements so section focus and the section lane work better.

Copilot can respond to those hints with a short proposal (split monolithic channel sequences, restructure phased sections into `# --- Section N ---` headers, or add section header comments). Reply **yes** / **run it** / **apply split** in chat to run the matching [command palette](/docs/tools/editor#command-palette) action **locally** — no extra model call, and the same commands you can run yourself from `F1`.

Review the buffer edit, then save when satisfied. These commands only change the open editor; they do not alter playback until you apply the updated source.

## Local models (Ollama and LM Studio)

Copilot can use a model running on your own computer, so your songs never leave it and no API key is needed. [Ollama](https://ollama.com/) and [LM Studio](https://lmstudio.ai/) both work.

Local models work best in **Ask** mode. **Edit** mode is harder: the model has to read your whole song and write the whole song back with your change in it, so it needs a capable model and enough context.

### Choose a model

Use a **code-oriented** model. General chat models often reply with a snippet instead of the full song.

| Model | Memory (approx.) | Notes |
|---|---|---|
| `qwen2.5-coder` 7B | ~5 GB (Q4) | Best starting point on an 8 GB GPU |
| `qwen2.5-coder` 14B | ~12 GB at 16k context (Q4) | Needs about 24 GB of memory or a 16 GB GPU. On a 16 GB Mac it runs partly on the CPU and a full-song Edit takes over 5 minutes, so requests time out |
| `deepseek-coder-v2` 16B | ~10 GB (Q4) | Strong, needs headroom on 8 GB cards |

Avoid models smaller than 7B for Edit mode. Thinking models (they reason before answering) use part of the reply budget for reasoning; on a 16k context, set **Settings → AI → Advanced → Reasoning effort** to **Off**.

### Context size

The model's context must hold the instructions, your song, the chat so far and the reply. For a song of about 140 lines:

| Context | Verdict |
|---|---|
| 8,192 | Too small; expect snippets instead of full songs |
| **16,384** | Recommended minimum |
| 32,768 | Better for long chats or songs over 200 lines; slower and uses more memory |

Whatever you choose, set **Settings → AI → Model token window** to the same number. BeatBax cannot read the server's real context size, so this setting is what the footer meter and the reply budget are based on.

### Ollama

1. Install Ollama and make sure it is running.
2. Pull a model, for example `ollama pull qwen2.5-coder:7b`.
3. Give it a 16k context. Either start the server with `OLLAMA_CONTEXT_LENGTH=16384 ollama serve`, or create a model with the context built in. The second option is recommended on macOS, where the menu-bar app ignores shell variables:

   ```
   FROM qwen2.5-coder:7b
   PARAMETER num_ctx 16384
   ```

   Save that as `Modelfile`, run `ollama create beatbax-coder -f Modelfile`, and restart Ollama. A ready-made copy is in the BeatBax repository as [`docs/ollama/beatbax-coder.Modelfile`](https://github.com/kadraman/beatbax/blob/main/docs/ollama/beatbax-coder.Modelfile).
4. In BeatBax: **Settings → Features** → turn on **AI Copilot**.
5. **Settings → AI** → Provider preset **Ollama (local)**. Press **Refresh** next to Model and pick your model (for example `beatbax-coder`).
6. Set **Model token window** to the context you chose (16384).

### LM Studio

LM Studio works the same way from BeatBax's side, but three of its defaults need changing.

1. In LM Studio, download a model (see the table above).
2. Open the **Developer** tab and start the server. It listens on port 1234. Unlike Ollama, LM Studio does not serve the API until you start it.
3. Load the model with **Context Length** set to at least **16384**. LM Studio's default is often 2,048–4,096, which is far too small for Edit mode.
4. Set **Context Overflow** to **Stop at Limit** (**My Models** → gear icon next to the model → **Inference**). The default, *Truncate Middle*, quietly cuts out the middle of a prompt that is too long, which can be part of your song, and the edit that comes back looks fine but is wrong. With *Stop at Limit*, the reply stops short instead, so you see a failed edit rather than a wrong one.
5. In BeatBax: **Settings → Features** → turn on **AI Copilot**.
6. **Settings → AI** → Provider preset **LM Studio (local)**. Press **Refresh** next to Model and pick the loaded model. The preset's default name, `local-model`, is only a placeholder.
7. Set **Model token window** to the Context Length you loaded the model with.

Prefer a non-thinking model in LM Studio. On some of its engines (notably MLX on Apple silicon) the **Reasoning effort** setting is ignored, so turning it **Off** may not stop a thinking model from using its whole reply budget on reasoning.

### Local model troubleshooting

- **The first request is very slow.** The first request after starting the server loads the model; 1–3 minutes on a 7B model is normal. BeatBax waits at least 5 minutes for a local reply (longer for very large reply budgets).
- **Every request times out.** Check that the model is running on the GPU. With Ollama, look for leftover `llama-server` processes from an earlier session (they hold GPU memory but do not show in `ollama ps`); quit Ollama, end them, and start again.
- **Replies are snippets, or edits keep failing.** Raise the context to 32k (and the Model token window to match), start a **New chat** before a big edit, or try a larger model.
- **The meter is red or Copilot warns before sending.** The song's reply does not fit. Raise the context and Model token window together, set Reasoning effort to Off, or use a cloud model for that edit.
- **An edit is missing parts of the song (LM Studio).** Check that Context Overflow is set to *Stop at Limit* and that the Context Length matches the Model token window.

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
