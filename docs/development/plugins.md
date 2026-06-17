---
sidebar_position: 3
title: Plugins
---

# Plugin Development

Plugins extend BeatBax with additional sound chip backends, export targets, and integration points. Start here when a feature should be usable across the CLI, web app, and desktop app instead of living in one UI.

## Common Plugin Areas

- **Sound chip backends** - add support for another emulated sound chip or chip family.
- **Export targets** - write a new song, tracker, audio, or data format.
- **Import sources** - resolve shared instruments or song assets from new locations.
- **Tool integrations** - expose engine functionality to external workflows.

## Development Flow

Most plugin work starts by defining or extending the engine-level contract, then wiring that capability into the CLI and apps.

```powershell
npm run engine:build
npm run cli:build
npm test
```

For new chip support, validate both rendered audio behavior and exporter behavior where applicable. For new export targets, include small `.bax` fixtures that cover timing, instruments, metadata, and edge cases.

## Related Docs

- [Sound chips](/docs/chips/overview)
- [Engine development](/docs/development/engine)
- [CLI development](/docs/development/cli)
