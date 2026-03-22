import { describe, expect, it } from "vitest";
import { createTitleFromData } from "../src/lib/generator.js";
import data from "../src/data/titles.json";

describe("createTitleFromData", () => {
  it("uses exactly one random item from each array", () => {
    const fakeRandom = () => 0;
    expect(createTitleFromData(data, fakeRandom))
      .toBe(`${data.part1[0]} ${data.part2[0]}, ${data.part3[0]}`);
  });
});
