import { router, procedure } from "../trpc";
import { z } from "zod";
import { prisma, Prisma } from "../prisma";
import { isConflicting, isIn } from "../../utils/range";
import { formatDuration } from "../../utils/format";

// const defaultTableSelect: Prisma.TableSelect = {
// 	id: true,
// 	createdAt: true,
// 	level: true,
// 	major: true,
// 	semester: true,
// 	type: true,
// 	updatedAt: true,
// 	subjects: {
// 		include: {
// 			day: true,
// 			hall: true,
// 			subject: true,
// 			teacher: true,
// 		},
// 	},
// };

const defaultTableSelect = Prisma.validator<Prisma.TableSelect>()({
	id: true,
	createdAt: true,
	level: true,
	major: true,
	semester: true,
	type: true,
	updatedAt: true,
	subjects: {
		include: {
			day: true,
			hall: true,
			subject: true,
			teacher: true,
		},
	},
});

/*
{
    "semester": 1,
    "acceptType": 1,
    "majorId": "",
    "level": 1,
    "SUNDAY": [
        {
            "id": "15feef53-a4da-4b78-9131-163c971953de",
            "teacherId": "538281ac-1522-4b24-89d9-598396be8456",
            "subjectId": "",
            "hallId": "0ead6a6c-0320-4dbc-abe9-47aba0d46091",
            "timeRange": [
                4.5,
                16
            ]
        }
    ],
    "MONDAY": [],
    "TUESDAY": [],
    "WEDNESDAY": [],
    "THURSDAY": [],
    "FRIDAY": [],
    "SATURDAY": []
}
*/

const tableDayInputType = z
	.object({
		id: z.string(),
		teacherId: z.string(),
		subjectId: z.string(),
		hallId: z.string(),
		timeRange: z.tuple([z.number(), z.number()]),
	})
	.array();

export const tableRouter = router({
	create: procedure
		.input(
			z.object({
				semester: z.number().min(1).max(2),
				acceptType: z.number().min(1).max(2),
				level: z.number().min(1).max(4),
				majorId: z.string(),
				SUNDAY: tableDayInputType,
				MONDAY: tableDayInputType,
				TUESDAY: tableDayInputType,
				WEDNESDAY: tableDayInputType,
				THURSDAY: tableDayInputType,
				FRIDAY: tableDayInputType,
				SATURDAY: tableDayInputType,
			}),
		)
		.mutation(async ({ input }) => {
			const validation = await validateTable(input);
			if (validation.error) return validation;
			const { semester, majorId, level, acceptType, ...days } = input;
			const daysWithDayName = Object.keys(days)
				.map((key) => {
					const dayName = key as keyof typeof days;
					return days[dayName].map((day) => ({ dayName: dayName, ...day }));
				})
				.reduce((total, current) => [...total, ...current], []);

			const table = await prisma.table.create({
				data: {
					level: level,
					semester: semester,
					type: acceptType,
					major: { connect: { id: majorId } },
					subjects: {
						create: daysWithDayName.map((subject) => ({
							id: subject.id,
							hall: { connect: { id: subject.hallId } },
							day: { connect: { name: subject.dayName } },
							startsAt: subject.timeRange[0],
							endsAt: subject.timeRange[1],
							subject: { connect: { id: subject.subjectId } },
							teacher: { connect: { id: subject.teacherId } },
						})),
					},
				},
			});

			return { ...validation, table };
		}),

	validate: procedure
		.input(
			z.object({
				semester: z.number().min(1).max(2),
				acceptType: z.number().min(1).max(2),
				level: z.number().min(1).max(4),
				majorId: z.string(),
				SUNDAY: tableDayInputType,
				MONDAY: tableDayInputType,
				TUESDAY: tableDayInputType,
				WEDNESDAY: tableDayInputType,
				THURSDAY: tableDayInputType,
				FRIDAY: tableDayInputType,
				SATURDAY: tableDayInputType,
			}),
		)
		.query(async ({ input }) => {
			return await validateTable(input);
		}),

	list: procedure
		.input(
			z.object({
				limit: z.number().min(1).max(250).nullish(),
				cursor: z.string().nullish(),
				semester: z.number().min(1).max(2).nullish(),
				type: z.number().min(1).max(2).nullish(),
				level: z.number().min(1).max(4).nullish(),
				majorId: z.string().nullish(),
			}),
		)
		.query(async ({ input }) => {
			/**
			 * For pagination docs you can have a look here
			 * @see https://trpc.io/docs/useInfiniteQuery
			 * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
			 */

			const limit = input.limit ?? 50;
			const { cursor } = input;

			const items = await prisma.table.findMany({
				select: defaultTableSelect,
				take: limit + 1,
				where: {
					semester: input.semester || undefined,
					type: input.type || undefined,
					level: input.level || undefined,
					major: input.majorId ? { id: input.majorId } : undefined,
				},
				cursor: cursor
					? {
							id: cursor,
					  }
					: undefined,
				orderBy: {
					createdAt: "desc",
				},
			});

			let nextCursor: typeof cursor | undefined = undefined;
			if (items.length > limit) {
				const nextItem = items.pop()!;
				nextCursor = nextItem.id;
			}

			return {
				items: items.reverse(),
				nextCursor,
			};
		}),

	get: procedure
		.input(
			z.object({
				id: z.string(),
			}),
		)
		.query(async ({ input }) => {
			const table = await prisma.table.findUnique({
				where: { id: input.id },
				select: defaultTableSelect,
			});

			return table;
		}),

	edit: procedure
		.input(
			z.object({
				id: z.string(),
			}),
		)
		.mutation(async ({ input }) => {}),

	delete: procedure
		.input(
			z.object({
				id: z.string(),
			}),
		)
		.mutation(async ({ input }) => {
			const deletedTable = await prisma.table.delete({
				where: { id: input.id },
				select: defaultTableSelect,
			});

			return deletedTable;
		}),
});

type DayInput = {
	id: string;
	teacherId: string;
	subjectId: string;
	hallId: string;
	timeRange: [number, number];
}[];
async function validateTable(input: {
	semester: number;
	acceptType: number;
	level: number;
	majorId: string;
	SUNDAY: DayInput;
	MONDAY: DayInput;
	TUESDAY: DayInput;
	WEDNESDAY: DayInput;
	THURSDAY: DayInput;
	FRIDAY: DayInput;
	SATURDAY: DayInput;
}) {
	const errors: { [index: string]: string } = {};
	const { semester, majorId, level, acceptType, ...days } = input;
	const daysWithDayName = Object.keys(days)
		.map((key) => {
			const dayName = key as keyof typeof days;
			return days[dayName].map((day) => ({ dayName: dayName, ...day }));
		})
		.reduce((total, current) => [...total, ...current], []);

	for (let day of daysWithDayName) {
		const { id, dayName, hallId, subjectId, teacherId, timeRange } = day;
		const dayIndex = days[dayName].findIndex((daySubject) => daySubject.id === id);

		errors[`${dayName}.${dayIndex}.timeRange`] = "";

		const teacher = await prisma.teacher.findUnique({
			where: { id: teacherId },
			include: {
				tableSubjects: { where: { day: { name: dayName }, table: { semester: input.semester } } },
				workDates: { where: { day: { name: dayName } } },
			},
		});

		if (isConflicting(timeRange, teacher?.tableSubjects.map(({ startsAt, endsAt }) => [startsAt, endsAt])!)) {
			errors[`${dayName}.${dayIndex}.timeRange`] = "المعلم فمحاضرة اخرى";
		}

		if (
			isConflicting(
				timeRange,
				days[dayName]
					.filter((_, index) => index !== dayIndex && _.teacherId === teacherId)
					.map(({ timeRange: [startsAt, endsAt] }) => [startsAt, endsAt])!,
			)
		) {
			errors[`${dayName}.${dayIndex}.timeRange`] = "المعلم فمحاضرة اخرى فنفس الوقت والجدول";
		}

		if (!isIn(timeRange, teacher?.workDates.map(({ startsAt, endsAt }) => [startsAt, endsAt])!)) {
			errors[`${dayName}.${dayIndex}.timeRange`] = `المعلم غير متوفر.<br /> مواعيد توافر المعلم: ${teacher?.workDates
				.map(({ startsAt, endsAt }) => `${formatDuration(startsAt)}-${formatDuration(endsAt)}`)
				.join("<br />")}`;
		}
	}

	return { errors, error: Object.keys(errors).some((key) => errors[key]) };
}
