/**
 * @license BSD-3-Clause
 * Copyright (c) 2026, ッツ Reader Authors
 * All rights reserved.
 */

export interface JishoEntry {
  word: string;
  reading: string;
  meanings: string[];
  partOfSpeech: string;
}

export async function lookupWord(word: string): Promise<JishoEntry[]> {
  const response = await fetch('https://jotoba.de/api/search/words', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: word, language: 'English', no_english: false })
  });

  if (!response.ok) return [];

  const data = await response.json();
  return (data.words || []).slice(0, 5).map((entry: any) => ({
    word: entry.reading?.kanji || entry.reading?.kana || word,
    reading: entry.reading?.kana || '',
    meanings: (entry.senses || []).flatMap((s: any) => s.glosses || []).slice(0, 3),
    partOfSpeech: (entry.senses?.[0]?.pos || []).join(', ')
  }));
}
