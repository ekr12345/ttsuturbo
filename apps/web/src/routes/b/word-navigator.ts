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

export function findFirstVisibleToken(tokens: CharToken[], vertical = false): number {
  let best = -1;
  let bestTop = Infinity;
  let bestLeft = vertical ? -Infinity : Infinity;

  for (let i = 0; i < tokens.length; i++) {
    const rect = tokens[i].range.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) continue;
    const cx = (rect.left + rect.right) / 2;
    const cy = (rect.top + rect.bottom) / 2;
    if (cx >= 0 && cx <= window.innerWidth && cy >= 0 && cy <= window.innerHeight) {
      const betterLeft = vertical ? rect.left > bestLeft : rect.left < bestLeft;
      if (rect.top < bestTop || (Math.abs(rect.top - bestTop) < 2 && betterLeft)) {
        bestTop = rect.top;
        bestLeft = rect.left;
        best = i;
      }
    }
  }

  // Fallback: vertical mode starts upper-right, horizontal starts upper-left
  return best >= 0 ? best : findNearestToken(tokens, vertical ? window.innerWidth : 0, 0);
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
