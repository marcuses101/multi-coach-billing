import { addCoach } from "./Sheets/CoachInfo";
import { syncLessons } from "./Sheets/LessonLogs";
import { addSkater } from "./Sheets/StudentInfo";
import {
  initialSpreadsheetSetup,
  resetAndInit,
} from "./initialSpreadsheetSetup";

export function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu("Billing Actions")
    .addItem("Initialize Spreadsheet", initialSpreadsheetSetup.name)
    .addItem("Reset and Initialize Spreadsheet", resetAndInit.name) // TODO REMOVE BEFORE HANDOFF
    .addItem("Add Coach", addCoach.name)
    .addItem("Add Skater", addSkater.name)
    .addItem("Sync Lessons", syncLessons.name)
    .addToUi();
}
