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

export const dataRouter = createTRPCRouter({
  export: publicProcedure.input(z.object({})).query(async ({ input, ctx }) => {
    const [
      tables,
      tableSubjects,
      teachers,
      teacherWorkDates,
      majors,
      halls,
      subjects,
      days,
    ] = await Promise.all([
      ctx.db.table.findMany(),
      ctx.db.tableSubject.findMany(),
      ctx.db.teacher.findMany(),
      ctx.db.teacherWorkDate.findMany(),
      ctx.db.major.findMany(),
      ctx.db.hall.findMany(),
      ctx.db.subject.findMany(),
      ctx.db.day.findMany(),
    ]);

    return {
      version: packageJson.version,
      tables,
      tableSubjects,
      teachers,
      teacherWorkDates,
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
          tables: TableSchema.array(),
          tableSubjects: TableSubjectSchema.array(),
          teachers: TeacherSchema.array(),
          teacherWorkDates: TeacherWorkDateSchema.array(),
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

      await Promise.all(
        input.data.days.map((day) =>
          ctx.db.day.create({
            data: {
              ...day,
            },
          }),
        ),
      );

      await Promise.all(
        input.data.subjects.map((subject) =>
          ctx.db.subject.create({
            data: {
              ...subject,
            },
          }),
        ),
      );

      await Promise.all(
        input.data.halls.map((hall) =>
          ctx.db.hall.create({
            data: {
              ...hall,
            },
          }),
        ),
      );

      await Promise.all(
        input.data.halls.map((hall) =>
          ctx.db.hall.create({
            data: {
              ...hall,
            },
          }),
        ),
      );

      await Promise.all(
        input.data.majors.map((major) =>
          ctx.db.major.create({
            data: {
              ...major,
            },
          }),
        ),
      );

      await Promise.all(
        input.data.teachers.map((teacher) =>
          ctx.db.teacher.create({ data: teacher }),
        ),
      );

      await Promise.all(
        input.data.teacherWorkDates.map((teacherWorkDate) =>
          ctx.db.teacherWorkDate.create({ data: teacherWorkDate }),
        ),
      );

      await Promise.all(
        input.data.tables.map((table) => ctx.db.table.create({ data: table })),
      );

      await Promise.all(
        input.data.tableSubjects.map((tableSubject) =>
          ctx.db.tableSubject.create({ data: tableSubject }),
        ),
      );
    }),
});
