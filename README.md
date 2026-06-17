# beatbax.com

Marketing site and documentation for [BeatBax](https://github.com/kadraman/beatbax) — a live-coding language and toolchain for retro console chiptunes.

>See live at [beatbax.com](https://beatbax.com).

## Development

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

## Project structure

- `src/pages/` - landing, download pages etc.
- `src/components/` - custom components used in pages
- `src/config/site.ts` — external URLs
- `src/css/custom.css` — custom CSS
- `docs/` - user facing documentation
- `sidebar.ts` - custom sidebar
- `static` — logos, screenshots etc.

## Deploy (with IONOS Deploy Now)

1. Push this repository to GitHub (`kadraman/beatbax.com`).
2. Sign in to [IONOS Deploy Now](https://ionos.space) and click **Add new project**.
3. Select the `beatbax.com` repository. Deploy Now should auto-detect **Docusaurus**.
4. Confirm build settings:
   - **Build command:** `npm ci && npm run build`
   - **Publish directory:** `build`
5. Connect the custom domain **beatbax.com** in the Ionos dashboard (SSL is provisioned automatically).
6. Ionos adds GitHub Actions workflow files on setup; subsequent pushes to `main` trigger deploys.

## License

MIT — see [LICENSE](LICENSE).
