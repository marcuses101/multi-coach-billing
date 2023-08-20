import { getCoaches } from "./CoachInfo";
import type { StandardSheetConfig } from "../defs";
import { getSheetByName } from "../getSpreadsheetByName";

export const LessonLogsSheetConfig = {
  name: "Lesson Logs",
  locked: true,
  columnConfigurations: [
    { headerName: "Coach Name", field: "coachName" },
    { headerName: "Coach Id", field: "coachId" },
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
} as const satisfies StandardSheetConfig;

export function syncLessons(): void {
  const coaches = getCoaches();
  const allLessonData = coaches.flatMap((coach) => {
    const coachName = `${coach.firstName} ${coach.lastName}`;
    const spreadsheet = SpreadsheetApp.openById(coach.logSheetId);
    const coachLessonSheet = spreadsheet.getSheets()[0];
    const numberOfRows = coachLessonSheet.getLastRow() - 1;
    const numberOfColumns = coachLessonSheet.getMaxColumns();
    const rows = spreadsheet
      .getSheets()[0]
      .getRange(2, 1, numberOfRows, numberOfColumns)
      .getValues();
    const filledRows = rows.reduce((acc, row) => {
      const [date, minutes, ...skaters] = row;
      const isValidRow =
        date && minutes && skaters.some((skater) => Boolean(skater));
      if (!isValidRow) {
        return acc;
      }
      acc.push([coachName, coach.id, date, minutes, ...skaters]);
      return acc;
    }, [] as any[][]);
    return filledRows;
  });
  const lessonLogSheet = getSheetByName("Lesson Logs");
  lessonLogSheet.getRange("A2:Z").clearContent();
  const numberOfRows = allLessonData.length;
  if (numberOfRows === 0) return;
  const numberOfColumns = allLessonData[0].length;
  lessonLogSheet
    .getRange(2, 1, numberOfRows, numberOfColumns)
    .setValues(allLessonData);
}
