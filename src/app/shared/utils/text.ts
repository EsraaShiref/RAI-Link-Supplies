/**
 * First `count` sentences of a paragraph, used where a page shows a snapshot of
 * copy that appears in full elsewhere (e.g. the Home "About" teaser). Works for
 * both dictionaries because Arabic in Section 3 also terminates sentences with a
 * full stop.
 */
export function firstSentences(text: string, count: number): string {
  const matches = text.match(/[^.!?؟]+[.!?؟]+\s*/g);
  if (!matches || matches.length <= count) {
    return text;
  }
  return matches.slice(0, count).join('').trim();
}
