import {
  TableIncludeSchema,
  TableWhereInputSchema,
  TableWhereUniqueInputSchema,
} from "prisma/generated/zod";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  AutoIncremntId,
  HourSchema,
  PAGE_SIZE,
  TableLevelSchema,
  TableSemesterSchema,
  TableSubjectCreateInputSchema,
  TableTypeSchema,
} from "~/server/constants";
import { getPaginationProps } from "~/server/utils/pagination";

export const tableRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        level: TableLevelSchema,
        type: TableTypeSchema,
        semester: TableSemesterSchema,
        majorId: z.number(),
        subjects: TableSubjectCreateInputSchema.array().min(1),
      }),
    )
    .mutation(({ input, ctx }) => {
      return ctx.db.table.create({
        data: {
          type: input.type,
          level: input.level,
          semester: input.semester,
          majorId: input.majorId,
          subjects: {
            create: input.subjects,
          },
        },
      });
    }),

  get: publicProcedure
    .input(
      z.object({
        where: TableWhereInputSchema,
        include: TableIncludeSchema,
      }),
    )
    .query(({ input, ctx }) => {
      return ctx.db.table.findFirst({
        where: input.where,
        include: input.include,
      });
    }),

  list: publicProcedure
    .input(
      z.object({
        where: TableWhereInputSchema.optional(),
        page: z.number(),
        limit: z.number().default(PAGE_SIZE),
      }),
    )
    .query(async ({ ctx, input }) => {
      const totalCount = await ctx.db.table.count({
        where: input.where,
      });

      const paginationProps = getPaginationProps({
        ...input,
        totalCount: totalCount,
      });

      const items = await ctx.db.table.findMany({
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
        where: TableWhereUniqueInputSchema,
        level: TableLevelSchema,
        type: TableTypeSchema,
        semester: TableSemesterSchema,
        majorId: z.number(),
        subjects: TableSubjectCreateInputSchema.extend({
          id: AutoIncremntId.optional(),
        })
          .array()
          .min(1),
      }),
    )
    .mutation(({ input, ctx }) => {
      return ctx.db.table.update({
        where: input.where,
        data: {
          type: input.type,
          level: input.level,
          semester: input.semester,
          majorId: input.majorId,
          subjects: {
            upsert: input.subjects.map((tSubject) => ({
              where: { id: tSubject.id },
              create: { ...tSubject, id: undefined },
              update: tSubject,
            })),
            deleteMany: {
              id: {
                notIn: input.subjects
                  .map((tSubject) => tSubject.id)
                  .filter((x) => x) as number[],
              },
            },
          },
        },
      });
    }),

  delete: publicProcedure.input(z.number()).mutation(({ input, ctx }) => {
    return ctx.db.table.delete({
      where: { id: input },
    });
  }),
});
