import { test, expect } from "vitest";
import { sheetConfigs } from "./initialSpreadsheetSetup";

const hasDuplicates = (arr: any[]) => new Set(arr).size !== arr.length;

test("Config should not have duplicates", () => {
  expect(hasDuplicates(sheetConfigs.map((item) => item.name))).toBe(false);
});
