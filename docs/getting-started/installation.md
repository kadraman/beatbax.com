---
sidebar_position: 1
title: Installation
---

**BeatBax** is available as [BeatBax Desktop](/docs/tools/desktop), the [BeatBax web-lite client](/docs/tools/web-client), or the [BeatBax CLI](/docs/tools/cli) — each serving slightly
different needs.

## BeatBax Desktop (recommended)

For the full **BeatBax** experience, [BeatBax Desktop](/docs/tools/desktop) is recommended. Download a suitable installer for your platform from the [Download page](/download).

Supported platforms:

- **Windows** — setup `.exe` or portable `.exe`
- **macOS** — `.dmg` or arm64 `.zip`
- **Linux** — `.deb` or `.AppImage`

> **Code signing caution**
>
> Please note: installers are not yet code-signed. Windows SmartScreen and macOS Gatekeeper may warn on first install. See `README.txt` in the install folder for platform-specific steps.

## BeatBax web-lite client

No install required — open [app.beatbax.com](https://app.beatbax.com) in a modern browser for editing and playback. For song exports, [BeatBax Copilot](/docs/tools/copilot), Song Visualizer, and the full Settings UI, use [BeatBax Desktop](/docs/tools/desktop) instead.

## BeatBax CLI

Install the published CLI from npm:

```powershell
npm install -g @beatbax/cli
beatbax --help
```

Or run without a global install: `npx @beatbax/cli --help`.

See [BeatBax CLI](/docs/tools/cli) for the command reference.
