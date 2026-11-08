import {useEffect, useState, type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import {siteLinks} from '@site/src/config/site';

import styles from './index.module.css';

type Screenshot = {
  src: string;
  alt: string;
  title: string;
};

const screenshots: Screenshot[] = [
  {
    src: '/img/desktop-screenshot-1.png',
    alt: 'BeatBax Desktop IDE',
    title: 'BeatBax Desktop',
  },
  {
    src: '/img/web-ui-screenshot-1.png',
    alt: 'BeatBax web-lite client',
    title: 'BeatBax web-lite client',
  },
  {
    src: '/img/cli-screenshot.png',
    alt: 'BeatBax CLI',
    title: 'BeatBax CLI',
  },
];

const features = [
  {
    title: 'Live-code chiptunes',
    description:
      'Write songs in .bax files with a simple grammar for instruments, patterns, sequences, and effects - create authentic retro console-style sounds.',
    link: '/docs/tutorial/overview',
    linkLabel: 'Language tutorial',
  },
  {
    title: 'Sound Chips & Plugins',
    description:
      'Compose with emulated Game Boy, NES, SMS, and AY-3-8910 sound chips, add new chip backends and export targets through plugins.',
    link: '/docs/chips/overview',
    linkLabel: 'Sound chips',
  },
  {
    title: 'Export for homebrew',
    description:
      'Export songs to hUGETracker (UGE), FamiTracker text, WAV, MIDI, and more so your songs can be used in homebrew game projects.',
    link: '/docs/exports/uge',
    linkLabel: 'Export guides',
  },
  {
    title: 'BeatBax Desktop',
    description: (
      <>
        Complete Desktop environment for Windows, macOS, and Linux with code editor, channel
        mixer, visualizer, pattern grid, instrument editor and{' '}
        <Link to="/docs/tools/copilot">BeatBax Copilot</Link> AI assistant.
      </>
    ),
    link: '/docs/tools/desktop',
    linkLabel: 'BeatBax Desktop',
  },
  {
    title: 'BeatBax web-lite client',
    description: (
      <>
        Try <b>BeatBax</b> in the browser at <Link href={siteLinks.webApp}>app.beatbax.com</Link>{' '}
        — no install required — for quick demos, lightweight edits and go-anywhere creation.
      </>
    ),
    link: siteLinks.webApp,
    linkLabel: 'Open web-lite client',
    external: true,
  },
  {
    title: 'BeatBax CLI',
    description: (
      <>
        Play, verify, export, inspect, and convert samples from the command line for scripted and headless workflows.
      </>
    ),
    link: '/docs/tools/cli',
    linkLabel: 'BeatBax CLI',
  },
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--beatbax', styles.heroBanner)}>
      <div className="container text--center">
        <img
          src="/img/logo-transparent-bg.png"
          alt="BeatBax"
          className="heroLogo"
        />
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className="ctaRow">
          <Link className="button button--lg ctaPrimary" to="/download">
            Download
          </Link>
          <Link
            className="button button--lg ctaSecondary"
            href={siteLinks.webApp}>
            Try in Browser
          </Link>
          <Link className="button button--lg ctaSecondary" to="/docs/intro">
            Read the Docs
          </Link>
        </div>
      </div>
    </header>
  );
}

function FeatureGrid() {
  return (
    <section className="featuresSection">
      <div className="container">
        <div className="featuresGrid">
          {features.map(({title, description, link, linkLabel, external}) => (
            <article key={title} className="featureCard">
              <h3>{title}</h3>
              <p>{description}</p>
              {link ? (
                <Link
                  className="featureCardLink"
                  {...(external ? {href: link} : {to: link})}>
                  {linkLabel ?? 'Learn more'} →
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Screenshots() {
  const [lightbox, setLightbox] = useState<Screenshot | null>(null);

  useEffect(() => {
    if (!lightbox) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightbox(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [lightbox]);

  return (
    <section className="screenshotSection">
      <div className="container">
        <Heading as="h2" className="text--center margin-bottom--lg">
          Write, Play, Export - retro console chiptunes.
        </Heading>
        <div className="screenshotGrid">
          {screenshots.map((shot) => (
            <figure key={shot.src} className="screenshotCard">
              <button
                type="button"
                className="screenshotThumb"
                onClick={() => setLightbox(shot)}
                aria-label={`View larger: ${shot.alt}`}>
                <img src={shot.src} alt={shot.alt} />
              </button>
              <figcaption className="screenshotTitle">{shot.title}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      {lightbox ? (
        <div
          className="screenshotLightbox"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
          onClick={() => setLightbox(null)}>
          <button
            type="button"
            className="screenshotLightboxClose"
            aria-label="Close"
            onClick={() => setLightbox(null)}>
            ×
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="screenshotLightboxImage"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Live-coding language for retro console chiptunes"
      description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <FeatureGrid />
        <Screenshots />
      </main>
    </Layout>
  );
}
