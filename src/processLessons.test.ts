import { describe, expect, it } from "vitest";
import { processLessonEntry } from "./processLessons";
import type { Coach } from "./Sheets/CoachInfo";
import { Skater } from "./Sheets/SkaterInfo";
import { LessonLogEntry } from "./Sheets/LessonLogs";

function getCoachFixture(): Coach {
  return {
    id: "coach_1",
    firstName: "Coach",
    lastName: "1",
    logSheetId: "0001",
    logSheetUrl: "http://google.com",
    hourlyRateInDollars: 60,
  };
}

function getSkaterFixtures(numberOfEntries: number): Skater[] {
  return [...Array(numberOfEntries)].map((_, index) => ({
    id: `skater_${index + 1}`,
    firstName: "Skater",
    lastName: (index + 1).toString(),
    email: `skater_${index + 1}@test.com`,
    isActive: true,
  }));
}

describe("processLessonEntry", () => {
  it("throws if the coachId is invalid", () => {
    // ARRANGE
    const coachMap = new Map<string, Coach>();
    const coachFixture = getCoachFixture();
    coachMap.set(coachFixture.id, coachFixture);

    const skaterMap = new Map<string, Skater>();
    const skaterFixture = getSkaterFixtures(1)[0];
    const skaterFullName = `${skaterFixture.firstName} ${skaterFixture.lastName}`;
    skaterMap.set(skaterFullName, skaterFixture);

    const lessonId = "lesson_1";

    const entryToProcess: LessonLogEntry = {
      coachId: "coach_invalid",
      coachName: "Invalid Coach",
      lessonDurationInMinutes: 60,
      date: new Date(),
      skaters: ["Skater One", "", ""],
    };
    // ASSERT
    expect(() =>
      processLessonEntry(lessonId, entryToProcess, coachMap, skaterMap)
    ).toThrowError();
  });
  it("separates into an entry for each skater", () => {
    const coachMap = new Map<string, Coach>();
    const coachFixture = getCoachFixture();
    coachMap.set(coachFixture.id, coachFixture);

    const skaterMap = new Map<string, Skater>();
    const skaterFixtures = getSkaterFixtures(2);
    skaterFixtures.forEach((skater) => {
      skaterMap.set(`${skater.firstName} ${skater.lastName}`, skater);
    });
    const dateNow = new Date();
    const lessonId = "lesson_1";
    const entryToProcess: LessonLogEntry = {
      coachId: "coach_1",
      coachName: "Coach 1",
      lessonDurationInMinutes: 60,
      date: dateNow,
      skaters: ["Skater 1", "Skater 2", ""],
    };
    const result = processLessonEntry(
      lessonId,
      entryToProcess,
      coachMap,
      skaterMap
    );
    const expectedResult = [
      ["lesson_1", dateNow, "coach_1", "skater_1", 60, 3000],
      ["lesson_1", dateNow, "coach_1", "skater_2", 60, 3000],
    ];
    expect(result).toEqual(expectedResult);
  });
});
