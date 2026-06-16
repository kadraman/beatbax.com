import type {ReactNode} from 'react';
import {useCallback, useEffect, useRef, useState} from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import clsx from 'clsx';
import {playBaxSource, type BaxPlayerHandle} from './playBax';
import styles from './styles.module.css';

export type BaxPlayerProps = {
  title?: string;
  code: string;
};

type PlayerStatus = 'idle' | 'loading' | 'playing' | 'error';

function BaxPlayerInner({title, code}: BaxPlayerProps) {
  const handleRef = useRef<BaxPlayerHandle | null>(null);
  const [status, setStatus] = useState<PlayerStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const stopPlayback = useCallback(() => {
    handleRef.current?.stop();
    handleRef.current = null;
    setStatus('idle');
  }, []);

  useEffect(() => () => stopPlayback(), [stopPlayback]);

  const onPlay = useCallback(async () => {
    stopPlayback();
    setError(null);
    setStatus('loading');

    const result = await playBaxSource(code);
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

    handleRef.current = result.handle;
    setStatus('playing');
  }, [code, stopPlayback]);

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
        </div>
      </div>
      <pre className={styles.code}>
        <code>{code.trim()}</code>
      </pre>
      {error ? (
        <div className={clsx(styles.status, styles.statusError)}>{error}</div>
      ) : status === 'playing' ? (
        <div className={clsx(styles.status, styles.statusPlaying)}>Playing…</div>
      ) : null}
    </div>
  );
}

export default function BaxPlayer(props: BaxPlayerProps): ReactNode {
  return (
    <BrowserOnly
      fallback={
        <div className={styles.baxPlayer}>
          <div className={styles.fallback}>
            {props.title ? <strong>{props.title}</strong> : null}
            <p>Interactive playback loads in the browser.</p>
            <pre className={styles.code}>
              <code>{props.code.trim()}</code>
            </pre>
          </div>
        </div>
      }>
      {() => <BaxPlayerInner {...props} />}
    </BrowserOnly>
  );
}
