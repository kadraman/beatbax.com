import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import {siteLinks} from '@site/src/config/site';

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
          <Heading as="h1">Download BeatBax Desktop</Heading>
          <p>
            <Link to="/docs/tools/desktop">BeatBax Desktop</Link>{' '}
            v{siteLinks.latestDesktopVersion} — the live-coding IDE for retro
            console chiptunes.
          </p>
          <p>
            <Link className="button button--lg ctaPrimary" href={siteLinks.itch}>
              Download on itch.io
            </Link>
          </p>
        </div>

        <div className="noticeBox">
          <strong>Code signing:</strong> Please note Windows installers are not
          currently Authenticode-signed — SmartScreen may warn when you run the installer.          Click <b>'More info'</b> and <b>'Run anyway'</b> to proceed.
          See README.txt in the install folder for more details.

          macOS installers are Developer ID signed and notarized, but may still ask you to 
          click <b>'Open anyway'</b> to proceed.
        </div>

        <DownloadCard title="BeatBax web-lite client">
          <p>
            Try <b>BeatBax</b> with no download required using a modern browser such as
            Chrome, Firefox, or Edge:
          </p>
          <p className="downloadCardCta">
            <Link className="downloadBtn" href={siteLinks.webApp}>
              app.beatbax.com
            </Link>
          </p>
          <p>
            <i>Please note: Song export, <Link to="/docs/tools/copilot">BeatBax Copilot</Link>, Channel Mixer, Visualizer and other enhanced features require{' '}
            <Link to="/docs/tools/desktop">BeatBax Desktop</Link></i>.
          </p>
        </DownloadCard>

        <DownloadCard title="BeatBax CLI">
          <p>
            Install the <Link to="/docs/tools/cli">BeatBax CLI</Link> from{' '}
            <Link href="https://www.npmjs.com/package/@beatbax/cli">npm</Link>{' '}
            for scripted playback, validation, exports, and sample conversion:
          </p>
          <pre>
            <code>{`npm install -g @beatbax/cli
beatbax --help`}</code>
          </pre>
          <p>
            See the <Link to="/docs/tools/cli">BeatBax CLI</Link> documentation for
            installation notes and command reference.
          </p>
        </DownloadCard>

        <DownloadCard title="Development">
          <p>
            Clone the <b>BeatBax</b> toolchain from{' '}
            <Link href={siteLinks.github}>GitHub</Link> to work on the engine,
            plugins, CLI, web or desktop apps:
          </p>
          <pre>
            <code>{`git clone ${siteLinks.github}.git
cd beatbax
npm install
npm run build-all`}</code>
          </pre>
          <p>
            See the <Link to="/docs/development/overview">development guide</Link>{' '}
            for more details.
          </p>
        </DownloadCard>
      </div>
    </Layout>
  );
}
