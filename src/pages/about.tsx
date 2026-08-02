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
          The idea for <b>BeatBax</b> came about when I was creating homebrew games for
          retro consoles and was looking for an easier way to create game music.
          Although I have created music using DAWs before, as you probably know
          creating chiptune music that can be used in homebrew is very different
          and challenging — and I thought there must be a better way!
        </p>

        <p>
          The idea for a rich text-based grammar for chiptune music came to me when
          I was messing with <Link href="https://strudel.tidalcycles.org/">Strudel</Link>. It
          inspired me to think that it might just be possible to create a
          live-coding language — for homebrew game and chiptune music — that could be
          used across multiple sound chips … and <b>BeatBax</b> was born.
        </p>

        <p>I hope you enjoy.</p>

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
