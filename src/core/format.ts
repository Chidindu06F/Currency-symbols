/**
 * Pure, side-effect-free helpers for generating and formatting currency values.
 *
 * These functions never touch the Figma API, which keeps them trivially
 * testable and reusable from either the main thread or the UI.
 */
import type { CurrencyEntry } from "../data/currencies";
import type { DecimalPlaces, GenerateSettings } from "../types";

/**
 * Pick a random value within an inclusive range.
 *
 * The bounds are normalised, so a caller that passes min/max out of order still
 * gets a sensible result instead of an empty range.
 *
 * @param decimals 0 rounds to a whole number; 2 rounds to two decimal places.
 */
export function generateRandomValue(
  min: number,
  max: number,
  decimals: DecimalPlaces
): number {
  const lower = Math.min(min, max);
  const upper = Math.max(min, max);
  const raw = lower + Math.random() * (upper - lower);

  if (decimals === 0) {
    return Math.round(raw);
  }
  // Round to exactly two decimal places.
  return Math.round(raw * 100) / 100;
}

/**
 * Format a number with grouped thousands and a fixed number of decimals.
 *
 * Thousand separators are always applied — that is a hard rule of the spec, so
 * there is intentionally no option to disable them.
 *
 * @example formatNumber(12500, 0)    // "12,500"
 * @example formatNumber(12500.75, 2) // "12,500.75"
 */
export function formatNumber(value: number, decimals: DecimalPlaces): string {
  const sign = value < 0 ? "-" : "";
  const fixed = Math.abs(value).toFixed(decimals);
  const [integerPart, decimalPart] = fixed.split(".");

  // Insert a comma before every group of three digits (from the right).
  const grouped = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return decimalPart ? `${sign}${grouped}.${decimalPart}` : `${sign}${grouped}`;
}

/**
 * Render a numeric value as a currency string according to the chosen format.
 *
 * - "symbol" → "₦12,500" (symbol immediately before the number)
 * - "code"   → "NGN 12,500" (ISO code, a space, then the number)
 */
export function formatCurrencyValue(
  value: number,
  currency: CurrencyEntry,
  settings: GenerateSettings
): string {
  const number = formatNumber(value, settings.decimals);

  return settings.format === "code"
    ? `${currency.code} ${number}`
    : `${currency.symbol}${number}`;
}
