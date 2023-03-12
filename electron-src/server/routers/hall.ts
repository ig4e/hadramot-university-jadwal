import { router, procedure } from "../trpc";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../prisma";
import Fuse from "fuse.js";
import { isConflicting, isIn } from "../../utils/range";

export const daysEnum = z.enum(["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]);

export type DaysEnum = z.infer<typeof daysEnum>;

export const DAYS_ARRAY: DaysEnum[] = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

const defaultHallSelect = Prisma.validator<Prisma.HallSelect>()({
	id: true,
	name: true,
	createdAt: true,
	updatedAt: true,
	studentsCount: true,
});

export const hallRouter = router({
	create: procedure
		.input(z.object({ name: z.string(), studentsCount: z.number() }))
		.mutation(async ({ input: { name, studentsCount } }) => {
			const createdHall = await prisma.hall.create({
				data: {
					name,
					studentsCount,
				},
			});

			return createdHall;
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

			const items = await prisma.hall.findMany({
				select: defaultHallSelect,
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
			const list = await prisma.hall.findMany({
				select: defaultHallSelect,
			});
			const hallFuse = new Fuse(list, {
				keys: ["name"],
				includeScore: false,
			});

			return hallFuse.search(input.query).map((x) => x.item);
		}),

	get: procedure
		.input(
			z.object({
				id: z.string(),
			}),
		)
		.query(async ({ input }) => {
			const hall = await prisma.hall.findUnique({
				where: { id: input.id },
				select: defaultHallSelect,
			});

			return hall;
		}),

	edit: procedure
		.input(
			z.object({
				id: z.string(),
				name: z.string(),
				studentsCount: z.number(),
			}),
		)
		.mutation(async ({ input }) => {
			const editedHall = await prisma.hall.update({
				where: { id: input.id },
				data: {
					name: input.name,
					studentsCount: input.studentsCount,
				},
				select: defaultHallSelect,
			});

			return editedHall;
		}),

	delete: procedure
		.input(
			z.object({
				id: z.string(),
			}),
		)
		.mutation(async ({ input }) => {
			const editedHall = await prisma.hall.delete({
				where: { id: input.id },
				select: defaultHallSelect,
			});

			return editedHall;
		}),

	isAvailable: procedure
		.input(
			z.object({
				id: z.string(),
				hallId: z.string(),
				dayName: daysEnum,
				range: z.tuple([z.number(), z.number()]),
			}),
		)
		.query(async ({ input }) => {
			return isHallAvailable(input);
		}),
});

export async function isHallAvailable(input: {
	id: string;
	hallId: string;
	dayName: "SUNDAY" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY";
	range: [number, number];
}) {
	const hall = await prisma.hall.findUnique({
		where: { id: input.hallId },
		include: { tableSubjects: { where: { day: { name: input.dayName } } } },
	});

	if (!hall)
		return {
			error: false,
			message: ``,
		};

	const hallTableWorkDatesRanges: [number, number][] = hall?.tableSubjects.map(({ startsAt, endsAt }) => [startsAt, endsAt]) || [];

	if (isIn(input.range, hallTableWorkDatesRanges) || isConflicting(input.range, hallTableWorkDatesRanges))
		return {
			error: true,
			message: `القاعة مشغولة بمحاضرة اخرى الأن`,
		};

	return {
		error: false,
		message: ``,
	};
}
