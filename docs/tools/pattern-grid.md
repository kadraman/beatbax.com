---
sidebar_position: 4
title: Pattern Grid
---

# Pattern Grid (Experimental)

The **Pattern Grid** is a timeline of the resolved song: one row per chip channel, with pattern blocks laid out in time and a playhead that follows playback.

It is the main surface for **section focus** (hearing one arrangement section across every channel), **Pos-ruler seek and loop** on the full song, and (on Desktop) **zoom / scroll** so long arrangements stay readable.

> On [BeatBax Desktop](/docs/tools/desktop), Pattern Grid is marked **Experimental** in [Settings](/docs/tools/settings) and disabled by default.

> The [web-lite client](/docs/tools/web-client) includes a **cutdown** Pattern Grid (timeline + section focus). Desktop-only extras such as zoom controls are not available there yet.

## Enabling the grid

### Desktop

1. Open [BeatBax Desktop](/docs/tools/desktop).
2. Press `Ctrl+,` / `Cmd+,` (or **View → Settings…**) to open **Settings**.
3. On the **Features** tab, enable **Pattern Grid**.
4. Close Settings. The grid appears above the editor.

The transport bar stays in sync with the grid playhead.

### Web-lite

Open [app.beatbax.com](https://app.beatbax.com) and apply a song — the cutdown grid is available in the web-lite UI without a Settings feature flag.

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
| Click a section **name** | **Focus** that section — highlights the column in the grid, decorates matching `seq` lines or the authored `section` block in the editor, and scopes transport playback. Does **not** start audio. |
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

After **Apply** or **Live** re-parses the song, an active section focus **rebinds** to the same section (matched by authored `section` name, `# --- Section … ---` headword, or primary `seq` name) and refreshes grid highlights and editor decorations to the new line numbers.

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

Prefer authored [`section` / `form`](/docs/language/composition) for new multi-part songs. Classic multi-seq layouts still work when each `channel` line lists the same number of **top-level** `seq` references in the same order.

| Layout | Typical shape | Section lane |
| --- | --- | --- |
| **Structured** | Two or more authored `section`s plus a `form` (or classic `# --- Section N: … ---` comment blocks with cross-channel `seq` defs) | Full section lane. For `section` / `form`, labels use the section name and focus highlights the authored `section` block (generated `<section>_<role>` seqs have no `seq name =` lines). Comment-header songs highlight the comment + role `seq` lines. |
| **Phased** | Matching `seq` tokens per channel (`intro`, `main`, `bridge`, …) without section headers | Slice play and column highlight work; editor grouping is weaker |
| **Monolithic** | One long `seq` per channel for the whole song, or a song with only **one** authored `section` | Focus selects the **entire** timeline; pat-block navigation and **F6** on individual pats still work. Comment headers alone do **not** create Pattern Grid sections on a monolithic song. |

After a successful parse, BeatBax may show **info** diagnostics on the first `channel` line suggesting layout improvements. Those hints prefer migrating to `section` / `form` with `channel auto` (or `role` + `form`). Classic alternatives remain available.

### Arrangement layout commands

Open the [command palette](/docs/tools/editor#command-palette) (`F1` or `Ctrl+Shift+P` / `Cmd+Shift+P`) and search for:

| Command | Purpose |
| --- | --- |
| **Play Arrangement Slice** | Focus and play the section at the editor cursor (only when Pattern Grid is on and visible) |
| **Arrange: Add Section Header Comments** | Insert `# --- Section N: … ---` markers for classic structured layouts (does not rewrite into `section` / `form`) |
| **Arrange: Restructure Phased Sections into Headers** | Rewrite channel-grouped phased `seq` defs into section header blocks (opt-in buffer edit) |
| **Arrange: Split Monolithic Channel Sequences** | Split one long `seq` per channel into aligned section sequences (opt-in buffer edit) |

These three **Arrange** commands are the classic local transforms. They do not convert a song into `section` / `form` syntax. [BeatBax Copilot](/docs/tools/copilot) can propose the same classic fixes when diagnostics mention section focus — confirm in chat to run the matching command locally without a model round-trip. When you ask Copilot to improve section focus in Edit/Ask, it prefers authored `section` / `form` / `channel auto` over comment headers.

## Keyboard shortcuts (section focus)

| Key | Action |
| --- | --- |
| **F5** | Play (focused section when section focus is on) |
| **F6** | Focus section at cursor (no play) |
| **F8** | Stop (keeps section focus) |
| **Esc** | Exit section focus |
| **Alt+←** | Previous section (while focused) |
| **Alt+→** | Next section (while focused) |

## Pos ruler — seek and loop

Above the section lane, the **Pos** row is an interactive timeline for the **full song** (separate from section focus).

| Gesture | Result |
| --- | --- |
| **Click** the ruler | Sets a green **pending start** flag. **Play** begins there; **Stop** returns to the beginning. |
| **Click** while playing | Seeks playback to that block (ahead or behind). |
| **Click** while paused | Stops at the clicked position. |
| **Drag** across the ruler | Sets a blue **loop range** on all rows and turns transport **Loop** on. **Play** repeats that range; drag the handles to adjust; **✕** clears it. |
| Transport **Loop** off | The range dims and **Play** ignores it until Loop is on again. |
| **Alt+click** / **Alt+drag** | Snaps to steps instead of pattern boundaries. |

While a loop is active, clicking the ruler turns Loop off and sets a new start flag. Pause / resume inside the loop does not drift. Seeking mid-note retriggers the remaining sustain from that point.

Section focus still uses a temporary song slice for one column. The Pos ruler seeks and loops the **resolved full song**.

## Zoom and scroll

For long songs, the grid no longer always stretch-fits every step into the panel (which made blocks too small to click). Desktop Pattern Grid zoom (session-only; resets when you open another song or create a new file):

| Control | Behaviour |
| --- | --- |
| **Auto** (default) | Keeps a readable minimum scale from the panel width. Short songs still fit with no scrollbar; long songs use the minimum scale and **scroll horizontally**. Widening the panel shows more of the song before scrolling. |
| **Fit** | Forces the whole arrangement into the viewport (blocks may shrink below the readable minimum). |
| **−** / **+** | Zoom out / in (leaves Auto for an explicit scale). |
| **Ctrl+wheel** / **Cmd+wheel** | Zooms about the step under the pointer. |
| **Shift+wheel** / trackpad horizontal scroll | Pans when content overflows. |

Channel mute/solo labels stay sticky while the ruler, section lane, and channel tracks scroll together. Playhead, loop range, start flag, and section-focus column stay aligned with the underlying steps at every zoom. Dragging a loop or start handle near the edge of the visible track **autoscrolls** so you can keep adjusting.

These controls are separate from the Monaco **View → Zoom In / Out / Reset** shortcuts (`Cmd+=` / `Cmd+-` / `Cmd+0`), which only change editor font size.

Web-lite Pattern Grid zoom is not available yet.

## Section focus vs Pos ruler

| | Section focus | Pos ruler |
| --- | --- | --- |
| Scope | One named section column (temporary song slice) | Full resolved song |
| How you set it | Section lane, **F6**, command palette | Click / drag on **Pos** |
| Loop | Transport Loop repeats the focused section | Dragged blue range, gated by transport Loop |

## Related docs

- [BeatBax Desktop](/docs/tools/desktop)
- [BeatBax web-lite client](/docs/tools/web-client)
- [BeatBax Editor](/docs/tools/editor) — command palette commands
- [Composition](/docs/language/composition) — `section` / `form` / `channel auto`
- [Sequences](/docs/language/sequences)
- [Channels](/docs/language/channels)
- [Modifiers](/docs/language/modifiers)
- [Channel Mixer](/docs/tools/channel-mixer)
- [BeatBax Copilot](/docs/tools/copilot)
- [Settings](/docs/tools/settings)
