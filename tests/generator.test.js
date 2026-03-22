import { describe, expect, it } from "vitest";
import { buildTitle } from "../src/lib/generator.js";

describe("buildTitle", () => {
  it("joins the three title parts into the legacy sentence shape", () => {
    expect(buildTitle("Тридцать", "крутых бутербродов", "которые заставляют задуматься"))
      .toBe("Тридцать крутых бутербродов, которые заставляют задуматься");
  });
});
