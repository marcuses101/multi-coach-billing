import { StandardSheetConfig } from "../defs";

interface LessonInputEntry {
  date: Date;
  lessonTimeInMinutes: number;
  skaters: string[];
}
export const LessonInputSheetConfig = {
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
    { headerName: "", field: "skaters" },
  ],
} as const satisfies StandardSheetConfig<LessonInputEntry>;
