import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import packageJson from "package.json";
import {
  DaySchema,
  HallSchema,
  MajorSchema,
  SubjectSchema,
  TableSchema,
  TableSubjectSchema,
  TeacherSchema,
  TeacherWorkDateSchema,
} from "prisma/generated/zod";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";

export const dataRouter = createTRPCRouter({
  export: publicProcedure.input(z.object({})).query(async ({ input, ctx }) => {
    const [tables, teachers, majors, halls, subjects, days] =
      await ctx.db.$transaction([
        ctx.db.table.findMany({
          include: {
            subjects: true,
            major: true,
          },
        }),
        ctx.db.teacher.findMany({
          include: {
            subjects: true,
            workDates: true,
            tableSubjects: true,
          },
        }),
        ctx.db.major.findMany(),
        ctx.db.hall.findMany(),
        ctx.db.subject.findMany(),
        ctx.db.day.findMany(),
      ]);

    return {
      version: packageJson.version,
      tables,
      teachers,
      majors,
      halls,
      subjects,
      days,
    };
  }),
  import: publicProcedure
    .input(
      z.object({
        version: z.string(),
        data: z.object({
          tables: z.any(),
          teachers: TeacherSchema.array(),
          majors: MajorSchema.array(),
          halls: HallSchema.array(),
          subjects: SubjectSchema.array(),
          days: DaySchema.array(),
        }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      if (packageJson.version !== input.version)
        throw new TRPCError({
          code: "CONFLICT",
          message: "أصدار النسخة الاحتياطية غير متوافق",
        });

      await ctx.db.$transaction([
        ctx.db.table.deleteMany(),
        ctx.db.tableSubject.deleteMany(),
        ctx.db.teacher.deleteMany(),
        ctx.db.teacherWorkDate.deleteMany(),
        ctx.db.major.deleteMany(),
        ctx.db.hall.deleteMany(),
        ctx.db.subject.deleteMany(),
        ctx.db.day.deleteMany(),
      ]);

      const table = Prisma.validator<Prisma.TableDefaultArgs>()({
        include: {
          subjects: true,
          major: true,
        },
      });

      type Table = Prisma.TableGetPayload<typeof table>;

      const test = {} as any as Table;

      ctx.db.table.create({
        data: {
          semester: test.semester,
          type: test.type,
          level: test.level,

          // subjects: {
          //   create: test.subjects,
          // },
          major: {
            create: {
              ...test.major,
            },
          },
        },
      });
    }),
});
