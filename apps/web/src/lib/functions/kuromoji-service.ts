/**
 * @license BSD-3-Clause
 * Copyright (c) 2026, ッツ Reader Authors
 * All rights reserved.
 */

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore — no types for tiny-segmenter
import TinySegmenter from 'tiny-segmenter';

const segmenter = new TinySegmenter();

export function segmentJapanese(text: string): string[] {
  return segmenter.segment(text) as string[];
}
