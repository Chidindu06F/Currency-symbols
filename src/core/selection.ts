/**
 * Selection traversal utilities.
 *
 * The plugin operates on text layers, but a user may select containers
 * (frames, groups, components) that hold text, or non-text shapes that should
 * simply be ignored. These helpers turn a raw selection into a clean summary.
 */

/** Result of inspecting the current selection. */
export interface SelectionSummary {
  /** Every text node found in the selection (including nested ones). */
  textNodes: TextNode[];
  /**
   * Count of top-level selected nodes that contained no text at all.
   * Reported to the user as "Skipped Y non-text layer(s)".
   */
  skipped: number;
}

/** Recursively collect every TEXT node within a single scene node. */
function collectTextNodes(node: SceneNode): TextNode[] {
  if (node.type === "TEXT") {
    return [node];
  }

  // Container nodes (frames, groups, components, sections) expose `children`.
  if ("children" in node) {
    const found: TextNode[] = [];
    for (const child of node.children) {
      found.push(...collectTextNodes(child));
    }
    return found;
  }

  return [];
}

/**
 * Summarise a selection into the text nodes to process and the number of
 * top-level layers that contributed no text (and were therefore skipped).
 *
 * A container that holds text counts as text (its text nodes are processed),
 * not as skipped — only layers yielding zero text nodes are counted as skipped.
 */
export function summarizeSelection(
  selection: readonly SceneNode[]
): SelectionSummary {
  const textNodes: TextNode[] = [];
  let skipped = 0;

  for (const node of selection) {
    const found = collectTextNodes(node);
    if (found.length === 0) {
      skipped++;
    } else {
      textNodes.push(...found);
    }
  }

  return { textNodes, skipped };
}
