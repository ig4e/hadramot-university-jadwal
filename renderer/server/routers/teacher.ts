import { router, procedure } from "../trpc";
import { Prisma } from "@prisma/client";
import { inferRouterInputs, TRPCError } from "@trpc/server";
import { tuple, z } from "zod";
import { prisma } from "../prisma";
import Fuse from "fuse.js";
import { isConflicting, isIn } from "../../utils/range";
import { formatDuration } from "../../utils/format";
import { appRouter } from "./_app";

const daysEnum = z.enum(["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]);

type DaysEnum = z.infer<typeof daysEnum>;

const DAYS_ARRAY: DaysEnum[] = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

const defaultTeacherSelect = Prisma.validator<Prisma.TeacherSelect>()({
	id: true,
	name: true,
	createdAt: true,
	updatedAt: true,
	subjects: true,
	workDates: {
		include: { day: true, teacher: true },
	},
});

export const teacherRouter = router({
	create: procedure
		.input(
			z.object({
				name: z.string(),
				subjects: z.string().array(),
				workDates: z
					.object({
						dayName: daysEnum,
						startsAt: z.number(),
						endsAt: z.number(),
					})
					.array(),
			}),
		)
		.mutation(async ({ input }) => {
			return await prisma.teacher.create({
				data: {
					name: input.name,
					subjects: { connect: input.subjects.map((id) => ({ id })) },
					workDates: {
						create: input.workDates.map((workDate) => ({
							day: {
								connectOrCreate: {
									where: { name: workDate.dayName },
									create: { name: workDate.dayName },
								},
							},
							startsAt: workDate.startsAt,
							endsAt: workDate.endsAt,
						})),
					},
				},
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
				//select: defaultTeacherSelect,
				select: { id: true, name: true },
			});

			const teacherFuse = new Fuse(list, {
				keys: ["name"],
				includeScore: false,
			});

			return teacherFuse.search(input.query).map((x) => x.item);
		}),

	get: procedure
		.input(
			z.object({
				id: z.string(),
			}),
		)
		.query(async ({ input }) => {
			const teacher = await prisma.teacher.findUnique({
				where: { id: input.id },
				select: defaultTeacherSelect,
			});

			return teacher;
		}),

	edit: procedure
		.input(
			z.object({
				id: z.string(),
				name: z.string(),
				subjects: z.string().array(),
				workDates: z
					.object({
						id: z.string(),
						dayName: daysEnum,
						startsAt: z.number(),
						endsAt: z.number(),
					})
					.array(),
			}),
		)
		.mutation(async ({ input }) => {
			const editedTeacher = await prisma.teacher.update({
				where: { id: input.id },
				data: {
					name: input.name,
					subjects: {
						set: input.subjects.map((subjectId) => ({
							id: subjectId,
						})),
					},
				},
				select: defaultTeacherSelect,
			});

			const isWorkDatesChanged = editedTeacher.workDates.some(
				({ endsAt, startsAt }) =>
					!input.workDates.find((workDate) => endsAt === workDate.endsAt && startsAt === workDate.startsAt) ||
					input.workDates.length !== editedTeacher.workDates.length,
			);

			console.log(isWorkDatesChanged);

			if (isWorkDatesChanged) {
				await prisma.teacher.update({
					where: { id: input.id },
					data: {
						workDates: {
							deleteMany: input.workDates.map(({ id }) => ({
								id,
							})),
							create: input.workDates.map((workDate) => ({
								day: {
									connectOrCreate: {
										where: { name: workDate.dayName },
										create: { name: workDate.dayName },
									},
								},
								startsAt: workDate.startsAt,
								endsAt: workDate.endsAt,
							})),
						},
					},
				});
			}

			return editedTeacher;
		}),

	delete: procedure
		.input(
			z.object({
				id: z.string(),
			}),
		)
		.mutation(async ({ input }) => {
			const editedTeacher = await prisma.teacher.delete({
				where: { id: input.id },
				select: defaultTeacherSelect,
			});

			return editedTeacher;
		}),

	validateTimeRange: procedure
		.input(
			z.object({
				id: z.string(),
				dayName: daysEnum,
				startsAt: z.number(),
				endsAt: z.number(),
				otherRanges: z.tuple([z.number(), z.number()]).array(),
			}),
		)
		.query(async ({ input }) => {
			return await validateTimeRange(input);
		}),
});

export async function validateTimeRange(input: {
	id: string;
	dayName: "SUNDAY" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY";
	startsAt: number;
	endsAt: number;
	otherRanges: [number, number][];
}) {
	let result = {
		valid: true,
		error: "",
	};

	const teacher = await prisma.teacher.findUnique({
		where: { id: input.id },
		select: {
			workDates: { include: { day: true }, where: { day: { name: input.dayName } } },
			tableSubjects: { include: { day: true }, where: { day: { name: input.dayName } } },
		},
	});

	if (!teacher) return { valid: false, error: "هذه المعلم غير موجود." };

	const teacherWorkDatesRangeArray: typeof input["otherRanges"] = teacher.workDates.map(({ startsAt, endsAt }) => [startsAt, endsAt]);

	const isRangeInTeacherWorkDates = isIn([input.startsAt, input.endsAt], teacherWorkDatesRangeArray);

	if (!isRangeInTeacherWorkDates)
		return {
			valid: false,
			error: `مواعيد توافر المعلم هى<br /><div class="flex flex-wrap gap-1 mt-1">${teacherWorkDatesRangeArray
				.map(
					([startsAt, endsAt]) =>
						`<span class="bg-slate-900 text-slate-50 p-1 rounded-md text-xs">${formatDuration(startsAt)} ألى ${formatDuration(
							endsAt,
						)}</span>`,
				)
				.join("")}</div>`,
		};

	const isRangeConflicting = isConflicting([input.startsAt, input.endsAt], input.otherRanges);

	if (isRangeConflicting)
		return {
			valid: false,
			error: `المعلم يوجد فى محاضرة اخرى فى نفس الوقت`,
		};

	return result;
}
