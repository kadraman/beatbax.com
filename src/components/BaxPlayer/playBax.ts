export type BaxPlayerHandle = {
  stop: () => void;
};

export type PlayBaxOptions = {
  /** Called when one-shot playback finishes (not on manual stop). */
  onComplete?: () => void;
};

export async function playBaxSource(
  source: string,
  options: PlayBaxOptions = {},
): Promise<{handle: BaxPlayerHandle; error?: never} | {handle?: never; error: string}> {
  let ctx: AudioContext | undefined;
  let contextClosed = false;

  const closeContext = () => {
    if (!ctx || contextClosed) {
      return;
    }
    contextClosed = true;
    try {
      void ctx.close();
    } catch {
      /* ignore */
    }
  };

  try {
    const AudioCtx =
      typeof window !== 'undefined' && window.AudioContext
        ? window.AudioContext
        : (globalThis as typeof globalThis & {webkitAudioContext?: typeof AudioContext})
            .webkitAudioContext;

    if (!AudioCtx) {
      return {error: 'Web Audio is not available in this browser.'};
    }

    ctx = new AudioCtx();
    const resumePromise = ctx.state === 'suspended' ? ctx.resume() : Promise.resolve();

    const {parse} = await import('@beatbax/engine/parser');
    const {resolveSong, resolveImports} = await import('@beatbax/engine/song');
    const {default: Player} = await import('@beatbax/engine/audio/playback');

    const ast = parse(source.trim());

    let resolvedAst = ast;
    if ((ast as {imports?: unknown[]}).imports?.length) {
      resolvedAst = await resolveImports(ast as Parameters<typeof resolveImports>[0]);
    }

    const resolved = resolveSong(resolvedAst as Parameters<typeof resolveSong>[0]);
    await resumePromise;

    const playbackCtx = ctx;
    const player = new Player(playbackCtx);

    player.onComplete = () => {
      closeContext();
      options.onComplete?.();
    };

    await player.playAST(resolved);

    return {
      handle: {
        stop: () => {
          try {
            player.stop();
          } catch {
            /* ignore */
          }
          closeContext();
        },
      },
    };
  } catch (err) {
    closeContext();

    const message = err instanceof Error ? err.message : String(err);
    return {error: message};
  }
}
