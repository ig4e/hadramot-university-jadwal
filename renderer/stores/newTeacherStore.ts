import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { v4 } from "uuid";
import { z } from "zod";

export const daysEnum = z.enum([
	"SUNDAY",
	"MONDAY",
	"TUESDAY",
	"WEDNESDAY",
	"THURSDAY",
	"FRIDAY",
	"SATURDAY",
]);

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

interface Subject {
	inputId: string;
	id: number;
	name: string;
}

interface SubjectInput {
	id: number;
	name: string;
}

interface WorkDayDate {
	inputId: string;
	startAt: number;
	endAt: number;
}

interface WorkDay {
	day: DaysEnum;
	dates: WorkDayDate[];
}

interface newTeacherState {
	name: string;
	subjects: Subject[];
	workDays: WorkDay[];
}

interface newTeacherActions {
	addSubject: () => void;
	editSubject: (inputId: string, subject: SubjectInput) => void;
	removeSubject: (subject: Subject) => void;

	addWorkDayDate: (day: DaysEnum) => void;
	editWorkDayDate: (day: DaysEnum, date: WorkDayDate) => void;
	removeWorkDayDate: (day: DaysEnum, dateId: string) => void;

	clear: () => void;
}

const useNewTeacherStore = create<newTeacherState & newTeacherActions>()(
	devtools(
		immer((set, get) => ({
			name: "",
			subjects: [{ inputId: v4(), id: 1, name: "" }],
			workDays: DAYS_ARRAY.map((day) => ({
				day: day,
				dates: [{ inputId: v4(), startAt: 0, endAt: 0 }],
			})),

			clear() {
				set((state) => {
					state.name = "";
					state.subjects = [{ inputId: v4(), id: 1, name: "" }];
					state.workDays = DAYS_ARRAY.map((day) => ({
						day: day,
						dates: [{ inputId: v4(), startAt: 0, endAt: 0 }],
					}))
				});
			},

			addSubject() {
				set((state) => {
					state.subjects.push({ inputId: v4(), id: 1, name: "" });
				});
			},
			editSubject(inputId, subject) {
				set((state) => {
					state.subjects = state.subjects.map((tSubject) => {
						if (tSubject.inputId !== inputId) return tSubject;
						return { inputId: tSubject.inputId, ...subject };
					});
				});
			},
			removeSubject(subject) {
				set((state) => {
					state.subjects.filter(
						(tSubject) => tSubject.id !== subject.id,
					);
				});
			},

			addWorkDayDate(day) {
				set((state) => {
					state.workDays = state.workDays.map((workDay) => {
						if (workDay.day === day) {
							workDay.dates.push({
								inputId: v4(),
								startAt: 0,
								endAt: 0,
							});
						}

						return workDay;
					});
				});
			},
			editWorkDayDate(day, date) {
				set((state) => {
					state.workDays = state.workDays.map((workDay) => {
						if (workDay.day === day) {
							workDay.dates = workDay.dates.map((workDayDate) => {
								if (workDayDate.inputId == date.inputId)
									return date;
								return workDayDate;
							});
						}

						return workDay;
					});
				});
			},
			removeWorkDayDate(day, inputId) {
				set((state) => {
					state.workDays = state.workDays.map((workDay) => {
						if (workDay.day === day) {
							workDay.dates = workDay.dates.filter(
								(date) => date.inputId != inputId,
							);
						}

						return workDay;
					});
				});
			},
		})),
	),
);

export { useNewTeacherStore };
