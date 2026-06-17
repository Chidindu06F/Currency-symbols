/**
 * Applies an action to a batch of text nodes.
 *
 * This is the orchestration layer that ties together value generation,
 * formatting, and font loading. It is deliberately resilient: a failure on one
 * node (e.g. an unloadable font) is recorded and the batch continues.
 */
import type { CurrencyEntry } from "../data/currencies";
import type { ActionType, GenerateSettings } from "../types";
import { formatCurrencyValue, generateRandomValue } from "./format";
import { loadFontsForNode } from "./fonts";

/** Outcome of applying an action across a batch of text nodes. */
export interface ApplyResult {
  /** How many text nodes were successfully updated. */
  updated: number;
  /** Names of text nodes that could not be updated (e.g. font load failure). */
  failed: string[];
}

/**
 * Resolve the string to write into a single text node for the given action.
 *
 * - "insert-symbol" → the currency symbol, identical for every node.
 * - "generate"      → a freshly generated, independently random value, so each
 *   node receives a different amount.
 */
function resolveText(
  action: ActionType,
  currency: CurrencyEntry,
  settings: GenerateSettings
): string {
  if (action === "insert-symbol") {
    return currency.symbol;
  }

  const value = generateRandomValue(settings.min, settings.max, settings.decimals);
  return formatCurrencyValue(value, currency, settings);
}

/**
 * Apply the chosen action to every provided text node.
 *
 * Each node's fonts are loaded immediately before it is edited, and every node
 * is wrapped in its own try/catch so a single failure never aborts the batch.
 */
export async function applyToTextNodes(
  textNodes: TextNode[],
  action: ActionType,
  currency: CurrencyEntry,
  settings: GenerateSettings
): Promise<ApplyResult> {
  let updated = 0;
  const failed: string[] = [];

  for (const node of textNodes) {
    try {
      await loadFontsForNode(node);
      node.characters = resolveText(action, currency, settings);
      updated++;
    } catch {
      // Keep going — one unloadable font must not crash the whole batch.
      failed.push(node.name);
    }
  }

  return { updated, failed };
}
