import { Prisma } from "@prisma/client";
import {
  HallIncludeSchema,
  HallWhereInputSchema,
  TableWhereInputSchema,
} from "prisma/generated/zod";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { PAGE_SIZE } from "~/server/constants";
import { getPaginationProps } from "~/server/utils/pagination";

export const hallRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string(), studentsCount: z.number() }))
    .mutation(({ input, ctx }) => {
      return ctx.db.hall.create({
        data: {
          name: input.name,
          studentsCount: input.studentsCount,
        },
      });
    }),

  get: publicProcedure
    .input(
      z.object({ where: HallWhereInputSchema, include: HallIncludeSchema }),
    )
    .query(({ input, ctx }) => {
      return ctx.db.hall.findFirst({
        where: input.where,
        include: input.include,
      });
    }),

  list: publicProcedure
    .input(
      z.object({
        where: HallWhereInputSchema.optional(),
        page: z.number(),
        limit: z.number().default(PAGE_SIZE),
      }),
    )
    .query(async ({ ctx, input }) => {
      const totalCount = await ctx.db.hall.count({
        where: input.where,
      });

      const paginationProps = getPaginationProps({
        ...input,
        totalCount: totalCount,
      });

      const items = await ctx.db.hall.findMany({
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
      return ctx.db.hall.update({
        where: { id: input.id },
        data: {
          name: input.name,
          studentsCount: input.studentsCount,
        },
      });
    }),

  delete: publicProcedure.input(z.number()).mutation(({ input, ctx }) => {
    return ctx.db.hall.delete({
      where: { id: input },
    });
  }),
});
