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

> **Code signing**
>
> Please note Windows installers are not currently Authenticode-signed — SmartScreen may warn when you run the installer.
> Click <b>'More info'</b> and <b>'Run anyway'</b> to proceed.
> See README.txt in the install folder for more details.
>
> macOS installers are Developer ID signed and notarized, but may still 
> may ask you to click <b>'Open anyway'</b> to proceed.

To check installer integrity with `SHA256SUMS` (GitHub Releases or itch.io), see [Verify downloads](/docs/tools/verify-downloads).

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
