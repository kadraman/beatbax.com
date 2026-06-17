---
sidebar_position: 1
title: Overview
---

# BeatBax Development

BeatBax is developed in a single <span class="docsTooltip" tabindex="0" data-tooltip="A repository that contains multiple related packages or apps, so shared code, scripts, and versioning can live together.">monorepo</span> on [GitHub](https://github.com/kadraman/beatbax). Clone the repository when you want to work on the engine, plugins, CLI, web app, or desktop app.

## Prerequisites

Before cloning the repository, install:

- **Node.js 20 or newer** - BeatBax uses the npm workspace tooling that ships with Node.
- **npm** - installed with Node.js; use it for dependencies, builds, and workspace scripts.
- **Git** - required to clone the monorepo and work with branches.
- **A code editor** - Cursor, VS Code, or another TypeScript-friendly editor works well.

For desktop app development, also install the platform build tools required by Electron and native npm packages:

- **Windows** - [Visual Studio Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/) with the **Desktop development with C++** workload.
- **macOS** - [Xcode Command Line Tools](https://developer.apple.com/xcode/resources/) via `xcode-select --install`.
- **Linux** - common build packages such as `build-essential`; on Debian/Ubuntu, install them with `sudo apt install build-essential`. See the [Electron Linux build dependencies](https://www.electronjs.org/docs/latest/development/build-instructions-linux) for additional distro packages.

## Clone and Build

```powershell
git clone https://github.com/kadraman/beatbax.git
cd beatbax
npm install
npm run build-all
```

## Development Areas

- [Engine](/docs/development/engine) - parser, resolver, playback model, chip backends, rendering, validation, and exporters.
- [Plugins](/docs/development/plugins) - extension points for new sound chip backends, export targets, and integrations.
- [CLI](/docs/development/cli) - local development for the command-line tool and scripted workflows.
- [Web App](/docs/development/web-app) - browser client development for the hosted web-lite experience.
- [Desktop App](/docs/development/desktop-app) - Electron IDE development, packaging, and desktop-only features.
