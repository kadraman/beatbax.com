---
sidebar_position: 1
title: Installation
---

BeatBax is available as a desktop app, browser client, or CLI from the toolchain repository.

## Desktop (recommended)

Download installers from the [Download page](/download) or [GitHub Releases](https://github.com/kadraman/beatbax/releases) (tags `desktop-v*`).

Supported platforms:

- **Windows** — setup `.exe` or portable `.exe`
- **macOS** — `.dmg` or arm64 `.zip`
- **Linux** — `.deb` or `.AppImage`

> **Code signing caution**
>
> Installers are not code-signed yet. Windows SmartScreen and macOS Gatekeeper may warn on first install. See `README.txt` in the install folder for platform-specific steps.

## Web-lite App

No install required — open [app.beatbax.com](https://app.beatbax.com) in a modern browser.

## CLI / development

Clone the [beatbax toolchain](https://github.com/kadraman/beatbax) and build from source:

```powershell
git clone https://github.com/kadraman/beatbax.git
cd beatbax
npm install
npm run build-all
node bin/beatbax --help
```

See [CLI](/docs/tools/cli) for command reference.
