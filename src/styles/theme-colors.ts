// Reads the colour tokens of each theme from global.css, so the palette's
// contrast can be checked against the real source.

type Colors = Record<string, string>;

const hexTokens = (css: string, selector: string): Colors => {
  const start = css.indexOf(`${selector} {`);
  if (start < 0) return {};
  const block = css.slice(start, css.indexOf("}", start));
  const pairs = block.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})\s*;/gi);
  return Object.fromEntries(
    [...pairs].map(([, name, hex]) => [name, hex.toLowerCase()]),
  );
};

/** The `#rrggbb` tokens of each theme: `:root` is light, `html.dark` dark. */
export const themeColors = (css: string) => ({
  light: hexTokens(css, ":root"),
  dark: hexTokens(css, "html.dark"),
});
