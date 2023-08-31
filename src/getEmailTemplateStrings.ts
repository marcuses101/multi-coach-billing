import { getSheetByName } from "./getSpreadsheetByName";

export function getEmailTemplateStrings(): {
  subjectTemplate: string;
  bodyTemplate: string;
} {
  const emailTemplateSheet = getSheetByName("Email Template");
  const subjectTemplate = emailTemplateSheet.getRange("A2").getValue();
  const bodyTemplate = emailTemplateSheet.getRange("B2").getValue();
  return { subjectTemplate, bodyTemplate };
}
