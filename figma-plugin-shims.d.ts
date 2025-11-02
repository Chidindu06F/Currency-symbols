// Minimal shims to allow local TypeScript checking without full @figma/plugin-typings
declare global {
  const __html__: string;
  type SceneNode = any;
  type TextNode = any;
  type FontName = any;
}

// Augment figma symbol minimally
declare var figma: any;

export {};
