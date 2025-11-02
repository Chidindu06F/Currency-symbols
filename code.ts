declare const figma: any;
declare const __html__: string;
import { currencies } from "./currencies";

// Show the UI. Size chosen to fit a searchable list.
figma.showUI(__html__, { width: 360, height: 520 });

// Send currencies to the UI after it's shown so the UI renders from local data.
figma.ui.postMessage({ type: "currencies", currencies });

// Helper: traverse selection to find first TEXT node (including inside groups)
function findFirstTextNode(selection: readonly SceneNode[]): TextNode | null {
  for (const node of selection) {
    if (node.type === "TEXT") return node as TextNode;
    // If node has children, search recursively
    // @ts-ignore - children exists on container nodes
    if ("children" in node && Array.isArray((node as any).children)) {
      const child = findFirstTextNode((node as any).children as SceneNode[]);
      if (child) return child;
    }
  }
  return null;
}

// Helper: collect all TEXT nodes in a selection (including inside groups)
function findAllTextNodes(selection: readonly SceneNode[]): TextNode[] {
  const results: TextNode[] = [];
  for (const node of selection) {
    if (node.type === "TEXT") {
      results.push(node as TextNode);
    }
    // @ts-ignore - children exists on container nodes
    if ("children" in node && Array.isArray((node as any).children)) {
      results.push(...findAllTextNodes((node as any).children as SceneNode[]));
    }
  }
  return results;
}

// Ensure a font is loaded for the text node before modifying characters.
async function ensureFontLoaded(node: TextNode) {
  try {
    const fontName = node.fontName;
    if (typeof fontName === "symbol" || (fontName as any) === figma.mixed) {
      // fallback to a common font
      await figma.loadFontAsync({ family: "Roboto", style: "Regular" });
    } else if (Array.isArray(fontName)) {
      // Mixed fonts in segments - try to load first one
      const first = fontName[0] as FontName;
      await figma.loadFontAsync(first);
    } else {
      await figma.loadFontAsync(fontName as FontName);
    }
  } catch (err) {
    // best-effort; if font can't be loaded, we still try to set characters
    // but Figma may throw an error.
    // console.log('Font load failed', err);
  }
}

// Handle messages from the UI
figma.ui.onmessage = async (msg: any) => {
  if (msg.type === "insert-symbol") {
    const symbol: string = msg.symbol;

    const selection = figma.currentPage.selection;
    const textNodes = findAllTextNodes(selection);

    if (!textNodes || textNodes.length === 0) {
      figma.notify("Please select a text layer to insert the currency symbol.");
      return;
    }

    // Ensure fonts for all text nodes are loaded first (best-effort)
    for (const node of textNodes) {
      // eslint-disable-next-line no-await-in-loop
      await ensureFontLoaded(node);
    }

    // Attempt to replace characters on each text node and count successes
    let successCount = 0;
    for (const node of textNodes) {
      try {
        node.characters = symbol;
        successCount++;
      } catch (err) {
        // continue to next node
      }
    }

    if (successCount > 0) {
      const plural = successCount > 1 ? "s" : "";
      figma.notify(
        `Inserted ${msg.code || ""} ${symbol}`.trim() +
          (textNodes.length > 1 ? ` into ${successCount} layer${plural}` : "")
      );
    } else {
      figma.notify("Failed to insert symbol into the selected text layer(s).");
    }
  }

  if (msg.type === "cancel") {
    figma.closePlugin();
  }
};
