import { z } from "zod";

export const PAGE_SIZE = 15 as const;

export const daysEnum = z.enum([
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
]);

export const HourSchema = z.number().min(0).max(23);
export const TableLevelSchema = z.number().min(1).max(4);
export const TableTypeSchema = z.number().min(1).max(2);
export const TableSemesterSchema = TableTypeSchema;
export const AutoIncremntId = z.number();

export type DaysEnum = z.infer<typeof daysEnum>;

export const DAYS_ARRAY: DaysEnum[] = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

export const TeacherWorkDateCreateWithoutDayOrTeacherInputSchema = z.object({
  startsAt: HourSchema,
  endsAt: HourSchema,
  day: daysEnum,
});

export const TableSubjectCreateInputSchema = z.object({
  teacherId: AutoIncremntId,
  subjectId: AutoIncremntId,
  dayId: AutoIncremntId,
  hallId: AutoIncremntId,
  startsAt: HourSchema,
  endsAt: HourSchema,
});

export function dayNameToId(dayName: DaysEnum): number {
  return DAYS_ARRAY.indexOf(dayName) + 1;
}
