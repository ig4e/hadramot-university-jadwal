import {
  SubjectIncludeSchema,
  SubjectWhereInputSchema,
} from "prisma/generated/zod";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { PAGE_SIZE } from "~/server/constants";
import { getPaginationProps } from "~/server/utils/pagination";

export const subjectRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.db.subject.create({
        data: {
          name: input.name,
        },
      });
    }),

  get: publicProcedure
    .input(
      z.object({
        where: SubjectWhereInputSchema,
        include: SubjectIncludeSchema,
      }),
    )
    .query(({ input, ctx }) => {
      return ctx.db.subject.findFirst({
        where: input.where,
        include: input.include,
      });
    }),

  list: publicProcedure
    .input(
      z.object({
        where: SubjectWhereInputSchema.optional(),
        page: z.number(),
        limit: z.number().default(PAGE_SIZE),
      }),
    )
    .query(async ({ ctx, input }) => {
      const totalCount = await ctx.db.subject.count({
        where: input.where,
      });

      const paginationProps = getPaginationProps({
        ...input,
        totalCount: totalCount,
      });

      const items = await ctx.db.subject.findMany({
        where: input.where,
      });

      return {
        pageInfo: paginationProps,
        items,
      };
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
      }),
    )
    .mutation(({ input, ctx }) => {
      return ctx.db.subject.update({
        where: { id: input.id },
        data: {
          name: input.name,
        },
      });
    }),

  delete: publicProcedure.input(z.number()).mutation(({ input, ctx }) => {
    return ctx.db.subject.delete({
      where: { id: input },
    });
  }),
});
