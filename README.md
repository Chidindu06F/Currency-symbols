# Currency symbols — Figma Plugin

Insert currency symbols or generate realistic random currency values across one
or many selected text layers.

## Features

- **Search** by country, currency name, or ISO code (e.g. `Nigeria`, `Naira`, `NGN`).
- **Insert Symbol** — write the selected currency's symbol into every selected text layer.
- **Generate Values** — fill each selected text layer with an independently
  generated random value, e.g. `₦12,500`, `$4,999`, `NGN 25,000`.
- **Multi-selection** — process many text layers at once; each receives its own value.
- **Smart selection handling** — nested text inside frames/groups is found
  automatically; non-text layers are skipped with clear feedback.
- **Resilient** — fonts are loaded per layer, and a single failure never aborts the batch.

### Generate Values settings

| Setting | Options | Default |
| --- | --- | --- |
| Minimum value | any number | `100` |
| Maximum value | any number | `50,000` |
| Decimal places | None / 2 | None |
| Format | Symbol (`₦12,500`) / Code (`NGN 12,500`) | Symbol |

Thousand separators are always applied.

## Project structure

```
src/
  code.ts            # Main-thread entry point (UI wiring + message routing)
  types.ts           # Message + settings contracts shared with the UI
  data/
    currencies.ts    # Currency dataset (country, name, code, symbol)
  core/
    format.ts        # Random value generation + number/currency formatting (pure)
    selection.ts     # Collect text nodes, count skipped non-text layers
    fonts.ts         # Per-node font loading (handles mixed fonts)
    apply.ts         # Orchestrates applying an action across a batch of nodes
ui.html              # Dark-mode UI (Geist font), single self-contained file
manifest.json        # Figma plugin manifest
```

The main-thread code is written as modular TypeScript and bundled into a single
`code.js` with esbuild (Figma's main-thread sandbox has no module loader). The
UI is a self-contained HTML file that receives the currency dataset from the
main thread on launch.

## Development

```bash
npm install      # install dependencies
npm run build    # bundle src/code.ts -> code.js
npm run watch    # rebuild on change
npm run typecheck# strict type-check (tsc --noEmit)
npm run lint     # eslint
```

`code.js` is a build artifact (git-ignored); run `npm run build` before loading
the plugin.

## Usage in Figma

1. Run `npm install && npm run build`.
2. In Figma: **Plugins → Development → Import plugin from manifest…** and select
   `manifest.json`.
3. Select one or more text layers on the canvas.
4. Open the plugin, search for a currency, choose **Insert Symbol** or
   **Generate Values**, adjust settings, and click **Apply**.
