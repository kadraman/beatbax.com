---
sidebar_position: 0
title: Overview
---

# Tools

BeatBax provides the following tools —  they all share the same song grammar and engine, but each is aimed at a different use case:

## BeatBax Desktop

The recommended client for authoring songs on Windows, macOS, and Linux. [Download](/download) an installer, or see the [Desktop guide](/docs/tools/desktop).

## BeatBax web-lite client

A no-install browser client at [app.beatbax.com](https://app.beatbax.com) for trying the language, playing examples, and sketching songs. See the [web-lite guide](/docs/tools/web-client).

## BeatBax CLI

A command-line client for scripted, utility and headless workflows. Install with `npm install -g @beatbax/cli`, or see the [CLI guide](/docs/tools/cli).

## Feature comparison

| Feature | [Desktop](/docs/tools/desktop) | [Web-lite](/docs/tools/web-client) | [CLI](/docs/tools/cli) |
|---------|--------------------------------|------------------------------------|------------------------|
| Installer | Native platform installers | None — [app.beatbax.com](https://app.beatbax.com) | `npm install -g @beatbax/cli` |
| [New Song Wizard](/docs/tools/new-song-wizard) | Yes | Yes | No |
| Play songs | Yes | Yes | Yes — [with limitations](/docs/tools/cli#headless-audio) |
| [BeatBax Editor](/docs/tools/editor) | Full (CodeLens, command palette) | Syntax, completions, diagnostics | No |
| [MIDI step entry](/docs/tools/midi-step-entry) | Yes | No | N/A |
| Native file access | Yes (**File → Open** / **Save**, recents, associations) | No (Save downloads a `.bax` file) | Yes (filesystem paths) |
| [Instrument Imports](/docs/language/imports) | Yes. `local:`, `github:`, `https://` | Yes. `github:` and `https://` only | Yes. `local:`, `github:`, `https://` |
| [Sound Chip Plugins](/docs/chips/overview) | Yes | Yes (Pre-configured) | Yes |
| [Export Plugins](/docs/exports/overview) | Yes | No | Yes |
| [Song inspection](/docs/tools/cli#inspect) | No | No | Yes (`inspect`) |
| [Sample conversion](/docs/tools/cli#sample-conversion) | No | No | Yes (`wav2dmc`) |
| [Settings](/docs/tools/settings) | Full Settings modal | Theme and toolbar only | CLI flags |
| [Channel Mixer](/docs/tools/channel-mixer) | Yes | Yes | N/A |
| [Pattern Grid](/docs/tools/pattern-grid) | Yes (Experimental) | No | N/A |
| [Song Visualizer](/docs/tools/song-visualizer) | Yes | No | N/A |
| [BeatBax Copilot](/docs/tools/copilot) | Yes | No | N/A |
