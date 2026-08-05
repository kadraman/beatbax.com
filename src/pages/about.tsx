import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import {siteLinks} from '@site/src/config/site';

export default function AboutPage(): ReactNode {
  return (
    <Layout
      title="About"
      description="Meet Kevin (kadraman) and learn why BeatBax — a live-coding language for retro console chiptunes — came about.">
      <div className="downloadPage">
        <div className="downloadHero">
          <Heading as="h1">About BeatBax</Heading>
        </div>

        <p>Hi, I'm Kevin (aka kadraman).</p>

        <p>
          The idea for <b>BeatBax</b> came about when I was developing games for
          retro consoles and looking for an easier way to create in-game music.
          Although I had made music with modern DAWs before, creating chiptune
          music for homebrew games is very different. You have to learn in detail
          how each sound chip works — its capabilities, limitations, and nuances —
          and then learn the formats that different game libraries use for each
          chip. It's a whole lot of work, so I thought there must be a better way!
        </p>

        <p>
          The idea for a rich, text-based grammar for chiptune music came to me
          while messing with{' '}
          <Link href="https://strudel.tidalcycles.org/">Strudel</Link>. It
          inspired me to think it might be possible to create a live-coding
          language for homebrew and chiptune music that works across multiple
          sound chips… and <b>BeatBax</b> was born.
        </p>

        <p>I hope you enjoy it.</p>

        <p>
          <Link href={siteLinks.github}>GitHub</Link>
          {' · '}
          <Link href={siteLinks.patreon}>Patreon</Link>
          {' · '}
          <Link to="/download">Download</Link>
        </p>
      </div>
    </Layout>
  );
}
