This Figma plugin inserts text-based currency symbols into a selected text layer.

Quick usage

1. In Figma, run the plugin (from Plugins > Development > Currencies or install the plugin bundle).
2. The plugin UI shows a searchable list of countries with ISO codes and symbols.
3. Type to filter by country name, ISO code, or symbol.
4. Click an item to insert its symbol into the currently selected text layer.

Files

- `manifest.json` - plugin configuration (entry points, UI).
- `ui.html` - minimal, searchable UI.
- `code.ts` - TypeScript source for plugin logic (development). Not required at runtime.
- `code.js` - Runtime JavaScript (referenced by `manifest.json`).
- `currencies.ts` - Exports the currency data used during development.

Requirements mapping

- Searchable dropdown list of countries: Implemented in `ui.html` (search input + list). (Done)
- Each option shows: country name, currency code (ISO 4217), and currency symbol: Displayed in each list item. (Done)
- Insert symbol into currently selected text layer: Implemented in `code.js` / `code.ts` and uses Figma API to set `textNode.characters`. (Done)
- If no text layer selected: shows `figma.notify` prompting user to select one. (Done)
- Modular files: `manifest.json`, `ui.html`, `code.ts`/`code.js`, `currencies.ts`. (Done)
- Load currency list locally from `currencies.ts`: Provided; `code.js` inlines the list for runtime convenience. (Done)
- TypeScript used: `code.ts` included. (Done)
- Minimal, clean UI: `ui.html` styled with simple CSS and keyboard support. (Done)

Development notes

- If you prefer editing in TypeScript and producing a single bundled plugin, compile `code.ts` and bundle `currencies.ts` into `code.js` using your build tool (esbuild/rollup/tsc).

If you want changes to the country list, edit `currencies.ts` and update `code.js` accordingly (or use a bundler to include it).

libraries. You can find the download link here:

https://nodejs.org/en/download/

Next, install TypeScript using the command:

npm install -g typescript

Finally, in the directory of your plugin, get the latest type definitions for the plugin API by running:

npm install --save-dev @figma/plugin-typings

If you are familiar with JavaScript, TypeScript will look very familiar. In fact, valid JavaScript code
is already valid Typescript code.

TypeScript adds type annotations to variables. This allows code editors such as Visual Studio Code
to provide information about the Figma API while you are writing code, as well as help catch bugs
you previously didn't notice.

For more information, visit https://www.typescriptlang.org/

Using TypeScript requires a compiler to convert TypeScript (code.ts) into JavaScript (code.js)
for the browser to run.

We recommend writing TypeScript code using Visual Studio code:

1. Download Visual Studio Code if you haven't already: https://code.visualstudio.com/.
2. Open this directory in Visual Studio Code.
3. Compile TypeScript to JavaScript: Run the "Terminal > Run Build Task..." menu item,
   then select "npm: watch". You will have to do this again every time
   you reopen Visual Studio Code.

That's it! Visual Studio Code will regenerate the JavaScript file every time you save.
