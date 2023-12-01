import {
  MajorIncludeSchema,
  MajorWhereInputSchema,
} from "prisma/generated/zod";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { PAGE_SIZE } from "~/server/constants";
import { getPaginationProps } from "~/server/utils/pagination";

export const majorRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string(), studentsCount: z.number() }))
    .mutation(({ input, ctx }) => {
      return ctx.db.major.create({
        data: {
          name: input.name,
          studentsCount: input.studentsCount,
        },
      });
    }),

  get: publicProcedure
    .input(
      z.object({ where: MajorWhereInputSchema, include: MajorIncludeSchema }),
    )
    .query(({ input, ctx }) => {
      return ctx.db.major.findFirst({
        where: input.where,
        include: input.include,
      });
    }),

  list: publicProcedure
    .input(
      z.object({
        where: MajorWhereInputSchema.optional(),
        page: z.number(),
        limit: z.number().default(PAGE_SIZE),
      }),
    )
    .query(async ({ ctx, input }) => {
      const totalCount = await ctx.db.major.count({
        where: input.where,
      });

      const paginationProps = getPaginationProps({
        ...input,
        totalCount: totalCount,
      });

      const items = await ctx.db.major.findMany({
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
        name: z.string().optional(),
        studentsCount: z.number().optional(),
      }),
    )
    .mutation(({ input, ctx }) => {
      return ctx.db.major.update({
        where: { id: input.id },
        data: {
          name: input.name,
          studentsCount: input.studentsCount,
        },
      });
    }),

  delete: publicProcedure.input(z.number()).mutation(({ input, ctx }) => {
    return ctx.db.major.delete({
      where: { id: input },
    });
  }),
});
