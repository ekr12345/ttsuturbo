# ッツ Turbo (ttsuturbo)

A personal fork of [**ッツ Reader**](https://github.com/ttu-ttu/ebook-reader), a browser-based EPUB reader designed for immersive Japanese reading.

This fork adds inline dictionary lookup, vocabulary highlighting, markdown export, and several reading-comfort improvements.

> For reader features, supported formats, storage, synchronization, and other core functionality, see the [upstream README](https://github.com/ttu-ttu/ebook-reader).

## ✨ Features Added in This Fork

### 📖 Inline Dictionary Lookup

Navigate text with the arrow keys and press **Enter** to look up the selected word.

The popup displays:

* Reading (ふりがな)
* Part of speech
* English definitions

Dictionary data is provided by the **Jotoba API**. The popup automatically repositions itself to remain visible in both horizontal and vertical writing modes.

### 🖍️ Vocabulary Highlighting

Save words while reading by highlighting any word you've looked up.

* Highlights persist across sessions
* Saved words appear as removable chips in the dictionary popup
* Includes a **Clear All** option for quick cleanup

### 📝 Markdown Export

Export all highlighted vocabulary and definitions to a Markdown file:

```text
ttu-highlights-<timestamp>.md
```

Perfect for importing into:

* Anki
* Obsidian
* Personal study notes
* Other language-learning workflows

### 🔤 Font Override Support

Your selected font now takes priority over fonts embedded in EPUB files.

Font mapping:

* **Mincho / Serif** → Group 1
* **Gothic / Sans-serif** → Group 2

The book's original font is retained only as a fallback.

## ⌨️ Keyboard Shortcuts

| Key             | Action                                            |
| --------------- | ------------------------------------------------- |
| `Arrow Keys`    | Move the word cursor                              |
| `Shift + Arrow` | Extend the current selection                      |
| `Enter`         | Look up the selected word                         |
| `Escape`        | Close the dictionary popup or clear the selection |
| `d`             | Toggle reader header UI                           |
| `f`             | Toggle fullscreen                                 |
| `s`             | Open settings                                     |

### Cursor Navigation

**Horizontal text**

* Left / Right → Move by character
* Up / Down → Move between lines

**Vertical (vertical-rl) text**

* Up / Down → Move within a column
* Left / Right → Move between columns

> All original ッツ Reader shortcuts remain available, including bookmarks, auto-scroll, chapter navigation, and more. See the [upstream documentation](https://github.com/ttu-ttu/ebook-reader) for the complete list.

## 🚀 Running Locally

### Requirements

* Node.js 20+
* pnpm

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Starts the development server at:

```text
http://localhost:5173
```

### Production Build

```bash
pnpm build
```

Build output is generated in:

```text
apps/web/build
```
