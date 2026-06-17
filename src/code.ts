/**
 * Plugin main thread entry point.
 *
 * Responsibilities:
 * 1. Show the UI and hand it the currency dataset.
 * 2. Receive UI requests, validate the current selection, and apply the action.
 * 3. Report concise, accurate feedback to both the canvas (toast) and the UI.
 *
 * All heavy lifting lives in the `core/` modules; this file is just wiring.
 */
import { applyToTextNodes } from "./core/apply";
import { summarizeSelection } from "./core/selection";
import { currencies } from "./data/currencies";
import type { PluginMessage, UIMessage } from "./types";

const UI_WIDTH = 380;
const UI_HEIGHT = 600;

figma.showUI(__html__, { width: UI_WIDTH, height: UI_HEIGHT });

/** Type-safe wrapper around `figma.ui.postMessage`. */
function postToUI(message: PluginMessage): void {
  figma.ui.postMessage(message);
}

// Hand the UI its data once, immediately after it loads.
postToUI({ type: "init", currencies });

/** Build the user-facing summary line, with correct pluralisation. */
function buildResultMessage(
  updated: number,
  skipped: number,
  failedCount: number
): string {
  const parts: string[] = [
    `Updated ${updated} text layer${updated === 1 ? "" : "s"}.`,
  ];
  if (skipped > 0) {
    parts.push(`Skipped ${skipped} non-text layer${skipped === 1 ? "" : "s"}.`);
  }
  if (failedCount > 0) {
    parts.push(
      `${failedCount} layer${failedCount === 1 ? "" : "s"} failed (font could not load).`
    );
  }
  return parts.join(" ");
}

figma.ui.onmessage = async (msg: UIMessage): Promise<void> => {
  if (msg.type === "close") {
    figma.closePlugin();
    return;
  }

  if (msg.type === "apply") {
    const { textNodes, skipped } = summarizeSelection(figma.currentPage.selection);

    // Validation: there must be at least one text layer to act on.
    if (textNodes.length === 0) {
      const message = "Select at least one text layer.";
      figma.notify(message, { error: true });
      postToUI({ type: "result", status: "error", message });
      return;
    }

    const { updated, failed } = await applyToTextNodes(
      textNodes,
      msg.action,
      msg.currency,
      msg.settings
    );

    const message = buildResultMessage(updated, skipped, failed.length);
    const status = updated > 0 ? "success" : "error";
    figma.notify(message, { error: status === "error" });
    postToUI({ type: "result", status, message });
  }
};
