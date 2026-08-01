import type {ReactNode} from 'react';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import clsx from 'clsx';
import {parseFocusedBaxSource} from './focusCode';
import {playBaxSource, type BaxPlayerHandle} from './playBax';
import styles from './styles.module.css';

export type BaxPlayerProps = {
  title?: string;
  /** Full BeatBax source. Use `# @show` / `# @end` to focus the displayed snippet. */
  code: string;
};

type PlayerStatus = 'idle' | 'loading' | 'playing' | 'error';

function CodeBlock({
  displayCode,
  omittedBefore,
  omittedAfter,
}: {
  displayCode: string;
  omittedBefore: boolean;
  omittedAfter: boolean;
}) {
  const lines = [
    omittedBefore ? '…' : null,
    displayCode,
    omittedAfter ? '…' : null,
  ]
    .filter((part): part is string => part != null && part.length > 0)
    .join('\n');

  return (
    <pre className={styles.code}>
      <code>{lines}</code>
    </pre>
  );
}

function BaxPlayerInner({title, code}: BaxPlayerProps) {
  const focused = useMemo(() => parseFocusedBaxSource(code), [code]);
  const handleRef = useRef<BaxPlayerHandle | null>(null);
  const [status, setStatus] = useState<PlayerStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const copiedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stopPlayback = useCallback(() => {
    handleRef.current?.stop();
    handleRef.current = null;
    setStatus('idle');
  }, []);

  useEffect(() => () => stopPlayback(), [stopPlayback]);

  useEffect(
    () => () => {
      if (copiedTimerRef.current) {
        clearTimeout(copiedTimerRef.current);
      }
    },
    [],
  );

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(focused.playCode);
      setCopied(true);
      if (copiedTimerRef.current) {
        clearTimeout(copiedTimerRef.current);
      }
      copiedTimerRef.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      setError('Could not copy to the clipboard.');
      setStatus('error');
    }
  }, [focused.playCode]);

  const onPlay = useCallback(async () => {
    stopPlayback();
    setError(null);
    setStatus('loading');

    let activeHandle: BaxPlayerHandle | null = null;

    const result = await playBaxSource(focused.playCode, {
      onComplete: () => {
        if (handleRef.current !== activeHandle) {
          return;
        }
        handleRef.current = null;
        setStatus('idle');
      },
    });

    if ('error' in result && result.error) {
      setError(result.error);
      setStatus('error');
      return;
    }

    if (!result.handle) {
      setError('Playback failed to start.');
      setStatus('error');
      return;
    }

    activeHandle = result.handle;
    handleRef.current = activeHandle;
    setStatus('playing');
  }, [focused.playCode, stopPlayback]);

  return (
    <div className={styles.baxPlayer}>
      <div className={styles.header}>
        {title ? <p className={styles.title}>{title}</p> : <span />}
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.button}
            onClick={onPlay}
            disabled={status === 'loading'}>
            {status === 'loading' ? 'Loading…' : 'Play'}
          </button>
          <button
            type="button"
            className={clsx(styles.button, styles.buttonSecondary)}
            onClick={stopPlayback}
            disabled={status !== 'playing'}>
            Stop
          </button>
          <button
            type="button"
            className={clsx(styles.button, styles.buttonSecondary)}
            onClick={onCopy}
            title="Copy the full playable song (including hidden wiring)">
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
      <CodeBlock
        displayCode={focused.displayCode}
        omittedBefore={focused.omittedBefore}
        omittedAfter={focused.omittedAfter}
      />
      {error ? (
        <div className={clsx(styles.status, styles.statusError)}>{error}</div>
      ) : status === 'playing' ? (
        <div className={clsx(styles.status, styles.statusPlaying)}>Playing…</div>
      ) : null}
    </div>
  );
}

export default function BaxPlayer(props: BaxPlayerProps): ReactNode {
  const focused = parseFocusedBaxSource(props.code);

  return (
    <BrowserOnly
      fallback={
        <div className={styles.baxPlayer}>
          <div className={styles.fallback}>
            {props.title ? <strong>{props.title}</strong> : null}
            <p>Interactive playback loads in the browser.</p>
            <CodeBlock
              displayCode={focused.displayCode}
              omittedBefore={focused.omittedBefore}
              omittedAfter={focused.omittedAfter}
            />
          </div>
        </div>
      }>
      {() => <BaxPlayerInner {...props} />}
    </BrowserOnly>
  );
}
