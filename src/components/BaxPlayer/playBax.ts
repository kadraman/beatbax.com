export type BaxPlayerHandle = {
  stop: () => void;
};

export async function playBaxSource(
  source: string,
): Promise<{handle: BaxPlayerHandle; error?: never} | {handle?: never; error: string}> {
  try {
    const {parse} = await import('@beatbax/engine/parser');
    const {resolveSong, resolveImports} = await import('@beatbax/engine/song');
    const {default: Player} = await import('@beatbax/engine/audio/playback');

    const ast = parse(source.trim());

    let resolvedAst = ast;
    if ((ast as {imports?: unknown[]}).imports?.length) {
      resolvedAst = await resolveImports(ast as Parameters<typeof resolveImports>[0]);
    }

    const resolved = resolveSong(resolvedAst as Parameters<typeof resolveSong>[0]);

    const AudioCtx =
      typeof window !== 'undefined' && window.AudioContext
        ? window.AudioContext
        : (globalThis as typeof globalThis & {webkitAudioContext?: typeof AudioContext})
            .webkitAudioContext;

    if (!AudioCtx) {
      return {error: 'Web Audio is not available in this browser.'};
    }

    const ctx = new AudioCtx();
    const player = new Player(ctx);
    await player.playAST(resolved);

    return {
      handle: {
        stop: () => {
          try {
            player.stop();
          } catch {
            /* ignore */
          }
          try {
            void ctx.close();
          } catch {
            /* ignore */
          }
        },
      },
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return {error: message};
  }
}
