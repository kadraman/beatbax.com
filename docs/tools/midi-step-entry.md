---
sidebar_position: 5
title: MIDI step entry
---

# MIDI step entry

**MIDI step entry** is a alternative way to enter notes into a `.bax` pattern from a MIDI keyboard. Notes are stepped into the editor one at a time — it is not a realtime piano-roll recorder.

> The [BeatBax web-lite client](/docs/tools/web-client) has no MIDI step entry. Use [BeatBax Desktop](/docs/tools/desktop).

## Enabling MIDI input

1. Connect a MIDI keyboard or controller.
2. Open [BeatBax Desktop](/docs/tools/desktop).
3. Press `Ctrl+,` / `Cmd+,` (or **View → Settings…**), open the **Editor** tab, and enable **MIDI input**.
4. Close Settings. Arm step entry with the **record** control on the transport bar.
5. Click into a `pat` (or other note list) in the editor, then play keys on the controller.

Each MIDI note inserts a BeatBax pitch token at the cursor and advances, so you can build a phrase without typing note names.

## Scale and lock

If the song declares a [`scale`](/docs/language/metadata-directives#scale-and-channel-locks) and the channel has `lock=…`, Desktop snaps or filters MIDI step entry onto the allowed scale degrees. That matches typed notes: out-of-lock pitches warn or error according to the scale mode (`warn`, `error`, or `off`).

## Related docs

- [BeatBax Desktop](/docs/tools/desktop)
- [Settings](/docs/tools/settings)
- [Notes](/docs/language/notes)
- [Scale and channel locks](/docs/language/metadata-directives#scale-and-channel-locks)
