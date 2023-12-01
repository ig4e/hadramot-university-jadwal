import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import packageJson from "package.json";

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
});
