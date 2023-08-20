import { getSheetByName } from "../getSpreadsheetByName";
import { StandardSheetConfig } from "../defs";
import { setupStandardSheet } from "../setupStandardSheet";

export const CoachInfoSheetConfig = {
  name: "Coach Info",
  columnConfigurations: [
    { headerName: "Id", field: "id" },
    { headerName: "First Name", field: "firstName" },
    { headerName: "Last Name", field: "lastName" },
    { headerName: "Hourly Rate", field: "hourlyRateInDollars" },
    { headerName: "Log Sheet", field: "logSheetUrl" },
    { headerName: "Sheet Id", field: "logSheetId" },
  ],
} as const satisfies StandardSheetConfig;

type CoachInfoColumns =
  (typeof CoachInfoSheetConfig.columnConfigurations)[number]["field"];

type Coach = Record<CoachInfoColumns, any>;

export function getCoaches(): Coach[] {
  const coachSheet = getSheetByName("Coach Info");
  const coachSheetData = coachSheet.getDataRange().getValues().slice(1);
  const coaches: Coach[] = coachSheetData.reduce((coachArray, currentRow) => {
    if (currentRow.some((entry) => !entry)) {
      return coachArray;
    }
    const coach: Coach = {
      id: currentRow[0],
      firstName: currentRow[1],
      lastName: currentRow[2],
      hourlyRateInDollars: currentRow[3],
      logSheetUrl: currentRow[4],
      logSheetId: currentRow[5],
    };
    coachArray.push(coach);
    return coachArray;
  }, [] as Coach[]);
  return coaches;
}

const LessonLogSheetConfig: StandardSheetConfig = {
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
  ],
};

function createCoachLogSheet_(
  firstName: string,
  lastName: string
): { logSheetId: string; logSheetUrl: string } {
  const fullName = `lesson_log-${firstName}_${lastName}`;
  const newSpreadsheet = SpreadsheetApp.create(fullName);
  const logSheet = newSpreadsheet.getSheets()[0];
  logSheet.setName(LessonLogSheetConfig.name);
  setupStandardSheet(logSheet, LessonLogSheetConfig);
  return {
    logSheetId: newSpreadsheet.getId(),
    logSheetUrl: newSpreadsheet.getUrl(),
  };
}

export function addCoachPrompt_(): {
  firstName: string;
  lastName: string;
  hourlyRateInDollars: number;
} {
  const ui = SpreadsheetApp.getUi();
  const firstName = ui.prompt("Enter new coach's first name").getResponseText();
  const lastName = ui.prompt("Enter new coach's last name").getResponseText();
  const hourlyRateInDollarsText = ui
    .prompt("Enter new coach's hourly rate in dollars")
    .getResponseText();
  const hourlyRateInDollars: number = parseFloat(hourlyRateInDollarsText);
  return { firstName, lastName, hourlyRateInDollars };
}

export function addCoach() {
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
    logSheetId,
  ]);
}
