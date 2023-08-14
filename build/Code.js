"use strict";

// src/getSpreadsheetByName.ts
function getSheetByName(name) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(name);
  if (sheet === null) {
    throw new Error(`spreadsheet misconfigured, "${name}" sheet is missing`);
  }
  return sheet;
}

// src/Sheets/CoachInfo.ts
var CoachInfoSheetConfig = {
  name: "Coach Info",
  columnConfigurations: [
    { headerName: "Id", field: "id" },
    { headerName: "First Name", field: "firstName" },
    { headerName: "Last Name", field: "lastName" },
    { headerName: "Hourly Rate", field: "hourlyRateInDollars" },
    { headerName: "Log Sheet", field: "logSheetUrl" },
    { headerName: "Sheet Id", field: "logSheetId" }
  ]
};
var LessonLogSheetConfig = {
  name: "Lesson Log",
  columnConfigurations: [
    { headerName: "Date", field: "date" },
    { headerName: "Minutes", field: "lessonTimeInMinutes" },
    { headerName: "Skaters", field: "skaters" },
    { headerName: "", field: "skaters" },
    { headerName: "", field: "skaters" },
    { headerName: "", field: "skaters" },
    { headerName: "", field: "skaters" },
    { headerName: "", field: "skaters" },
    { headerName: "", field: "skaters" },
    { headerName: "", field: "skaters" }
  ]
};
function createCoachLogSheet_(firstName, lastName) {
  const fullName = `lesson_log-${firstName}_${lastName}`;
  const newSpreadsheet = SpreadsheetApp.create(fullName);
  const logSheet = newSpreadsheet.getSheets()[0];
  logSheet.setName(LessonLogSheetConfig.name);
  setupStandardSheet(logSheet, LessonLogSheetConfig);
  return {
    logSheetId: newSpreadsheet.getId(),
    logSheetUrl: newSpreadsheet.getUrl()
  };
}
function addCoachPrompt_() {
  const ui = SpreadsheetApp.getUi();
  const firstName = ui.prompt("Enter new coach's first name").getResponseText();
  const lastName = ui.prompt("Enter new coach's last name").getResponseText();
  const hourlyRateInDollarsText = ui.prompt("Enter new coach's hourly rate in dollars").getResponseText();
  const hourlyRateInDollars = parseFloat(hourlyRateInDollarsText);
  return { firstName, lastName, hourlyRateInDollars };
}
function addCoach() {
  const { firstName, lastName, hourlyRateInDollars } = addCoachPrompt_();
  const coachSheet = getSheetByName(CoachInfoSheetConfig.name);
  const { logSheetId, logSheetUrl } = createCoachLogSheet_(firstName, lastName);
  const id = Utilities.getUuid();
  coachSheet.appendRow([
    id,
    firstName,
    lastName,
    hourlyRateInDollars,
    logSheetUrl,
    logSheetId
  ]);
}

// src/initialSpreadsheetSetup.ts
var config = [
  {
    name: "Student Info",
    columnConfigurations: [
      { headerName: "Id", field: "id" },
      { headerName: "First Name", field: "firstName" },
      { headerName: "Last Name", field: "lastName" }
    ]
  },
  CoachInfoSheetConfig,
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
    setup: (sheet) => {
    }
  },
  {
    name: "Email Template",
    setup: (sheet) => {
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
];
function setupSpecialSheet(sheet, sheetConfig) {
  sheetConfig.setup(sheet);
}
function setupStandardSheet(sheet, sheetConfig) {
  sheet.getRange("A1:Z").applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY);
  const numberOfColumns = sheetConfig.columnConfigurations.length;
  sheet.deleteColumns(
    numberOfColumns + 1,
    sheet.getMaxColumns() - numberOfColumns
  );
  const headers = sheetConfig.columnConfigurations.map(
    ({ headerName = "" }) => headerName
  );
  sheet.getRange("1:1").setFontWeight("bold").setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
  sheet.getRange(1, 1, 1, numberOfColumns).setValues([headers]);
}
function initialSpreadsheetSetup() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = config.map((sheetConfig) => ({
    sheetConfig,
    sheet: spreadsheet.insertSheet(sheetConfig.name)
  }));
  sheets.forEach(({ sheet: currentSheet, sheetConfig }) => {
    if ("setup" in sheetConfig) {
      setupSpecialSheet(currentSheet, sheetConfig);
      return;
    }
    setupStandardSheet(currentSheet, sheetConfig);
  });
}

// src/ui.ts
var DEFAULT_SHEET_NAME = "Sheet1";
function reset() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const currentSheets = spreadsheet.getSheets().filter((sheet) => sheet.getName() !== DEFAULT_SHEET_NAME);
  if (!spreadsheet.getSheetByName(DEFAULT_SHEET_NAME)) {
    spreadsheet.insertSheet(DEFAULT_SHEET_NAME);
  }
  currentSheets.forEach((sheet) => {
    spreadsheet.deleteSheet(sheet);
  });
}
function resetAndInit() {
  reset();
  initialSpreadsheetSetup();
}
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu("Billing Actions").addItem("Initialize Spreadsheet", initialSpreadsheetSetup.name).addItem("Reset and Initialize Spreadsheet", resetAndInit.name).addItem("Add Coach", addCoach.name).addToUi();
}

// src/index.ts
var importedFunctions = [initialSpreadsheetSetup, onOpen];
