import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import {desktopDownloads, siteLinks} from '@site/src/config/site';

function DownloadCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="downloadCard">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default function DownloadPage(): ReactNode {
  return (
    <Layout
      title="Download"
      description="Download BeatBax Desktop for Windows, macOS, and Linux. Also available on itch.io and in the browser.">
      <div className="downloadPage">
        <div className="downloadHero">
          <Heading as="h1">Download BeatBax</Heading>
          <p>
            BeatBax Desktop v{siteLinks.latestDesktopVersion} — live-coding IDE
            for retro console chiptunes.
          </p>
          <p>
            <Link className="button button--lg ctaPrimary" href={siteLinks.itch}>
              Download on itch.io
            </Link>
          </p>
        </div>

        <div className="noticeBox">
          <strong>Code signing:</strong> Installers are not code-signed yet.
          Windows SmartScreen and macOS Gatekeeper may warn on first install.
          See README.txt in the install folder for platform-specific steps.
        </div>

        <DownloadCard title="GitHub Releases">
          <p>
            Direct downloads from{' '}
            <Link href={siteLinks.releases}>GitHub Releases</Link> (tag{' '}
            <code>{siteLinks.latestDesktopTag}</code>).
          </p>
          <div className="platformLinks">
            <div className="platformRow">
              <span className="platformLabel">Windows</span>
              <a className="downloadBtn" href={desktopDownloads.windows.setup}>
                Setup (.exe)
              </a>
              <a
                className="downloadBtn downloadBtnSecondary"
                href={desktopDownloads.windows.portable}>
                Portable (.exe)
              </a>
            </div>
            <div className="platformRow">
              <span className="platformLabel">macOS</span>
              <a className="downloadBtn" href={desktopDownloads.mac.dmg}>
                Disk image (.dmg)
              </a>
              <a
                className="downloadBtn downloadBtnSecondary"
                href={desktopDownloads.mac.arm64Zip}>
                arm64 (.zip)
              </a>
            </div>
            <div className="platformRow">
              <span className="platformLabel">Linux</span>
              <a className="downloadBtn" href={desktopDownloads.linux.deb}>
                Debian (.deb)
              </a>
              <a
                className="downloadBtn downloadBtnSecondary"
                href={desktopDownloads.linux.appImage}>
                AppImage
              </a>
            </div>
          </div>
        </DownloadCard>

        <DownloadCard title="Web-lite client">
          <p>
            No download required — open{' '}
            <Link href={siteLinks.webApp}>app.beatbax.com</Link> in a modern
            browser for editing, validation, and playback.
          </p>
          <p>
            Export, Copilot, mixer, and other IDE features require the{' '}
            <Link to="/docs/tools/desktop">desktop app</Link>.
          </p>
        </DownloadCard>

        <DownloadCard title="CLI & development">
          <p>
            Clone the toolchain from{' '}
            <Link href={siteLinks.github}>GitHub</Link> to use the CLI or build
            from source:
          </p>
          <pre>
            <code>{`git clone ${siteLinks.github}.git
cd beatbax
npm install
npm run build-all
node bin/beatbax --help`}</code>
          </pre>
          <p>
            See the <Link to="/docs/tools/cli">CLI documentation</Link> for
            commands.
          </p>
        </DownloadCard>
      </div>
    </Layout>
  );
}
