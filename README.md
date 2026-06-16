# beatbax.com

Marketing site and documentation for [BeatBax](https://github.com/kadraman/beatbax) — a live-coding language and toolchain for retro console chiptunes.

Live at [beatbax.com](https://beatbax.com) (after deployment).

## Local development

Requires Node.js 20+.

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm run serve
```

Production output is written to `build/`.

## Deploy with IONOS Deploy Now

1. Push this repository to GitHub (`kadraman/beatbax.com`).
2. Sign in to [IONOS Deploy Now](https://ionos.space) and click **Add new project**.
3. Select the `beatbax.com` repository. Deploy Now should auto-detect **Docusaurus**.
4. Confirm build settings:
   - **Build command:** `npm ci && npm run build`
   - **Publish directory:** `build`
5. Connect the custom domain **beatbax.com** in the Ionos dashboard (SSL is provisioned automatically).
6. Ionos adds GitHub Actions workflow files on setup; subsequent pushes to `main` trigger deploys.

## Project structure

- `src/pages/` — landing page and download page
- `src/components/BaxPlayer/` — in-browser `.bax` snippet player (uses `@beatbax/engine`)
- `docs/` — user documentation (migrated from the BeatBax toolchain repo)
- `src/config/site.ts` — external URLs (itch.io, GitHub releases, web app)
- `static/img/` — logos and screenshots

## Docs maintenance

User-facing docs live in this repo. To refresh from the toolchain:

```bash
# Clone beatbax alongside this repo as ../beatbax-toolchain-temp, then:
node scripts/migrate-docs.mjs
```

## License

MIT — see [LICENSE](LICENSE).
