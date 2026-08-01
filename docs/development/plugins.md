---
sidebar_position: 3
title: Plugins
---

# Plugin Development

Plugins extend BeatBax with additional sound chip backends, export targets, and integration points. Start here when a feature should be usable across the CLI, web app, and desktop app instead of living in one UI.

## Common Plugin Areas

- **Sound chip backends** — e.g. `@beatbax/plugin-chip-sms`, `@beatbax/plugin-chip-spectrum-128`
- **Export targets** — e.g. `@beatbax/plugin-exporter-vgm`, `@beatbax/plugin-exporter-arkos`, `@beatbax/plugin-exporter-famitracker`
- **Import sources** — resolve shared instruments or song assets from new locations
- **Tool integrations** — expose engine functionality to external workflows

## Registration

Register chip plugins and exporter plugins **explicitly** with the engine/host registries. Chip plugins may declare related exporters via `exporterPlugins`, or the host/CLI may import and register exporter packages at startup. Do not rely on async chip-exporter auto-resolution.

Exporters should prefer **payload-first** returns (`ExportPayload` / bytes / string) when `outputPath` is omitted so desktop and browser hosts can download results.

Optional chip hooks: `configureForSong(ChipSongContext)`, `validateSong()`, `getMeterDisplayGain()`, wizard metadata (`NewSongWizardMetadata`, `status`).

## Development Flow

```powershell
npm run engine:build
npm run cli:build
npm test
```

For new chip support, validate both rendered audio behavior and exporter behavior where applicable. For new export targets, include small `.bax` fixtures that cover timing, instruments, metadata, and edge cases.

Useful upstream guides:

- [SMS plugin README](https://github.com/kadraman/beatbax/blob/main/packages/plugins/chip-sms/README.md)
- [Spectrum plugin README](https://github.com/kadraman/beatbax/blob/main/packages/plugins/chip-spectrum-128/README.md)
- [Creating plugins](https://github.com/kadraman/beatbax/blob/main/docs/contributing/creating-plugins.md)

## Related Docs

- [Sound Chip Plugins](/docs/chips/overview)
- [Engine development](/docs/development/engine)
- [CLI development](/docs/development/cli)
