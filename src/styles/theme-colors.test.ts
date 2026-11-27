import { describe, expect, it } from "vitest";
import { themeColors } from "./theme-colors";

describe("themeColors", () => {
  it("reads the light tokens from :root and the dark ones from html.dark", () => {
    const css = `
      @theme inline {
        --color-page: var(--page);
      }
      :root {
        --page: #F3F5F6;
        --ink: #14202b;
        --gap: 1rem;
      }
      html.dark {
        --page: #0e141a;
        --ink: #dbe4ea;
      }
      a { color: var(--ink); }
    `;
    expect(themeColors(css)).toEqual({
      light: { page: "#f3f5f6", ink: "#14202b" },
      dark: { page: "#0e141a", ink: "#dbe4ea" },
    });
  });
});
