import type { Coach } from "./Sheets/CoachInfo";
import type { Skater } from "./Sheets/SkaterInfo";
import type { LessonLogEntry, ProcessedLessonEntry } from "./Sheets/LessonLogs";

export function processLessonEntry(
  lessonId: string,
  lessonLogEntry: LessonLogEntry,
  coachMap: Map<string, Coach>,
  skaterByFullNameMap: Map<string, Skater>
): ProcessedLessonEntry[] {
  const { date, coachId, lessonDurationInMinutes, skaters } = lessonLogEntry;
  const coachInfo = coachMap.get(coachId);
  if (!coachInfo) {
    throw new Error(`unable to find coachInfo for id: ${coachId}`);
  }
  const { hourlyRateInDollars } = coachInfo;
  const rateInCentsPerMinute = (hourlyRateInDollars * 100) / 60;
  const totalLessonFeeInCents = rateInCentsPerMinute * lessonDurationInMinutes;
  const validSkaters = skaters
    .map((skaterName) => {
      if (!skaterName) return undefined;
      return skaterByFullNameMap.get(skaterName);
    })
    .filter(
      (entry): entry is Skater =>
        typeof entry !== "undefined" && "firstName" in entry
    );
  const numberOfSkaterInLesson = validSkaters.length;
  if (numberOfSkaterInLesson === 0) {
    return [];
  }

  const lessonFeeInCentsPerSkater = Math.ceil(
    totalLessonFeeInCents / numberOfSkaterInLesson
  );
  const lessonEntries: ProcessedLessonEntry[] = validSkaters.map((skater) => [
    lessonId,
    date,
    coachId,
    skater.id,
    lessonDurationInMinutes,
    lessonFeeInCentsPerSkater,
  ]);
  return lessonEntries;
}

export function processLessons(
  rawLessonData: LessonLogEntry[],
  coachMap: Map<string, Coach>,
  skaterByFullNameMap: Map<string, Skater>
): ProcessedLessonEntry[] {
  return rawLessonData.flatMap((lessonLogEntry) => {
    const lessonId = Utilities.getUuid(); // TODO maybe use a generator function to get the next entry
    return processLessonEntry(
      lessonId,
      lessonLogEntry,
      coachMap,
      skaterByFullNameMap
    );
  });
}
