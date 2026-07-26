/**
 * Focus markers for BaxPlayer source:
 *
 *   # @show
 *   …lines shown in the docs…
 *   # @end
 *
 * Playback always uses the full source (markers stripped).
 * When any @show region exists, only those regions are displayed,
 * with ellipsis hints when surrounding boilerplate was omitted.
 */

const SHOW_LINE = /^\s*#\s*@show\s*$/;
const END_LINE = /^\s*#\s*@end\s*$/;
const MARKER_LINE = /^\s*#\s*@(?:show|end)\s*$/;

export type FocusedBaxSource = {
  /** Full source for the engine (markers removed). */
  playCode: string;
  /** What the docs UI shows. */
  displayCode: string;
  /** True when display omitted leading boilerplate. */
  omittedBefore: boolean;
  /** True when display omitted trailing boilerplate. */
  omittedAfter: boolean;
};

export function parseFocusedBaxSource(source: string): FocusedBaxSource {
  const lines = source.replace(/^\uFEFF/, '').split(/\r?\n/);

  const playLines: string[] = [];
  const showBlocks: string[][] = [];
  let inShow = false;
  let currentShow: string[] = [];
  let firstShowStart = -1;
  let lastShowEnd = -1;

  for (const line of lines) {
    if (SHOW_LINE.test(line)) {
      inShow = true;
      currentShow = [];
      continue;
    }
    if (END_LINE.test(line)) {
      if (inShow) {
        if (firstShowStart < 0) {
          firstShowStart = playLines.length - currentShow.length;
        }
        lastShowEnd = playLines.length;
        showBlocks.push(currentShow);
        inShow = false;
        currentShow = [];
      }
      continue;
    }

    playLines.push(line);
    if (inShow) {
      currentShow.push(line);
    }
  }

  if (inShow) {
    if (firstShowStart < 0) {
      firstShowStart = playLines.length - currentShow.length;
    }
    lastShowEnd = playLines.length;
    showBlocks.push(currentShow);
  }

  const playCode = trimBlankEdges(playLines.join('\n'));

  if (showBlocks.length === 0) {
    return {
      playCode,
      displayCode: playCode,
      omittedBefore: false,
      omittedAfter: false,
    };
  }

  const displayCode = showBlocks
    .map((block) => trimBlankEdges(block.join('\n')))
    .filter((block) => block.length > 0)
    .join('\n\n');

  return {
    playCode,
    displayCode,
    omittedBefore:
      firstShowStart > 0 &&
      playLines.slice(0, firstShowStart).some((line) => line.trim().length > 0),
    omittedAfter:
      lastShowEnd >= 0 &&
      lastShowEnd < playLines.length &&
      playLines.slice(lastShowEnd).some((line) => line.trim().length > 0),
  };
}

export function stripFocusMarkers(source: string): string {
  return trimBlankEdges(
    source
      .split(/\r?\n/)
      .filter((line) => !MARKER_LINE.test(line))
      .join('\n'),
  );
}

function trimBlankEdges(text: string): string {
  return text.replace(/^\n+/, '').replace(/\n+$/, '').trimEnd();
}
