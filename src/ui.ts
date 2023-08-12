import { initialSpreadsheetSetup } from "initialSpreadsheetSetup";

export function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu("Billing Actions")
    .addItem("Initialize Spreadsheet", initialSpreadsheetSetup.name)
    .addToUi();
}
