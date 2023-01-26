import { router, procedure } from "../trpc";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../prisma";
import Fuse from "fuse.js";

const daysEnum = z.enum([
	"MONDAY",
	"TUESDAY",
	"WEDNESDAY",
	"THURSDAY",
	"FRIDAY",
	"SATURDAY",
	"SUNDAY",
]);

type DaysEnum = z.infer<typeof daysEnum>;

const defaultTeacherSelect = Prisma.validator<Prisma.TeacherSelect>()({
	id: true,
	name: true,
	createdAt: true,
	updatedAt: true,
	subjects: true,
	workDays: { include: { dates: true, day: true } },
});

export const teacherRouter = router({
	create: procedure
		.input(
			z.object({
				name: z.string(),
				subjects: z.object({ id: z.number() }).array().nullable(),
				workDays: z
					.object({
						day: daysEnum,
						dates: z
							.object({
								startAt: z.number(),
								endAt: z.number(),
							})
							.array(),
					})
					.array(),
			}),
		)
		.mutation(async ({ input }) => {
			const createdTeacher = await prisma.teacher.create({
				data: {
					name: input.name,
					subjects: { connect: input.subjects || undefined },
				},
				include: {
					workDays: {
						include: {
							dates: true,
							day: true,
						},
					},
				},
			});

			const createdWorkDays = [];

			for (let workDay of input.workDays) {
				createdWorkDays.push(
					await prisma.teacherOnWorkDay.create({
						data: {
							teacher: { connect: { id: createdTeacher.id } },
							day: {
								connectOrCreate: {
									where: { name: workDay.day },
									create: { name: workDay.day },
								},
							},
							dates: { create: workDay.dates },
						},
					}),
				);
			}

			return { ...createdTeacher, workDays: createdWorkDays };
		}),

	list: procedure
		.input(
			z.object({
				limit: z.number().min(1).max(250).nullish(),
				cursor: z.number().nullish(),
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

			const items = await prisma.teacher.findMany({
				select: defaultTeacherSelect,
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

	search: procedure
		.input(
			z.object({
				query: z.string(),
			}),
		)
		.query(async ({ input }) => {
			const list = await prisma.teacher.findMany({
				select: defaultTeacherSelect,
			});
			const TeacherFuse = new Fuse(list, {
				keys: ["name"],
				includeScore: false,
			});

			return TeacherFuse.search(input.query).map((x) => x.item);
		}),

	get: procedure
		.input(
			z.object({
				id: z.number(),
			}),
		)
		.query(async ({ input }) => {
			const Teacher = await prisma.teacher.findUnique({
				where: { id: input.id },
				select: defaultTeacherSelect,
			});

			return Teacher;
		}),

	edit: procedure
		.input(
			z.object({
				id: z.number(),
				name: z.string(),
			}),
		)
		.mutation(async ({ input }) => {
			const editedTeacher = await prisma.teacher.update({
				where: { id: input.id },
				data: {
					name: input.name,
				},
				select: defaultTeacherSelect,
			});

			return editedTeacher;
		}),

	delete: procedure
		.input(
			z.object({
				id: z.number(),
			}),
		)
		.mutation(async ({ input }) => {
			const editedTeacher = await prisma.teacher.delete({
				where: { id: input.id },
				select: defaultTeacherSelect,
			});

			return editedTeacher;
		}),
});