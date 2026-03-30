<img src="assets/readme/icon.png" align="left" style="margin-right: 1rem;" alt="logo">

## ッツ Ebook Reader — Custom Fork

A fork of [ttu-ttu/ebook-reader](https://github.com/ttu-ttu/ebook-reader) with custom enhancements focused on keyboard-driven reading, character-level navigation, and a refined reading experience — primarily for Japanese learners using dictionary extensions like Yomitan.

> **Note**: This fork's custom features are on the `my-changes` branch (set as default). The `main` branch tracks the upstream repo.

---

# What's New in This Fork

### Keyboard & Navigation

- **Arrow keys (horizontal mode)** — ←/→ move character by character; ↑/↓ move line by line; hold **Shift** to extend selection
- **Arrow keys (vertical mode)** — ↑/↓ move character by character within a column; ←/→ jump column to column, landing at the top; first keypress always places cursor at upper-right
- **Space** — toggle auto-scroll
- **PageDown / PageUp** — next / previous page (pagination mode)
- **F** — toggle fullscreen
- **D** — toggle header
- **S** — open settings
- **Enter** — open/close Jisho popup
- **Escape** — close Jisho popup or clear character selection

### Reading Experience

- **Auto-hiding cursor** — cursor disappears after 3 seconds of inactivity in the reader
- **First visible character highlight** — visually marks your reading position
- **Wider column gap** — improved readability in multi-column layouts
- **Improved Jisho popup** — better positioning and sizing
- **Refined book manager UI** — cleaner header and merged entries layout
- **Sensible default settings** — better out-of-the-box experience
- **Web article import** — companion server (`ttsu-server.py`) + browser bookmarklet lets you import any web article directly into your library as a `.txt` file in one click; articles can also be imported manually via the URL import button in the book manager

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

### Keybinds

| Key                                          | Description                                                                           |
| -------------------------------------------- | ------------------------------------------------------------------------------------- |
| <kbd>Space</kbd>                             | Toggle auto-scroll                                                                    |
| <kbd>a</kbd>                                 | Increase auto-scroll speed                                                            |
| <kbd>d</kbd>                                 | Toggle header                                                                         |
| <kbd>b</kbd>                                 | Create bookmark at current location                                                   |
| <kbd>r</kbd>                                 | Return to bookmark location                                                           |
| <kbd>t</kbd>                                 | Set custom reading point                                                              |
| <kbd>p</kbd>                                 | Toggle reading tracker                                                                |
| <kbd>f</kbd>                                 | Toggle fullscreen                                                                     |
| <kbd>s</kbd>                                 | Open settings                                                                         |
| <kbd>PageDown</kbd> / <kbd>PageUp</kbd>      | Next / previous page                                                                  |
| <kbd>n</kbd> / <kbd>m</kbd>                  | Previous / next chapter                                                               |
| <kbd>←</kbd> <kbd>→</kbd>                    | Move character by character (horizontal) / jump column to column (vertical)           |
| <kbd>↑</kbd> <kbd>↓</kbd>                    | Move line by line (horizontal) / move character by character within column (vertical) |
| <kbd>Shift</kbd> + <kbd>←</kbd> <kbd>→</kbd> | Extend selection (horizontal mode only)                                               |
| <kbd>Enter</kbd>                             | Open / close Jisho popup                                                              |

---

# Web Article Import (Bookmarklet)

This fork includes a companion server and browser bookmarklet that lets you import any web article directly into your library as a `.txt` file — one click, no copy-pasting.

### How It Works

1. The companion server (`ttsu-server.py`) runs locally at `http://localhost:9011` and proxies article fetches
2. The browser bookmarklet sends the current page URL to the reader via `?importurl=`
3. The reader fetches the article, extracts clean text using Mozilla Readability, strips images, and saves it as `<article-title>.txt` in your library

### Setup

**Start the server:**

```bash
python3 ~/ttsu-server.py
```

**Create the bookmarklet:**
Add a new browser bookmark with this as the URL:

```javascript
javascript: window.open(
  'http://localhost:9011/manage?importurl=' + encodeURIComponent(location.href)
);
```

### Usage

Navigate to any web article, click the bookmarklet — the article appears in your ッツ library automatically.

You can also import articles manually from the book manager by clicking the URL import button and pasting a link.

---

# Bookmarks & Reading Points

Custom reading points and character count changes in pagination mode are temporary — changing the page or resizing the window will reset them. When **Selection to Bookmark** is enabled and a custom reading point is active, selected text takes priority for bookmark positioning.

**Note**: Overlapping elements from browser extensions or app wrappers may affect which node is selected for a custom reading point. Move them outside the reader area or disable them if you have issues. If the selected node spans multiple columns or pages, the bookmark may be placed on a previous element — try the **Avoid Page Break** option, clear your selection, or select a different node.

**Note for "New Only" Import/Export**: Comparison is based on device time. Different time settings across devices may cause unexpected sync behaviour (data not uploaded/downloaded).

**Note for custom fonts**: After storing a custom font for the first time or hard refreshing, you may encounter longer load times. A normal tab refresh should resolve this.

**Note for "Disabled Wheel Navigation"**: Mouse wheel clicks are intercepted when enabled. For Yomitan, keep the wheel pressed while moving the cursor to trigger a popup.

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
