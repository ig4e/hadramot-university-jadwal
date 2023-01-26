import { router, procedure } from "../trpc";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../prisma";
import Fuse from "fuse.js";

const defaultSubjectSelect = Prisma.validator<Prisma.SubjectSelect>()({
	id: true,
	name: true,
	createdAt: true,
	updatedAt: true,
});

export const subjectRouter = router({
	create: procedure
		.input(z.object({ name: z.string() }))
		.mutation(async ({ input }) => {
			const createdSubject = await prisma.subject.create({
				data: {
					name: input.name,
				},
			});

			return createdSubject;
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

			const items = await prisma.subject.findMany({
				select: defaultSubjectSelect,
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
			const list = await prisma.subject.findMany({
				select: defaultSubjectSelect,
			});
			const SubjectFuse = new Fuse(list, {
				keys: ["name"],
				includeScore: false,
			});

			return SubjectFuse.search(input.query).map((x) => x.item);
		}),

	get: procedure
		.input(
			z.object({
				id: z.number(),
			}),
		)
		.query(async ({ input }) => {
			const Subject = await prisma.subject.findUnique({
				where: { id: input.id },
				select: defaultSubjectSelect,
			});

			return Subject;
		}),

	edit: procedure
		.input(
			z.object({
				id: z.number(),
				name: z.string(),
			}),
		)
		.mutation(async ({ input }) => {
			const editedSubject = await prisma.subject.update({
				where: { id: input.id },
				data: {
					name: input.name,
				},
				select: defaultSubjectSelect,
			});

			return editedSubject;
		}),

	delete: procedure
		.input(
			z.object({
				id: z.number(),
			}),
		)
		.mutation(async ({ input }) => {
			const editedSubject = await prisma.subject.delete({
				where: { id: input.id },
				select: defaultSubjectSelect,
			});

			return editedSubject;
		}),
});
