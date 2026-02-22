/**
 * @license BSD-3-Clause
 * Copyright (c) 2026, ッツ Reader Authors
 * All rights reserved.
 */

export interface CharToken {
  text: string;
  range: Range;
}

export function getCharTokens(container: Element): CharToken[] {
  const tokens: CharToken[] = [];

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
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (!ch.trim()) continue;
      const range = document.createRange();
      range.setStart(node, i);
      range.setEnd(node, i + 1);
      tokens.push({ text: ch, range });
    }
  }

  return tokens;
}

export function findFirstVisibleToken(tokens: CharToken[]): number {
  let best = -1;
  let bestTop = Infinity;
  let bestLeft = Infinity;

  for (let i = 0; i < tokens.length; i++) {
    const rect = tokens[i].range.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) continue;
    // Use center point so partial-visibility and sub-pixel rounding don't exclude characters
    const cx = (rect.left + rect.right) / 2;
    const cy = (rect.top + rect.bottom) / 2;
    if (cx >= 0 && cx <= window.innerWidth && cy >= 0 && cy <= window.innerHeight) {
      if (rect.top < bestTop || (Math.abs(rect.top - bestTop) < 2 && rect.left < bestLeft)) {
        bestTop = rect.top;
        bestLeft = rect.left;
        best = i;
      }
    }
  }

  // Fallback: nothing found in viewport, find nearest to top-left of screen
  return best >= 0 ? best : findNearestToken(tokens, 0, 0);
}

export function findNearestToken(tokens: CharToken[], x: number, y: number): number {
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
