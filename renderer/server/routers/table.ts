import { router, procedure } from "../trpc";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../prisma";
import Fuse from "fuse.js";
import { DAYS_ARRAY } from "../../stores/newTeacherStore";
import { teacherRouter, validateTimeRange } from "./teacher";

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
			const tableSubjects = DAYS_ARRAY.map((dayName) => input[dayName].map((dayData) => ({ ...dayData, dayName }))).reduce(
				(allSubjects, subject) => [...allSubjects, ...subject],
				[],
			);

			for (let subjectIndex = 0; subjectIndex < tableSubjects.length; subjectIndex++) {
				const {
					dayName,
					teacherId,
					timeRange: [startsAt, endsAt],
				} = tableSubjects[subjectIndex];

				const result = await validateTimeRange({
					dayName,
					id: teacherId,
					startsAt,
					endsAt,
					otherRanges: tableSubjects
						.filter((subject, index) => subject.teacherId === teacherId && index !== subjectIndex)
						.map(({ timeRange: [startsAt, endsAt] }) => [startsAt, endsAt]),
				});

				if (result.error)
					throw new TRPCError({ code: "BAD_REQUEST", message: "يوجد خطاء فى مواعيد المحاضرات يرجى اعادة النظر فيها" });
			}

			return await prisma.table.create({
				data: {
					level: input.level,
					semester: input.semester,
					type: input.acceptType,
					major: { connect: { id: input.majorId } },
					subjects: {
						create: tableSubjects.map((subject) => ({
							day: { connect: { name: subject.dayName } },
							hall: { connect: { id: subject.hallId } },
							subject: { connect: { id: subject.subjectId } },
							teacher: { connect: { id: subject.teacherId } },
							startsAt: subject.timeRange[0],
							endsAt: subject.timeRange[1],
						})),
					},
				},
				select: defaultTableSelect,
			});
		}),

	list: procedure
		.input(
			z.object({
				limit: z.number().min(1).max(250).nullish(),
				cursor: z.string().nullish(),
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
				where: {},
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
			const editedTable = await prisma.table.delete({
				where: { id: input.id },
				select: defaultTableSelect,
			});

			return editedTable;
		}),
});
