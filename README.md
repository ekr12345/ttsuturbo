<img src="assets/readme/icon.png" align="left" style="margin-right: 1rem;" alt="logo">

## ッツ Ebook Reader — Custom Fork

A fork of [ttu-ttu/ebook-reader](https://github.com/ttu-ttu/ebook-reader) with custom enhancements focused on keyboard-driven reading, character-level navigation, and a refined reading experience — primarily for Japanese learners using dictionary extensions like Yomitan.

> **Note**: This fork's custom features are on the `my-changes` branch (set as default). The `main` branch tracks the upstream repo.

---

# What's New in This Fork

### Keyboard & Navigation

- **Space / Shift+Space** — turn pages forward/backward (pagination mode)
- **F / S** — page forward/backward (alternative hotkeys)
- **Arrow keys** — character-level navigation; hold **Shift** to extend selection
- **Enter** — close Jisho popup

### Reading Experience

- **Auto-hiding cursor** — cursor disappears after 3 seconds of inactivity in the reader
- **First visible character highlight** — visually marks your reading position
- **Wider column gap** — improved readability in multi-column layouts
- **Improved Jisho popup** — better positioning and sizing
- **Refined book manager UI** — cleaner header and merged entries layout
- **Sensible default settings** — better out-of-the-box experience

---

# Original Features

- [x] Supports HTMLZ, Plain Text and EPUB files
- [x] Customizable environment (themes, font size, image blur, furigana settings etc.)
- [x] Continuous / Pagination reader mode
- [x] Vertical / Horizontal reading mode
- [x] Basic Time/Character and Reading Goals Tracker
- [x] Reading Data Statistics
- [x] Character count and progress display
- [x] Table of content support for EPUB files
- [x] (Auto) bookmark functionality
- [x] Auto scroll (continuous mode)
- [x] Book manager
- [x] Data import/export via local and external sources
- [x] Installation and offline capabilities

---

# Usage

The first time you open the reader, select books from your device by clicking the dropzone or dragging and dropping files/folders onto the manager.

**Note for EPUB issues** (non-closing anchor tags): enable Standard or Extended mode under **Data → Epub Import Fixes** and reimport the file.

**Note for Text Files**: The book title is taken from the filename. Text is split into paragraphs by punctuation (。？！) and closing brackets (」）), with sections around 10,000 characters each.

---

# Desktop Keybinds

> Keys are bound to physical location (see [MDN KeyboardEvent.code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)).

### Original Keybinds

| Key                                     | Description                                              |
| --------------------------------------- | -------------------------------------------------------- |
| <kbd>Space</kbd>                        | Toggle auto-scroll (continuous) / Next page (pagination) |
| <kbd>a</kbd> / <kbd>d</kbd>             | Increase / decrease auto-scroll speed                    |
| <kbd>b</kbd>                            | Create bookmark at current location                      |
| <kbd>r</kbd>                            | Return to bookmark location                              |
| <kbd>t</kbd>                            | Select a new custom reading point                        |
| <kbd>p</kbd>                            | Toggle Reading Tracker                                   |
| <kbd>f</kbd>                            | Toggle Reading Tracker Freeze Position                   |
| <kbd>PageDown</kbd> / <kbd>PageUp</kbd> | Next / previous page                                     |
| <kbd>n</kbd> / <kbd>m</kbd>             | Next / previous chapter                                  |

### Fork Additions

| Key                                                 | Description                             |
| --------------------------------------------------- | --------------------------------------- |
| <kbd>Space</kbd> / <kbd>Shift+Space</kbd>           | Next / previous page (pagination mode)  |
| <kbd>F</kbd> / <kbd>S</kbd>                         | Next / previous page (alternative)      |
| <kbd>←</kbd> <kbd>→</kbd> <kbd>↑</kbd> <kbd>↓</kbd> | Character-level navigation              |
| <kbd>Shift</kbd> + Arrow                            | Extend selection character by character |
| <kbd>Enter</kbd>                                    | Close Jisho popup                       |

---

# Book Manager

Open the book manager from the reader header. You'll see covers for all imported books with titles and progress tracked by bookmark location.

**You can:**

- Switch between browser DB, filesystem, or external sources
- Switch books by clicking covers
- Delete books (bookmark progress is also removed)
- View book details via the info icon
- Select all / deselect all books

---

# Reading Tracker

Provides time/character tracking and reading goals. Open it by single-clicking the tracker icon in the bottom-left corner while reading.

Tracks per book and day:

- Reading time
- Characters read
- Min / Max reading speed
- Book start and completion dates

The tracker auto-pauses on events like opening the table of contents, changing chapters, entering fullscreen, or resizing the window.

---

# Development

**Requirements:** Node 20+, pnpm

```bash
# Install dependencies
pnpm install

# Start dev server → http://localhost:5173
pnpm dev

# Build
pnpm build

# Type check
pnpm check
```

---

# Credits

Original reader by [ttu-ttu](https://github.com/ttu-ttu/ebook-reader). Custom enhancements by [ekr12345](https://github.com/ekr12345).
