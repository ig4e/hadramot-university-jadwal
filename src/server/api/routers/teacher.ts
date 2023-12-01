import {
  TeacherIncludeSchema,
  TeacherWhereInputSchema,
  TeacherWhereUniqueInputSchema,
} from "prisma/generated/zod";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  PAGE_SIZE,
  TeacherWorkDateCreateWithoutDayOrTeacherInputSchema,
  dayNameToId,
} from "~/server/constants";
import { getPaginationProps } from "~/server/utils/pagination";

export const teacherRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        subjectIDs: z.number().array().min(1),
        workDates:
          TeacherWorkDateCreateWithoutDayOrTeacherInputSchema.array().min(1),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const teacher = await ctx.db.teacher.create({
        data: {
          name: input.name,
          subjects: {
            connect: input.subjectIDs.map((id) => ({ id })),
          },
        },
        include: {
          subjects: true,
        },
      });

      const teacherWorkingDates = await Promise.all(
        input.workDates.map((workDate) =>
          ctx.db.teacherWorkDate.create({
            data: {
              startsAt: workDate.startsAt,
              endsAt: workDate.endsAt,
              teacherId: teacher.id,
              dayId: dayNameToId(workDate.day),
            },
          }),
        ),
      );

      return { ...teacher, workDates: teacherWorkingDates };
    }),

  list: publicProcedure
    .input(
      z.object({
        where: TeacherWhereInputSchema.optional(),
        include: TeacherIncludeSchema.optional(),
        page: z.number(),
        limit: z.number().default(PAGE_SIZE),
      }),
    )
    .query(async ({ ctx, input }) => {
      const totalCount = await ctx.db.teacher.count({
        where: input.where,
      });

      const paginationProps = getPaginationProps({
        ...input,
        totalCount: totalCount,
      });

      const items = await ctx.db.teacher.findMany({
        where: input.where,
        include: input.include,
      });

      return {
        pageInfo: paginationProps,
        items,
      };
    }),

  update: publicProcedure
    .input(
      z.object({
        where: TeacherWhereUniqueInputSchema,
        name: z.string().optional(),
        subjectIDs: z.number().array().min(1).optional(),
        workDates: TeacherWorkDateCreateWithoutDayOrTeacherInputSchema.array()
          .min(1)
          .optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const teacher = await ctx.db.teacher.update({
        where: input.where,
        data: {
          name: input.name,
          subjects: input.subjectIDs && {
            connect: input.subjectIDs.map((id) => ({ id })),
          },
        },
        include: {
          workDates: true,
          subjects: true,
        },
      });

      const teacherWorkingDates =
        input.workDates &&
        (await Promise.all(
          input.workDates.map((workDate) =>
            ctx.db.teacherWorkDate.create({
              data: {
                startsAt: workDate.startsAt,
                endsAt: workDate.endsAt,
                teacherId: teacher.id,
                dayId: dayNameToId(workDate.day),
              },
            }),
          ),
        ));

      return {
        ...teacher,
        workDates: teacherWorkingDates || teacher.workDates,
      };
    }),

  delete: publicProcedure.input(z.number()).mutation(({ input, ctx }) => {
    return ctx.db.teacher.delete({
      where: { id: input },
    });
  }),
});
