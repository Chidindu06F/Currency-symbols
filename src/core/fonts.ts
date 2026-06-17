/**
 * Font loading helpers.
 *
 * Figma requires every font used by a text node to be loaded before its
 * `characters` can be modified. A node may use a single font or a mix of fonts
 * across character ranges, so both cases are handled.
 */

/**
 * Load all fonts a text node depends on.
 *
 * Throws if a font cannot be loaded (e.g. the font is missing from the
 * document). Callers are expected to catch this per-node so one bad layer does
 * not abort the whole batch.
 */
export async function loadFontsForNode(node: TextNode): Promise<void> {
  const fontName = node.fontName;

  if (fontName === figma.mixed) {
    // The node uses multiple fonts across its character ranges; load each one.
    const length = node.characters.length;
    const fonts = length > 0 ? node.getRangeAllFontNames(0, length) : [];
    await Promise.all(fonts.map((font) => figma.loadFontAsync(font)));
    return;
  }

  await figma.loadFontAsync(fontName);
}
