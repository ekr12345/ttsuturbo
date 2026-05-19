/**
 * @license BSD-3-Clause
 * Copyright (c) 2026, ッツ Reader Authors
 * All rights reserved.
 */

const HIGHLIGHT_NAME = 'lookup-highlight';

interface HighlightCtor {
  new (...ranges: Range[]): unknown;
}

interface CssWithHighlights {
  highlights?: { set: (name: string, value: unknown) => void; delete: (name: string) => void };
}

function getHighlightCtor(): HighlightCtor | undefined {
  return (globalThis as unknown as { Highlight?: HighlightCtor }).Highlight;
}

function getRegistry() {
  return (globalThis as unknown as { CSS?: CssWithHighlights }).CSS?.highlights;
}

function findMatches(text: string, sortedWords: string[]): Array<{ start: number; end: number }> {
  const matches: Array<{ start: number; end: number }> = [];
  let i = 0;
  while (i < text.length) {
    let hit = '';
    for (const word of sortedWords) {
      if (word && text.startsWith(word, i)) {
        hit = word;
        break;
      }
    }
    if (hit) {
      matches.push({ start: i, end: i + hit.length });
      i += hit.length;
    } else {
      i += 1;
    }
  }
  return matches;
}

export function applyLookupHighlights(
  root: HTMLElement | null | undefined,
  words: Set<string>
): void {
  const registry = getRegistry();
  const HighlightCtor = getHighlightCtor();
  if (!registry || !HighlightCtor) return;

  if (!root || !words.size) {
    registry.delete(HIGHLIGHT_NAME);
    return;
  }

  const sortedWords = [...words].filter(Boolean).sort((a, b) => b.length - a.length);
  if (!sortedWords.length) {
    registry.delete(HIGHLIGHT_NAME);
    return;
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      let cur: Node | null = node.parentNode;
      while (cur && cur !== root) {
        if (cur instanceof Element) {
          const tag = cur.tagName.toLowerCase();
          if (tag === 'rt' || tag === 'rp' || tag === 'script' || tag === 'style') {
            return NodeFilter.FILTER_REJECT;
          }
        }
        cur = cur.parentNode;
      }
      return (node as Text).data.length ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });

  const ranges: Range[] = [];
  let n: Node | null = walker.nextNode();
  while (n) {
    const textNode = n as Text;
    const matches = findMatches(textNode.data, sortedWords);
    for (const { start, end } of matches) {
      const range = document.createRange();
      range.setStart(textNode, start);
      range.setEnd(textNode, end);
      ranges.push(range);
    }
    n = walker.nextNode();
  }

  if (!ranges.length) {
    registry.delete(HIGHLIGHT_NAME);
    return;
  }

  const highlight = new HighlightCtor(...ranges);
  registry.set(HIGHLIGHT_NAME, highlight);
}
