import { expect, it, test } from "vitest";
import { transformSheetConfigData } from "./transformSheetConfigData";
import { StandardSheetConfig } from "./defs";

interface ExampleEntry {
  firstName: string;
  lastName: string;
  age: number;
}

const exampleSheetConfig: StandardSheetConfig<ExampleEntry> = {
  name: "Example Sheet",
  columnConfigurations: [
    {
      headerName: "First Name",
      field: "firstName",
    },
    {
      headerName: "Last Name",
      field: "lastName",
    },
    {
      headerName: "Age",
      field: "age",
    },
  ],
};

test("assigns values to the expected keys", () => {
  const testData: any[][] = [
    ["Marcus", "Connolly", 35],
    ["Laurence", "Lessard", 37],
    ["John", "Doe", 99],
  ];
  expect(transformSheetConfigData(testData, exampleSheetConfig)).toEqual([
    { firstName: "Marcus", lastName: "Connolly", age: 35 },
    { firstName: "Laurence", lastName: "Lessard", age: 37 },
    { firstName: "John", lastName: "Doe", age: 99 },
  ]);
});

it("filters out empty rows", () => {
  const testData: any[][] = [
    ["Marcus", "Connolly", 35],
    ["Bob", "", ""],
    ["Laurence", "Lessard", 37],
    ["John", "Doe", 99],
    [undefined, "", ""],
    ["", "", ""],
  ];
  expect(transformSheetConfigData(testData, exampleSheetConfig)).toEqual([
    { firstName: "Marcus", lastName: "Connolly", age: 35 },
    { firstName: "Bob", lastName: "", age: "" },
    { firstName: "Laurence", lastName: "Lessard", age: 37 },
    { firstName: "John", lastName: "Doe", age: 99 },
  ]);
});

test("duplicate config keys are treated as an array of values", () => {
  const testData = [
    [1, "a", "b", "c"],
    [2, "x", "y", "z"],
  ];
  const config: StandardSheetConfig<any> = {
    name: "test",
    columnConfigurations: [
      { field: "id" },
      { field: "character" },
      { field: "character" },
      { field: "character" },
    ],
  };
  expect(transformSheetConfigData(testData, config)).toEqual([
    { id: 1, character: ["a", "b", "c"] },
    { id: 2, character: ["x", "y", "z"] },
  ]);
});
