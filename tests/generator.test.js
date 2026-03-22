import { describe, expect, it } from "vitest";
import { createTitleFromData } from "../src/lib/generator.js";

describe("createTitleFromData", () => {
  it("uses exactly one random item from each array", () => {
    const fakeRandom = () => 0;
    const sampleData = {
      part1: ["11 самых известных предметов мебели"],
      part2: ["регулярных расходов"],
      part3: ["которые выставлены в музеях"],
    };

    expect(createTitleFromData(sampleData, fakeRandom))
      .toBe("11 самых известных предметов мебели регулярных расходов, которые выставлены в музеях");
  });

  it("converts HTML entities to text-safe spaces", () => {
    const fakeRandom = () => 0;
    const title = createTitleFromData(
      {
        part1: ["12 крутых бутербродов"],
        part2: ["на&nbsp;завтрак"],
        part3: ["которые хорошо готовят"],
      },
      fakeRandom
    );

    expect(title).toBe("12 крутых бутербродов на\u00a0завтрак, которые хорошо готовят");
  });
});
