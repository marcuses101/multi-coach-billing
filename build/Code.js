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

// src/setupStandardSheet.ts
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

// src/Sheets/LessonInput.ts
var LessonInputSheetConfig = {
  name: "Lessons",
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
    { headerName: "", field: "skaters" },
    { headerName: "", field: "skaters" },
    { headerName: "", field: "skaters" },
    { headerName: "", field: "skaters" },
    { headerName: "", field: "skaters" },
    { headerName: "", field: "skaters" },
    { headerName: "", field: "skaters" },
    { headerName: "", field: "skaters" },
    { headerName: "", field: "skaters" },
    { headerName: "", field: "skaters" }
  ]
};

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
function getCoaches() {
  const coachSheet = getSheetByName("Coach Info");
  const coachSheetData = coachSheet.getDataRange().getValues().slice(1);
  const coaches = coachSheetData.reduce((coachArray, currentRow) => {
    if (currentRow.some((entry) => !entry)) {
      return coachArray;
    }
    const coach = {
      id: currentRow[0],
      firstName: currentRow[1],
      lastName: currentRow[2],
      hourlyRateInDollars: currentRow[3],
      logSheetUrl: currentRow[4],
      logSheetId: currentRow[5]
    };
    coachArray.push(coach);
    return coachArray;
  }, []);
  return coaches;
}
function createCoachLogSheet_(firstName, lastName) {
  const fullName = `lesson_log-${firstName}_${lastName}`;
  const newSpreadsheet = SpreadsheetApp.create(fullName);
  const logSheet = newSpreadsheet.getSheets()[0];
  logSheet.setName(LessonInputSheetConfig.name);
  setupStandardSheet(logSheet, LessonInputSheetConfig);
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
  const coachSheet = getSheetByName("Coach Info");
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

// src/placeholderSheetSetup.ts
function placeholderSheetSetup(sheet) {
  sheet.getRange("A2").setValue("TODO - SETUP HAS NOT BEEN IMPLEMENTED FOR THIS SHEET");
}

// src/Sheets/CoachSummary.ts
var CoachSummarySheetConfig = {
  name: "Coaches Summary",
  locked: true,
  columnConfigurations: [
    { headerName: "Coach Name", field: "coachName" },
    { headerName: "Previous Balance", field: "previousBalanceInDollars" }
  ],
  setup: placeholderSheetSetup
};

// src/Sheets/InvoiceHistory.ts
var InvoiceHistorySheetConfig = {
  name: "Invoice History",
  columnConfigurations: [
    { headerName: "Invoice Id", field: "invoiceId" },
    { headerName: "Date", field: "date" },
    { headerName: "Student Name", field: "studentName" },
    { headerName: "Amount", field: "amount" },
    { headerName: "Invoice Link", field: "invoiceLink" }
  ]
};

// src/Sheets/SkaterPayments.ts
var SkaterPaymentsSheetConfig = {
  name: "Payments",
  columnConfigurations: [
    { headerName: "Skater Name", field: "skaterName" },
    { headerName: "Amount", field: "amountPayedInDollars" },
    { headerName: "Date Received", field: "date" },
    { headerName: "Additional Info", field: "additionalInfo" }
  ]
};

// src/Sheets/SkatersSummary.ts
var SkatersSummarySheetConfig = {
  name: "Skaters Summary",
  locked: true,
  columnConfigurations: [
    { headerName: "Skater Name", field: "skaterName" },
    { headerName: "Lessons Total", field: "lessonsTotalInDollars" },
    { headerName: "Extras Total", field: "extrasTotalInDollars" },
    { headerName: "Sub Total", field: "subTotalInDollars" },
    { headerName: "Payments Total", field: "paymentsTotalInDollars" },
    { headerName: "Charges Total", field: "chargesTotalInDollars" },
    { headerName: "Previous Balance", field: "previousBalanceInDollars" },
    { headerName: "Grand Total", field: "grandTotalInDollars" }
  ],
  setup: placeholderSheetSetup
};

// src/Sheets/SkaterInfo.ts
var SkaterInfoSheetConfig = {
  name: "Skater Info",
  columnConfigurations: [
    { headerName: "Id", field: "id" },
    { headerName: "First Name", field: "firstName" },
    { headerName: "Last Name", field: "lastName" },
    { headerName: "Email", field: "email" },
    { headerName: "Is Student Active", field: "isActive" }
  ]
};
function promptForStudentInfo_() {
  const ui = SpreadsheetApp.getUi();
  const firstName = ui.prompt("Enter student's firstName").getResponseText();
  const lastName = ui.prompt("Enter student's last name").getResponseText();
  const email = ui.prompt("Enter student's email address").getResponseText();
  return { firstName, lastName, email };
}
function addSkater() {
  const sheet = getSheetByName("Skater Info");
  const { firstName, lastName, email } = promptForStudentInfo_();
  const id = Utilities.getUuid();
  sheet.appendRow([id, firstName, lastName, email, true]);
}

// src/Sheets/LessonLogs.ts
var LessonLogsSheetConfig = {
  name: "Lesson Logs",
  locked: true,
  columnConfigurations: [
    { headerName: "Coach Name", field: "coachName" },
    { headerName: "Coach Id", field: "coachId" },
    { headerName: "Date", field: "date" },
    { headerName: "Minutes", field: "lessonDurationInMinutes" },
    { headerName: "Skaters", field: "skaters" },
    { headerName: "", field: "skaters" },
    { headerName: "", field: "skaters" },
    { headerName: "", field: "skaters" },
    { headerName: "", field: "skaters" },
    { headerName: "", field: "skaters" },
    { headerName: "", field: "skaters" },
    { headerName: "", field: "skaters" },
    { headerName: "", field: "skaters" },
    { headerName: "", field: "skaters" },
    { headerName: "", field: "skaters" },
    { headerName: "", field: "skaters" },
    { headerName: "", field: "skaters" },
    { headerName: "", field: "skaters" },
    { headerName: "", field: "skaters" },
    { headerName: "", field: "skaters" },
    { headerName: "", field: "skaters" }
  ]
};
function syncLessons() {
  const coaches = getCoaches();
  const allLessonData = coaches.flatMap((coach) => {
    const coachName = `${coach.firstName} ${coach.lastName}`;
    const spreadsheet = SpreadsheetApp.openById(coach.logSheetId);
    const coachLessonSheet = spreadsheet.getSheets()[0];
    const numberOfRows2 = coachLessonSheet.getLastRow() - 1;
    const numberOfColumns2 = coachLessonSheet.getMaxColumns();
    const rows = spreadsheet.getSheets()[0].getRange(2, 1, numberOfRows2, numberOfColumns2).getValues();
    const filledRows = rows.reduce((acc, row) => {
      const [date, minutes, ...skaters] = row;
      const isValidRow = date && minutes && skaters.some((skater) => Boolean(skater));
      if (!isValidRow) {
        return acc;
      }
      acc.push([coachName, coach.id, date, minutes, ...skaters]);
      return acc;
    }, []);
    return filledRows;
  });
  const lessonLogSheet = getSheetByName("Lesson Logs");
  lessonLogSheet.getRange("A2:Z").clearContent();
  const numberOfRows = allLessonData.length;
  if (numberOfRows === 0)
    return;
  const numberOfColumns = allLessonData[0].length;
  lessonLogSheet.getRange(2, 1, numberOfRows, numberOfColumns).setValues(allLessonData);
}

// src/Sheets/SkaterBalanceLog.ts
var SkaterBalanceLogSheetConfig = {
  name: "Skater Balance Log",
  columnConfigurations: [
    { headerName: "Skater Id", field: "skaterId" },
    { headerName: "Skater Name", field: "skaterName" },
    { headerName: "Date", field: "date" },
    { headerName: "Amount", field: "amountInDollars" },
    { headerName: "Type", field: "type" },
    { headerName: "Additional Info", field: "additionalInfo" }
  ]
};

// src/Sheets/CoachBalanceLog.ts
var CoachBalanceLogSheetConfig = {
  name: "Coach Balance Log",
  columnConfigurations: [
    { headerName: "Skater Id", field: "coachId" },
    { headerName: "Skater Name", field: "coachName" },
    { headerName: "Date", field: "date" },
    { headerName: "Amount", field: "amountInCents" },
    { headerName: "Type", field: "type" },
    { headerName: "Additional Info", field: "additionalInfo" }
  ]
};

// src/Sheets/BillPreview.ts
var BillPreviewSheetConfig = {
  name: "Bill Preview",
  setup: placeholderSheetSetup
};

// src/Sheets/EmailTemplate.ts
var EmailTemplateSheetConfig = {
  name: "Email Template",
  setup: placeholderSheetSetup
};

// src/initialSpreadsheetSetup.ts
var config = [
  SkaterInfoSheetConfig,
  CoachInfoSheetConfig,
  SkaterPaymentsSheetConfig,
  SkaterBalanceLogSheetConfig,
  CoachBalanceLogSheetConfig,
  CoachSummarySheetConfig,
  SkatersSummarySheetConfig,
  BillPreviewSheetConfig,
  EmailTemplateSheetConfig,
  InvoiceHistorySheetConfig,
  LessonLogsSheetConfig
];
var DEFAULT_SHEET_NAME = "Sheet1";
function initialSpreadsheetSetup() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = config.map((sheetConfig) => ({
    sheetConfig,
    sheet: spreadsheet.insertSheet(sheetConfig.name)
  }));
  sheets.forEach(({ sheet: currentSheet, sheetConfig }) => {
    if ("columnConfigurations" in sheetConfig) {
      setupStandardSheet(currentSheet, sheetConfig);
    }
    if ("setup" in sheetConfig && typeof sheetConfig.setup === "function") {
      sheetConfig.setup(currentSheet);
    }
  });
  const defaultSheet = spreadsheet.getSheetByName(DEFAULT_SHEET_NAME);
  if (defaultSheet) {
    spreadsheet.deleteSheet(defaultSheet);
  }
}
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

// src/ui.ts
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu("Billing Actions").addItem("Initialize Spreadsheet", initialSpreadsheetSetup.name).addItem("Reset and Initialize Spreadsheet", resetAndInit.name).addItem("Add Coach", addCoach.name).addItem("Add Skater", addSkater.name).addItem("Sync Lessons", syncLessons.name).addToUi();
}

// src/index.ts
var importedFunctions = [initialSpreadsheetSetup, onOpen];
