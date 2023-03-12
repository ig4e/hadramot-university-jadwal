import { router, procedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma, Prisma } from "../prisma";
import Fuse from "fuse.js";

const defaultMajorSelect = Prisma.validator<Prisma.MajorSelect>()({
	id: true,
	type: true,
	name: true,
	createdAt: true,
	updatedAt: true,
	studentsCount: true,
});

export const majorRouter = router({
	create: procedure
		.input(
			z.object({
				name: z.string(),
				studentsCount: z.number(),
				type: z.number(),
			}),
		)
		.mutation(async ({ input: { name, studentsCount, type } }) => {
			const createdMajor = await prisma.major.create({
				data: {
					name,
					studentsCount,
					type,
				},
			});

			return createdMajor;
		}),

	list: procedure
		.input(
			z.object({
				limit: z.number().min(1).max(250).nullish(),
				cursor: z.string().nullish(),
				type: z.number().max(2).nullish(),
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

			const items = await prisma.major.findMany({
				select: defaultMajorSelect,
				take: limit + 1,
				where: {
					type: input.type || undefined,
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

	search: procedure
		.input(
			z.object({
				query: z.string(),
			}),
		)
		.query(async ({ input }) => {
			const list = await prisma.major.findMany({
				select: defaultMajorSelect,
			});
			const majorFuse = new Fuse(list, {
				keys: ["name"],
				includeScore: false,
			});

			return majorFuse.search(input.query).map((x) => x.item);
		}),

	get: procedure
		.input(
			z.object({
				id: z.string(),
			}),
		)
		.query(async ({ input }) => {
			const major = await prisma.major.findUnique({
				where: { id: input.id },
				select: defaultMajorSelect,
			});

			return major;
		}),

	edit: procedure
		.input(
			z.object({
				id: z.string(),
				name: z.string(),
				studentsCount: z.number(),
				type: z.number(),
			}),
		)
		.mutation(async ({ input }) => {
			const editedMajor = await prisma.major.update({
				where: { id: input.id },
				data: {
					name: input.name,
					studentsCount: input.studentsCount,
					type: input.type,
				},
				select: defaultMajorSelect,
			});

			return editedMajor;
		}),

	delete: procedure
		.input(
			z.object({
				id: z.string(),
			}),
		)
		.mutation(async ({ input }) => {
			const editedMajor = await prisma.major.delete({
				where: { id: input.id },
				select: defaultMajorSelect,
			});

			return editedMajor;
		}),
});
