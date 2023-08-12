"use strict";

// src/initialSpreadsheetSetup.ts
var config = {
  sheets: [
    {
      name: "Student Info",
      columnConfigurations: [
        { headerName: "Id", field: "id" },
        { headerName: "First Name", field: "firstName" },
        { headerName: "Last Name", field: "lastName" }
      ]
    },
    {
      name: "Coach Info",
      columnConfigurations: [
        { headerName: "Id", field: "id" },
        { headerName: "First Name", field: "firstName" },
        { headerName: "Last Name", field: "lastName" },
        { headerName: "Hourly Rate", field: "hourlyRate" },
        { headerName: "Sheet Id", field: "sheetId" }
      ]
    },
    {
      name: "Payments",
      columnConfigurations: [
        { headerName: "Client", field: "client" },
        { headerName: "Amount", field: "amountPayed" },
        { headerName: "Date Received", field: "date" },
        { headerName: "Amount", field: "amountPayed" }
      ]
    },
    {
      name: "Summary",
      locked: true,
      columnConfigurations: [
        { headerName: "Student", field: "student" },
        { headerName: "Lessons Total", field: "lessonsTotal" },
        { headerName: "Extras Total", field: "extrasTotal" },
        { headerName: "Sub Total", field: "subTotal" },
        { headerName: "Payments Total", field: "paymentsTotal" },
        { headerName: "Charges Total", field: "chargesTotal" },
        { headerName: "Previous Balance", field: "previousBalance" },
        { headerName: "Grand Total", field: "grandTotal" }
      ]
    },
    {
      name: "Bill Preview",
      setup: () => {
      }
    },
    {
      name: "Email Template",
      setup: () => {
      }
    },
    {
      name: "Invoice History",
      columnConfigurations: [
        { headerName: "Invoice Id", field: "invoiceId" },
        { headerName: "Date", field: "date" },
        { headerName: "Student Name", field: "studentName" },
        { headerName: "Amount", field: "amount" },
        { headerName: "Invoice Link", field: "invoiceLink" }
      ]
    }
  ]
};
function initialSpreadsheetSetup() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = config.sheets.map((sheetConfig) => ({
    sheetConfig,
    sheet: spreadsheet.insertSheet(sheetConfig.name)
  }));
  sheets.forEach(({ sheet: currentSheet, sheetConfig }) => {
    if ("setup" in sheetConfig) {
      sheetConfig.setup(currentSheet);
      return;
    }
    currentSheet.getRange("A1:Z").applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY);
    const numberOfColumns = sheetConfig.columnConfigurations.length;
    currentSheet.deleteColumns(
      numberOfColumns + 1,
      currentSheet.getMaxColumns() - numberOfColumns
    );
    const headers = sheetConfig.columnConfigurations.map(
      ({ headerName = "" }) => headerName
    );
    currentSheet.getRange("1:1").setFontWeight("bold").setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
    currentSheet.getRange(1, 1, 1, numberOfColumns).setValues([headers]);
  });
}

// src/ui.ts
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu("Billing Actions").addItem("Initialize Spreadsheet", initialSpreadsheetSetup.name).addToUi();
}

// src/index.ts
var importedFunctions = [initialSpreadsheetSetup, onOpen];
