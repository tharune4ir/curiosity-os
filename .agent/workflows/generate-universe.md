---
description: How to regenerate Markdown nodes from JSON content files
---

# Universe Node Generation Workflow

// turbo-all

## When to Run
Run this script whenever you:
- **Add** a new JSON file to any content folder
- **Update** an existing JSON file with new/changed nodes
- **Delete** nodes from a JSON file (delete old .md files first)

## Steps

### 1. Delete old markdown files (if updating)
If you changed or removed nodes, delete the old `.md` files first:

```
del /Q "content\<folder_name>\*.md"
```

Example for Biosystem:
```
del /Q "content\2_biosystem\*.md"
```

> **Note:** This only deletes `.md` files. Your `master_universe.json` is safe.

### 2. Run the generator script

```
node scripts/generate-universe.js
```

The script will:
- Scan all configured content directories
- Parse every `.json` file found
- Auto-detect content fields from JSON keys
- Generate one `.md` file per node with YAML frontmatter + `## Heading` sections
- Print a summary of what was generated

### 3. Verify output
Check the output shows the expected number of nodes:
```
  ✓ Biosystem: 80 nodes generated

Done! Parsed 1 JSON files → 80 Markdown nodes total.
```

## Adding a New Content Source

1. Create a folder under `content/` (e.g., `content/3_cognition/`)
2. Add your `master_universe.json` inside it
3. Open `scripts/generate-universe.js` and add an entry to `CONTENT_SOURCES`:

```js
const CONTENT_SOURCES = [
  { dir: 'possibility_os',  label: 'Possibility OS' },
  { dir: 'physics_os',      label: 'Physics OS' },
  { dir: '2_biosystem',     label: 'Biosystem' },
  { dir: '3_cognition',     label: 'Cognition' },  // ← add here
];
```

4. Run `node scripts/generate-universe.js`

## JSON Schema Rules

The script is **schema-agnostic**. Any JSON key that is NOT one of these reserved fields will become a `## Heading` section in the markdown:

**Reserved (frontmatter) fields:**
- `id` → filename
- `title` → YAML frontmatter
- `icon` → YAML frontmatter
- `domain` → YAML frontmatter
- `linked_nodes` → WikiLinks at the bottom

**Everything else** → auto-converted to `## Heading` with the value as the body text.

Example: `"the_simple_truth": "..."` becomes `## The Simple Truth` in the markdown.
