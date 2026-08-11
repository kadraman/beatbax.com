import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {GRAMMAR_LINKS, type GrammarLink} from './linkMap';
import styles from './styles.module.css';

function Term({link}: {link: GrammarLink}) {
  return (
    <Link className={styles.term} to={link.href} title={link.title ?? link.label}>
      {link.label}
    </Link>
  );
}

function Lit({
  children,
  href,
  title,
}: {
  children: ReactNode;
  href?: string;
  title?: string;
}) {
  if (href) {
    return (
      <Link className={styles.lit} to={href} title={title}>
        {children}
      </Link>
    );
  }
  return (
    <span className={styles.staticLit} title={title}>
      {children}
    </span>
  );
}

function Track({long}: {long?: boolean}) {
  return <span className={long ? styles.trackLong : styles.track} aria-hidden />;
}

function Or() {
  return <span className={styles.or}>|</span>;
}

function Panel({title, children}: {title: string; children: ReactNode}) {
  return (
    <section className={styles.panel} aria-label={title}>
      <h3 className={styles.panelTitle}>{title}</h3>
      {children}
    </section>
  );
}

function ProgramRail() {
  const L = GRAMMAR_LINKS;
  return (
    <Panel title="Program → Statement*">
      <div className={styles.rail}>
        <Term link={L.program} />
        <Track long />
        <Term link={L.statement} />
        <Track />
        <div className={styles.branch}>
          <Lit href={L.chip.href} title={L.chip.title}>
            {L.chip.label}
          </Lit>
          <Or />
          <Lit href={L.bpm.href} title={L.bpm.title}>
            {L.bpm.label}
          </Lit>
          <Or />
          <Lit href={L.volume.href} title={L.volume.title}>
            {L.volume.label}
          </Lit>
          <Or />
          <Lit href={L.stepsPerBar.href} title={L.stepsPerBar.title}>
            {L.stepsPerBar.label}
          </Lit>
          <Or />
          <Lit href={L.scale.href} title={L.scale.title}>
            {L.scale.label}
          </Lit>
          <Or />
          <Lit href={L.song.href} title={L.song.title}>
            {L.song.label}
          </Lit>
          <Or />
          <Lit href={L.importStmt.href} title={L.importStmt.title}>
            {L.importStmt.label}
          </Lit>
          <Or />
          <Lit href={L.inst.href} title={L.inst.title}>
            {L.inst.label}
          </Lit>
          <Or />
          <Lit href={L.effect.href} title={L.effect.title}>
            {L.effect.label}
          </Lit>
          <Or />
          <Lit href={L.subpat.href} title={L.subpat.title}>
            {L.subpat.label}
          </Lit>
          <Or />
          <Lit href={L.pat.href} title={L.pat.title}>
            {L.pat.label}
          </Lit>
          <Or />
          <Lit href={L.seq.href} title={L.seq.title}>
            {L.seq.label}
          </Lit>
          <Or />
          <Lit href={L.channel.href} title={L.channel.title}>
            {L.channel.label}
          </Lit>
          <Or />
          <Lit href={L.play.href} title={L.play.title}>
            {L.play.label}
          </Lit>
          <Or />
          <Lit href={L.exportStmt.href} title={L.exportStmt.title}>
            {L.exportStmt.label}
          </Lit>
        </div>
      </div>
    </Panel>
  );
}

function PatternRail() {
  const L = GRAMMAR_LINKS;
  return (
    <Panel title="Pattern RHS">
      <div className={styles.rail}>
        <Term link={L.patternRhs} />
        <Track />
        <div className={styles.branch}>
          <Term link={L.patternAtom} />
          <Or />
          <Lit href={L.groupRepeat.href} title={L.groupRepeat.title}>
            {L.groupRepeat.label}
          </Lit>
        </div>
        <Track />
        <Lit href={L.duration.href} title={L.duration.title}>
          {L.duration.label}
        </Lit>
        <Track />
        <Lit>*</Lit>
        <Track />
        <Lit>N</Lit>
      </div>
      <div className={styles.rail} style={{marginTop: '0.55rem'}}>
        <Term link={L.patternAtom} />
        <Track />
        <div className={styles.branch}>
          <Lit href={L.notes.href} title={L.notes.title}>
            {L.notes.label}
          </Lit>
          <Or />
          <Lit href={L.rests.href} title={L.rests.title}>
            {L.rests.label}
          </Lit>
          <Or />
          <Lit href={L.tempInst.href} title={L.tempInst.title}>
            {L.tempInst.label}
          </Lit>
          <Or />
          <Lit href={L.inlineEffect.href} title={L.inlineEffect.title}>
            {L.inlineEffect.label}
          </Lit>
          <Or />
          <Lit href={L.inst.href} title="Named instrument token / inline inst">
            name
          </Lit>
        </div>
      </div>
    </Panel>
  );
}

function SequenceRail() {
  const L = GRAMMAR_LINKS;
  return (
    <Panel title="Sequence RHS">
      <div className={styles.rail}>
        <Term link={L.seqRhs} />
        <Track />
        <div className={styles.branch}>
          <Lit href={L.pat.href} title="Pattern or sequence reference">
            name
          </Lit>
          <Or />
          <Lit href={L.groupRepeat.href} title="Grouped playlist">( … )*N</Lit>
        </div>
        <Track />
        <Term link={L.seqModifier} />
        <Track />
        <Lit>*</Lit>
      </div>
    </Panel>
  );
}

function ChannelRail() {
  const L = GRAMMAR_LINKS;
  return (
    <Panel title="Channel RHS">
      <div className={styles.rail}>
        <Lit href={L.channel.href}>channel</Lit>
        <Track />
        <Lit>N</Lit>
        <Track />
        <Lit>=&gt;</Lit>
        <Track />
        <div className={styles.branch}>
          <Lit href={L.inst.href}>inst name</Lit>
          <Or />
          <Lit href={L.pat.href}>pat …</Lit>
          <Or />
          <Lit href={L.seq.href}>seq …</Lit>
          <Or />
          <Lit href={`${L.channel.href}#speed`} title="Per-channel speed multiplier">
            speed=
          </Lit>
          <Or />
          <Lit href={`${L.channel.href}#locks`} title="Scale lock">
            lock=
          </Lit>
        </div>
      </div>
    </Panel>
  );
}

/**
 * Navigable railroad-style map of the BeatBax grammar.
 * Boxes link into Language Reference topics.
 */
export default function GrammarRailroad(): ReactNode {
  return (
    <div className={styles.wrap}>
      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={styles.swatchTerm} aria-hidden />
          Nonterminal (opens topic)
        </span>
        <span className={styles.legendItem}>
          <span className={styles.swatchLit} aria-hidden />
          Keyword / token (opens topic when linked)
        </span>
      </div>
      <ProgramRail />
      <PatternRail />
      <SequenceRail />
      <ChannelRail />
      <p className={styles.hint}>
        Click any box to open the matching reference page. For the compact statement
        and lexical index, see the{' '}
        <Link to={GRAMMAR_LINKS.appendix.href}>appendix</Link>.
      </p>
    </div>
  );
}
