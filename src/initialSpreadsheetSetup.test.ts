import { test, expect } from "vitest";
import { config } from "./initialSpreadsheetSetup";

const hasDuplicates = (arr: any[]) => new Set(arr).size !== arr.length;

test("Config should not have duplicates", () => {
  expect(hasDuplicates(config.map((item) => item.name))).toBe(false);
});
