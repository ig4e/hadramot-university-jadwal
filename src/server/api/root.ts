import { hallRouter } from "~/server/api/routers/hall";
import { majorRouter } from "~/server/api/routers/major";
import { subjectRouter } from "~/server/api/routers/subject";
import { tableRouter } from "~/server/api/routers/table";
import { teacherRouter } from "~/server/api/routers/teacher";
import { createTRPCRouter } from "~/server/api/trpc";
import { dataRouter } from "~/server/api/routers/data";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  hall: hallRouter,
  major: majorRouter,
  subject: subjectRouter,
  table: tableRouter,
  teacher: teacherRouter,
  data: dataRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
