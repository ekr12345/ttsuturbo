<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  import { lookupWord, type JishoEntry } from '$lib/functions/jisho';

  export let word: string;
  export let x: number;
  export let y: number;
  export let wordTop: number;
  export let onClose: () => void;

  let results: JishoEntry[] = [];
  let loading = true;
  let error = false;
  let popupEl: HTMLElement;

  $: if (word) {
    loading = true;
    error = false;
    results = [];
    lookupWord(word)
      .then((r) => {
        results = r;
        loading = false;
      })
      .catch(() => {
        error = true;
        loading = false;
      });
  }

  function positionPopup() {
    if (!popupEl) return;
    const gap = 8;
    const margin = 8;

    // Measure natural height with no max-height constraint
    popupEl.style.maxHeight = '';
    const h = popupEl.offsetHeight;

    const spaceBelow = window.innerHeight - margin - y;
    const spaceAbove = wordTop - gap - margin;

    if (h <= spaceBelow) {
      // Fits fully below — ideal
      popupEl.style.top = `${y}px`;
    } else if (h <= spaceAbove) {
      // Fits fully above
      popupEl.style.top = `${wordTop - gap - h}px`;
    } else if (spaceBelow >= spaceAbove) {
      // More room below — show below, constrain height so it doesn't clip
      popupEl.style.top = `${y}px`;
      popupEl.style.maxHeight = `${spaceBelow}px`;
    } else {
      // More room above — show above, constrain height so it doesn't clip
      popupEl.style.maxHeight = `${spaceAbove}px`;
      popupEl.style.top = `${margin}px`;
    }
  }

  onMount(() => {
    positionPopup();

    let clickHandler: ((e: MouseEvent) => void) | undefined;

    // Delay registering the outside-click listener so the pointerup/click
    // that opened the popup doesn't immediately close it.
    const id = setTimeout(() => {
      clickHandler = (e: MouseEvent) => {
        if (popupEl && !popupEl.contains(e.target as Node)) {
          onClose();
        }
      };
      document.addEventListener('click', clickHandler, true);
    }, 50);

    return () => {
      clearTimeout(id);
      if (clickHandler) {
        document.removeEventListener('click', clickHandler, true);
      }
    };
  });

  afterUpdate(() => {
    positionPopup();
  });
</script>

<div
  bind:this={popupEl}
  class="writing-horizontal-tb fixed z-[100] w-[33rem] max-h-[33rem] overflow-y-auto rounded-lg bg-gray-900 text-[1.375rem] text-white shadow-2xl"
  style="left: {x}px; top: {y}px;"
>
  <div
    class="sticky top-0 flex items-center justify-between bg-gray-900 px-3 py-2 border-b border-gray-700"
  >
    <span class="font-bold text-yellow-300 text-[1.65rem]">{word}</span>
    <button
      class="ml-2 text-gray-400 hover:text-white leading-none text-[1.65rem]"
      on:click={onClose}>✕</button
    >
  </div>

  <div class="px-3 py-2">
    {#if loading}
      <div class="text-gray-400 text-[1.24rem] py-2">Looking up...</div>
    {:else if error}
      <div class="text-gray-400 text-[1.24rem] py-2">Could not fetch results.</div>
    {:else if results.length === 0}
      <div class="text-gray-400 text-[1.24rem] py-2">No results found.</div>
    {:else}
      {#each results as entry, i}
        <div class="py-2" class:border-t={i > 0} class:border-gray-700={i > 0}>
          <div class="flex items-baseline gap-2 flex-wrap">
            <span class="font-bold">{entry.word}</span>
            {#if entry.reading && entry.reading !== entry.word}
              <span class="text-[1.24rem] text-gray-400">【{entry.reading}】</span>
            {/if}
          </div>
          {#if entry.partOfSpeech}
            <div class="text-[1.24rem] text-blue-300 italic mt-0.5">{entry.partOfSpeech}</div>
          {/if}
          <ul class="mt-1 space-y-0.5">
            {#each entry.meanings as meaning}
              <li class="text-gray-200 text-[1.24rem]">• {meaning}</li>
            {/each}
          </ul>
        </div>
      {/each}
    {/if}
  </div>
</div>
