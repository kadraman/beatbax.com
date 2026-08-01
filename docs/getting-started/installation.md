---
sidebar_position: 1
title: Installation
---

BeatBax is available as a native desktop client, as a web-lite browser client, or as a CLI — with each "client" serving slightly
different needs.

## BeatBax Desktop (recommended)

For the full **BeatBax** experience the native desktop client is recommended. Download a suitable desktop dlient installer for your chosen platform from the [Download page](/download) or [GitHub Releases](https://github.com/kadraman/beatbax/releases) (tags `desktop-v*`).

Supported platforms:

- **Windows** — setup `.exe` or portable `.exe`
- **macOS** — `.dmg` or arm64 `.zip`
- **Linux** — `.deb` or `.AppImage`

> **Code signing caution**
>
> Please note: installers are not yet code-signed. Windows SmartScreen and macOS Gatekeeper may warn on first install. See `README.txt` in the install folder for platform-specific steps.

## BeatBax web-lite browser client

No install required — simply open [app.beatbax.com](https://app.beatbax.com) in a modern browser for editing and playback. For song exports, BeatBax Copilot, Song Visualizer, and the full Settings UI, use BeatBax Desktop instead.

## BeatBax CLI

Install the published CLI from npm:

```powershell
npm install -g @beatbax/cli
beatbax --help
```

Or run without a global install: `npx @beatbax/cli --help`.

See [CLI](/docs/tools/cli) for the command reference.
