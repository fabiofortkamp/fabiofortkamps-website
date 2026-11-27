// WCAG 2 contrast between two colours.
// https://www.w3.org/TR/WCAG22/#dfn-contrast-ratio

const linearChannel = (hex: string) => {
  const c = parseInt(hex, 16) / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};

const luminance = (color: string) => {
  const [r, g, b] = (color.match(/[0-9a-f]{2}/gi) ?? []).map(linearChannel);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/** Contrast ratio of two `#rrggbb` colours, from 1 to 21. */
export const contrastRatio = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
