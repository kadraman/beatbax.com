---
sidebar_position: 6
title: New Song Wizard
---

# New Song Wizard

The **New Song Wizard** allows you to create a new `.bax` song by picking a [sound chip](/docs/chips/overview) and selecting templates. It inserts a starter file with the matching `chip` directive and a small template so you can play immediately.

> The New Song Wizard is available in [BeatBax Desktop](/docs/tools/desktop) and the [web-lite client](/docs/tools/web-client). 

## Opening the wizard

**Desktop**

- **File → New** or the toolbar **New** control
- First launch also offers the chip picker so a new install is not an empty editor

**Web-lite**

- Toolbar **New** at [app.beatbax.com](https://app.beatbax.com)

## Choosing a chip

Chips are grouped by status, matching the [Sound Chip Plugins](/docs/chips/overview) overview:

| Status | Examples |
|--------|----------|
| Stable | Game Boy, NES |
| Beta | SMS / Game Gear |
| Experimental | ZX Spectrum 128 / CPC |

Pick the console you want to write for. The template’s voices and instrument types follow that chip. You can change `chip` later in the song header if you need a different backend.

## Related docs

- [BeatBax Desktop](/docs/tools/desktop)
- [BeatBax web-lite client](/docs/tools/web-client)
- [Sound Chip Plugins](/docs/chips/overview)
- [Song header](/docs/tutorial/song-header)
- [Metadata directives](/docs/language/metadata-directives)
