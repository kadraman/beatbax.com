import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import {siteLinks} from '@site/src/config/site';

import styles from './index.module.css';

const features = [
  {
    title: 'Live-code chiptunes',
    description:
      'Write songs in .bax files with a simple grammar for instruments, patterns, sequences, and effects — create authentic retro console-style sounds.',
    link: '/docs/tutorial/overview',
    linkLabel: 'Language tutorial',
  },
  {
    title: 'Sound Chips & Plugins',
    description:
      'Compose with emulated Game Boy, NES, SMS, and AY-3-8910 sound chips, then add new chip backends and export targets through plugins.',
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
    title: 'Desktop App',
    description:
      'Full Electron Desktop app for Windows, macOS, and Linux with Monaco editor, channel mixer, visualizer and BeatBax Copilot AI assistant.',
    link: '/docs/tools/desktop',
    linkLabel: 'Desktop app',
  },
  {
    title: 'Web-lite App',
    description: (
      <>
        Try BeatBax in the browser at <Link href={siteLinks.webApp}>app.beatbax.com</Link>{' '}
        - no install required - for quick demos, lightweight edits and go anywhere creation.
      </>
    ),
    link: siteLinks.webApp,
    linkLabel: 'Open web app',
    external: true,
  },
  {
    title: 'CLI toolchain',
    description:
      'Play, verify, export, inspect, and convert samples from the command line for scripted and headless workflows.',
    link: '/docs/tools/cli',
    linkLabel: 'CLI reference',
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
  return (
    <section className="screenshotSection">
      <div className="container">
        <Heading as="h2" className="text--center margin-bottom--lg">
          Write, Play, Export - retro console chiptunes.
        </Heading>
        <div className="screenshotGrid">
          <figure className="screenshotCard">
            <img
              src="/img/desktop-screenshot-1.png"
              alt="BeatBax Desktop IDE"
            />
            <figcaption>BeatBax Desktop — full IDE with export and Copilot</figcaption>
          </figure>
          <figure className="screenshotCard">
            <img
              src="/img/web-ui-screenshot-1.png"
              alt="BeatBax Web UI"
            />
            <figcaption>Web-lite App — try in your browser</figcaption>
          </figure>
        </div>
      </div>
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
