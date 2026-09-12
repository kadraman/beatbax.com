---
sidebar_position: 4
title: Pattern Grid
---

# Pattern Grid (Experimental)

The **Pattern Grid** is a **desktop-only** timeline of the resolved song: one row per chip channel, with pattern blocks laid out in time and a playhead that follows playback.

It is also the main surface for **section focus** — hearing one arrangement section (for example all four `theme_*` parts together) across every channel without editing your `.bax` source.

> The Pattern Grid is marked **Experimental** in [Settings](/docs/tools/settings) and disabled by default.

> The [BeatBax web-lite client](/docs/tools/web-client) does not include the Pattern Grid. Use [BeatBax Desktop](/docs/tools/desktop).

## Enabling the grid

1. Open [BeatBax Desktop](/docs/tools/desktop).
2. Press `Ctrl+,` / `Cmd+,` (or **View → Settings…**) to open **Settings**.
3. On the **Features** tab, enable **Pattern Grid**.
4. Close Settings. The grid appears above the editor.

The transport bar stays in sync with the grid playhead.

## Reading the timeline

Each row is a `channel` from the song. Blocks are the patterns (and sequence items) that channel plays, sized by **musical step length** so you can see how parts line up across voices.

Block widths respect [sequence and pattern modifiers](/docs/language/modifiers) such as `:slow`, `:fast`, `:pal`, `:off`, `:pick`, `:chunk`, and `:shuffle` — the same expanded lengths playback uses, not just raw pattern note counts.

Use the grid to:

- See the arrangement without scanning every `seq` line
- Watch the playhead during **Play** / **Live**
- Mute or solo a channel from the row (same state as the [Channel Mixer](/docs/tools/channel-mixer))
- Spot channels that run shorter or longer than the others
- **Focus and play** one section across all channels (see below)

The grid is an overview of the compiled song, not a tracker piano-roll editor. Change notes and structure in the `.bax` source; **Apply** or **Live** updates the blocks.

## Section lane and section focus

When your song has identifiable top-level sections on each `channel` line, the grid shows a **section lane** (a **Seq** row above the channel rows).

| Action | What it does |
| --- | --- |
| Click a section **name** | **Focus** that section — highlights the column in the grid, decorates matching `seq` lines in the editor, and scopes transport playback. Does **not** start audio. |
| Click **▶** on a section | **Focus and play** that section on all overlapping channels. |
| Right-click a section | **Focus section** or **Play section** from the context menu. |

While **section focus** is active:

- **F5** plays the focused section (full song when focus is off)
- **F8** stops playback but **keeps** section focus
- **F6** focuses the section at the editor cursor (no play)
- **Esc** exits section focus
- **Alt+←** / **Alt+→** moves to the previous / next section
- The status bar shows a read-only **Section focus** pill
- An **Exit focus** control appears in the editor overlay
- Transport **loop**, when enabled, loops the focused section

During **section playback**, the grid playhead and per-channel cursors track progress **inside the focused column** only — not across the full song timeline. After **Stop** (**F8**), the playhead returns to the start of that column while focus stays on.

Section focus builds a temporary slice of the song (same `inst` / `pat` / `seq` definitions, narrowed `channel` lines) and plays it through the normal transport — your editor buffer is never modified.

### Editing while focused

After **Apply** or **Live** re-parses the song, an active section focus **rebinds** to the same section (matched by `# --- Section … ---` headword or primary `seq` name) and refreshes grid highlights and editor decorations to the new line numbers.

- If the focused section **grows or shrinks** (for example you add bars to `lead_intro`), the focus window and slice playback follow the updated boundaries.
- If that section is **removed** from the song, focus exits and the status bar explains why.
- If the section **was playing** when the source changed, playback restarts on the updated slice after rebind.

### Switching sections during playback

- **Alt+←** / **Alt+→**, or choosing another section in the lane, **starts playing** the new section when slice playback is already running.
- When focus is on but playback is **stopped**, switching sections only updates focus and highlights — it does not start audio until you press **F5** or **▶**.

### Pattern blocks in channel rows

Click a **pattern block** in a channel row to jump the editor cursor to that `pat` definition.

Pattern blocks do **not** enter section focus on Desktop — use the section lane, **F6**, or the command palette (below).

## Supported song layouts

Section focus works best when each `channel` line lists the same number of **top-level** `seq` references in the same order.

| Layout | Typical shape | Section lane |
| --- | --- | --- |
| **Structured** | `# --- Section N: … ---` comment blocks with cross-channel `seq` defs | Full section lane, editor highlights section comment + all role `seq` lines |
| **Phased** | Matching `seq` tokens per channel (`intro`, `main`, `bridge`, …) without section headers | Slice play and column highlight work; editor grouping is weaker |
| **Monolithic** | One long `seq` per channel for the whole song | Focus selects the **entire** timeline; pat-block navigation and **F6** on individual pats still work |

After a successful parse, BeatBax may show **info** diagnostics on the first `channel` line suggesting layout improvements (for example phased or monolithic arrangements). These are hints, not errors.

### Arrangement layout commands

Open the [command palette](/docs/tools/editor#command-palette) (`F1` or `Ctrl+Shift+P` / `Cmd+Shift+P`) and search for:

| Command | Purpose |
| --- | --- |
| **Play Arrangement Slice** | Focus and play the section at the editor cursor (only when Pattern Grid is on and visible) |
| **Arrange: Add Section Header Comments** | Insert `# --- Section N: … ---` markers for structured layouts |
| **Arrange: Restructure Phased Sections into Headers** | Rewrite channel-grouped phased `seq` defs into section header blocks (opt-in buffer edit) |
| **Arrange: Split Monolithic Channel Sequences** | Split one long `seq` per channel into aligned section sequences (opt-in buffer edit) |

[BeatBax Copilot](/docs/tools/copilot) can propose the same layout fixes when diagnostics mention section focus — confirm in chat to run the matching command locally without a model round-trip.

## Keyboard shortcuts (section focus)

| Key | Action |
| --- | --- |
| **F5** | Play (focused section when section focus is on) |
| **F6** | Focus section at cursor (no play) |
| **F8** | Stop (keeps section focus) |
| **Esc** | Exit section focus |
| **Alt+←** | Previous section (while focused) |
| **Alt+→** | Next section (while focused) |

## What section focus is not

Section focus is **Phase 0** timeline interaction: play a named section column on all channels via a temporary song slice.

It is **not** yet:

- Drag-to-set a pending start point on the full song timeline
- Drag-to-select an arbitrary loop range on the unresolved song
- Step-accurate seek inside the full song without section focus

Those behaviours are planned as a later Pattern Grid enhancement (engine `startStep` / `endStep` on the full resolved song).

## Related docs

- [BeatBax Desktop](/docs/tools/desktop)
- [BeatBax Editor](/docs/tools/editor) — command palette commands
- [Sequences](/docs/language/sequences)
- [Channels](/docs/language/channels)
- [Modifiers](/docs/language/modifiers)
- [Channel Mixer](/docs/tools/channel-mixer)
- [BeatBax Copilot](/docs/tools/copilot)
- [Settings](/docs/tools/settings)
