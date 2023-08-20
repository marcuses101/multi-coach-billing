import { getSheetByName } from "../getSpreadsheetByName";
import { StandardSheetConfig } from "../defs";

export const StudentInfoSheetConfig = {
  name: "Student Info",
  columnConfigurations: [
    { headerName: "Id", field: "id" },
    { headerName: "First Name", field: "firstName" },
    { headerName: "Last Name", field: "lastName" },
    { headerName: "Email", field: "email" },
    { headerName: "Is Student Active", field: "isActive" },
  ],
} as const satisfies StandardSheetConfig;

function promptForStudentInfo_(): {
  firstName: string;
  lastName: string;
  email: string;
} {
  const ui = SpreadsheetApp.getUi();
  const firstName = ui.prompt("Enter student's firstName").getResponseText();
  const lastName = ui.prompt("Enter student's last name").getResponseText();
  const email = ui.prompt("Enter student's email address").getResponseText();
  // TODO validate the email
  return { firstName, lastName, email };
}

export function addSkater() {
  const sheet = getSheetByName("Student Info");
  const { firstName, lastName, email } = promptForStudentInfo_();
  const id = Utilities.getUuid();
  sheet.appendRow([id, firstName, lastName, email, true]);
}
