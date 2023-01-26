import { z } from "zod";
import { procedure, router } from "../trpc";
import { majorRouter } from "./major";
import { subjectRouter } from "./subject";
import { teacherRouter } from "./teacher";

export const appRouter = router({
	hello: procedure
		.input(
			z.object({
				text: z.string(),
			}),
		)
		.query(({ input }) => {
			return {
				greeting: `hello ${input.text}`,
			};
		}),

	major: majorRouter,
	subject: subjectRouter,
	teacher: teacherRouter

});

// export type definition of API
export type AppRouter = typeof appRouter;
