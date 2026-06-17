/**
 * Message contracts shared between the plugin main thread (`code.ts`) and the
 * UI iframe (`ui.html`). Keeping these in one place gives both sides a single,
 * strongly-typed protocol to follow.
 */
import type { CurrencyEntry } from "./data/currencies";

/** The two things the plugin can do with the selected text layers. */
export type ActionType = "insert-symbol" | "generate";

/** Number of decimal places to render. Thousand separators are always on. */
export type DecimalPlaces = 0 | 2;

/** How a generated value is prefixed: "₦12,500" vs "NGN 12,500". */
export type CurrencyFormat = "symbol" | "code";

/** User-configurable options for the "Generate Values" action. */
export interface GenerateSettings {
  /** Inclusive lower bound for the random value. */
  min: number;
  /** Inclusive upper bound for the random value. */
  max: number;
  /** 0 = whole numbers, 2 = two decimal places. */
  decimals: DecimalPlaces;
  /** Symbol prefix vs ISO-code prefix. */
  format: CurrencyFormat;
}

/** Messages sent from the UI iframe to the main thread. */
export type UIMessage =
  | {
      type: "apply";
      action: ActionType;
      currency: CurrencyEntry;
      settings: GenerateSettings;
    }
  | { type: "close" };

/** Messages sent from the main thread back to the UI iframe. */
export type PluginMessage =
  | { type: "init"; currencies: CurrencyEntry[] }
  | { type: "result"; status: "success" | "error"; message: string };
