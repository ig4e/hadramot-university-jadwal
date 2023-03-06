import { z } from "zod";
import { procedure, router } from "../trpc";
import { hallRouter } from "./hall";
import { majorRouter } from "./major";
import { subjectRouter } from "./subject";
import { tableRouter } from "./table";
import { teacherRouter } from "./teacher";

export const appRouter = router({
	major: majorRouter,
	subject: subjectRouter,
	teacher: teacherRouter,
	hall: hallRouter,
	table: tableRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
