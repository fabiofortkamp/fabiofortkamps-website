import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { contrastRatio } from "./contrast";
import { themeColors } from "./theme-colors";

const css = readFileSync(new URL("./global.css", import.meta.url), "utf8");
const backgrounds = ["page", "surface"];
const texts = ["ink", "muted", "accent", "ok"];
const AA = 4.5;

describe.each(Object.entries(themeColors(css)))("the %s theme", (_, colors) => {
  it("defines every background and text colour", () => {
    expect(Object.keys(colors)).toEqual(
      expect.arrayContaining([...backgrounds, ...texts]),
    );
  });

  it.each(backgrounds.flatMap((bg) => texts.map((text) => [text, bg])))(
    "has AA contrast for %s on %s",
    (text, bg) => {
      expect(contrastRatio(colors[text], colors[bg])).toBeGreaterThanOrEqual(
        AA,
      );
    },
  );
});
