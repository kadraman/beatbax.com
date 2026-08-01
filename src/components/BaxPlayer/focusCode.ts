/**
 * Focus markers for BaxPlayer source:
 *
 *   # @show
 *   …lines shown in the docs…
 *   # @end
 *
 * Playback always uses the full source (markers stripped).
 * When any @show region exists, only those regions are displayed.
 * Ellipsis (`…`) markers are inserted:
 *   - before the first region when leading boilerplate was omitted
 *   - between regions when non-blank lines were omitted between them
 *   - after the last region when trailing boilerplate was omitted
 */

const SHOW_LINE = /^\s*#\s*@show\s*$/;
const END_LINE = /^\s*#\s*@end\s*$/;
const MARKER_LINE = /^\s*#\s*@(?:show|end)\s*$/;

export type FocusedBaxSource = {
  /** Full source for the engine (markers removed). */
  playCode: string;
  /** What the docs UI shows (may include `…` for omitted spans). */
  displayCode: string;
  /** True when display omitted leading boilerplate. */
  omittedBefore: boolean;
  /** True when display omitted trailing boilerplate. */
  omittedAfter: boolean;
};

type ShowRange = {
  lines: string[];
  /** Index into playLines where this block starts. */
  start: number;
  /** Index into playLines just past this block. */
  end: number;
};

export function parseFocusedBaxSource(source: string): FocusedBaxSource {
  const lines = source.replace(/^\uFEFF/, '').split(/\r?\n/);

  const playLines: string[] = [];
  const showRanges: ShowRange[] = [];
  let inShow = false;
  let currentShow: string[] = [];
  let currentStart = -1;

  for (const line of lines) {
    if (SHOW_LINE.test(line)) {
      inShow = true;
      currentShow = [];
      currentStart = playLines.length;
      continue;
    }
    if (END_LINE.test(line)) {
      if (inShow) {
        showRanges.push({
          lines: currentShow,
          start: currentStart,
          end: playLines.length,
        });
        inShow = false;
        currentShow = [];
        currentStart = -1;
      }
      continue;
    }

    playLines.push(line);
    if (inShow) {
      currentShow.push(line);
    }
  }

  if (inShow) {
    showRanges.push({
      lines: currentShow,
      start: currentStart < 0 ? playLines.length - currentShow.length : currentStart,
      end: playLines.length,
    });
  }

  const playCode = trimBlankEdges(playLines.join('\n'));

  if (showRanges.length === 0) {
    return {
      playCode,
      displayCode: playCode,
      omittedBefore: false,
      omittedAfter: false,
    };
  }

  const visible = showRanges
    .map((range) => ({
      ...range,
      text: trimBlankEdges(range.lines.join('\n')),
    }))
    .filter((range) => range.text.length > 0);

  if (visible.length === 0) {
    return {
      playCode,
      displayCode: playCode,
      omittedBefore: false,
      omittedAfter: false,
    };
  }

  const displayParts: string[] = [];
  for (let i = 0; i < visible.length; i++) {
    if (i > 0) {
      const gap = playLines.slice(visible[i - 1].end, visible[i].start);
      if (gap.some((line) => line.trim().length > 0)) {
        displayParts.push('…');
      }
    }
    displayParts.push(visible[i].text);
  }

  const first = visible[0];
  const last = visible[visible.length - 1];

  return {
    playCode,
    displayCode: displayParts.join('\n\n'),
    omittedBefore:
      first.start > 0 &&
      playLines.slice(0, first.start).some((line) => line.trim().length > 0),
    omittedAfter:
      last.end < playLines.length &&
      playLines.slice(last.end).some((line) => line.trim().length > 0),
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
