/**
 * @license BSD-3-Clause
 * Copyright (c) 2026, ッツ Reader Authors
 * All rights reserved.
 */

export interface WordToken {
  text: string;
  range: Range;
}

export function getWordTokens(container: Element): WordToken[] {
  const segmenter = new Intl.Segmenter('ja', { granularity: 'word' });
  const tokens: WordToken[] = [];

  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      let parent = node.parentElement;
      while (parent && parent !== container) {
        if (parent.tagName === 'RT') return NodeFilter.FILTER_REJECT;
        parent = parent.parentElement;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  let node: Text | null;
  while ((node = walker.nextNode() as Text | null)) {
    const text = node.textContent || '';
    for (const segment of segmenter.segment(text)) {
      if (segment.isWordLike) {
        const range = document.createRange();
        range.setStart(node, segment.index);
        range.setEnd(node, segment.index + segment.segment.length);
        tokens.push({ text: segment.segment, range });
      }
    }
  }

  return tokens;
}

export function findNearestToken(tokens: WordToken[], x: number, y: number): number {
  let nearest = 0;
  let minDist = Infinity;

  for (let i = 0; i < tokens.length; i++) {
    const rect = tokens[i].range.getBoundingClientRect();
    const cx = (rect.left + rect.right) / 2;
    const cy = (rect.top + rect.bottom) / 2;
    const dist = Math.hypot(cx - x, cy - y);
    if (dist < minDist) {
      minDist = dist;
      nearest = i;
    }
  }

  return nearest;
}
