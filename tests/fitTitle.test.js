import { describe, expect, it } from "vitest";
import { getNextScale } from "../src/lib/fitTitle.js";

describe("getNextScale", () => {
  it("keeps the scale unchanged when content fits", () => {
    expect(getNextScale({ fits: true, currentScale: 1 })).toBe(1);
  });

  it("reduces the scale by one step when content overflows", () => {
    expect(getNextScale({ fits: false, currentScale: 1 })).toBe(0.96);
  });

  it("never goes below the floor", () => {
    expect(getNextScale({ fits: false, currentScale: 0.62 })).toBe(0.62);
  });
});
