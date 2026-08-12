import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import {
  CHANNEL_RHS_LINKS,
  PATTERN_ATOM_LINKS,
  PATTERN_RHS_LINKS,
  SEQUENCE_RHS_LINKS,
  STATEMENT_LINKS,
  docHref,
  type DocTarget,
} from './docMap';
import styles from './styles.module.css';

type BoxKind = 'terminal' | 'nonterminal';

function RailBox({
  target,
  kind = 'terminal',
}: {
  target: DocTarget;
  kind?: BoxKind;
}) {
  return (
    <Link
      className={clsx(
        styles.box,
        kind === 'terminal' ? styles.terminal : styles.nonterminal,
      )}
      to={docHref(target.docId, target.hash)}
      title={`Open ${target.label} docs`}>
      {target.label}
    </Link>
  );
}

function AltTrack({
  items,
  kind = 'terminal',
}: {
  items: DocTarget[];
  kind?: BoxKind;
}) {
  return (
    <div className={styles.track} role="list">
      <span className={styles.startCap} aria-hidden />
      {items.map((item, i) => (
        <span key={`${item.label}-${i}`} className={styles.track} role="listitem">
          {i > 0 ? <span className={styles.alt} aria-hidden>|</span> : null}
          <span className={styles.rail} aria-hidden />
          <RailBox target={item} kind={kind} />
          <span className={styles.rail} aria-hidden />
        </span>
      ))}
      <span className={styles.endCap} aria-hidden />
    </div>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className={styles.panel} aria-label={title}>
      <h3 className={styles.panelTitle}>{title}</h3>
      {children}
    </section>
  );
}

/**
 * Clickable railroad-style grammar map for the Language Reference hub.
 * Boxes link to topic pages; data comes from docMap.ts.
 */
export default function GrammarRailroad(): ReactNode {
  return (
    <div className={styles.railroad}>
      <p className={styles.legend}>
        Boxes are clickable topics. Rounded pills are statement keywords;
        square boxes are related syntax groups.
      </p>

      <Panel title="Program / Statement">
        <AltTrack items={STATEMENT_LINKS} kind="terminal" />
      </Panel>

      <Panel title="Pattern RHS">
        <AltTrack items={PATTERN_RHS_LINKS} kind="nonterminal" />
      </Panel>

      <Panel title="Sequence RHS">
        <AltTrack items={SEQUENCE_RHS_LINKS} kind="nonterminal" />
      </Panel>

      <Panel title="Channel RHS">
        <AltTrack items={CHANNEL_RHS_LINKS} kind="nonterminal" />
      </Panel>

      <Panel title="Pattern atom">
        <AltTrack items={PATTERN_ATOM_LINKS} kind="nonterminal" />
      </Panel>
    </div>
  );
}
