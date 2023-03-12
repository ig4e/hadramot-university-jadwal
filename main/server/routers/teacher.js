"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teacherRouter = void 0;
const trpc_1 = require("../trpc");
const zod_1 = require("zod");
const prisma_1 = require("../prisma");
const fuse_js_1 = __importDefault(require("fuse.js"));
const daysEnum = zod_1.z.enum(["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]);
const DAYS_ARRAY = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
const defaultTeacherSelect = prisma_1.Prisma.validator()({
    id: true,
    name: true,
    createdAt: true,
    updatedAt: true,
    subjects: true,
    workDates: {
        include: { day: true, teacher: true },
    },
});
exports.teacherRouter = (0, trpc_1.router)({
    create: trpc_1.procedure
        .input(zod_1.z.object({
        name: zod_1.z.string(),
        subjects: zod_1.z.string().array(),
        workDates: zod_1.z
            .object({
            dayName: daysEnum,
            startsAt: zod_1.z.number(),
            endsAt: zod_1.z.number(),
        })
            .array(),
    }))
        .mutation(async ({ input }) => {
        return await prisma_1.prisma.teacher.create({
            data: {
                name: input.name,
                subjects: { connect: input.subjects.map((id) => ({ id })) },
                workDates: {
                    create: input.workDates.map((workDate) => ({
                        day: {
                            connectOrCreate: {
                                where: { name: workDate.dayName },
                                create: { name: workDate.dayName },
                            },
                        },
                        startsAt: workDate.startsAt,
                        endsAt: workDate.endsAt,
                    })),
                },
            },
        });
    }),
    list: trpc_1.procedure
        .input(zod_1.z.object({
        limit: zod_1.z.number().min(1).max(250).nullish(),
        cursor: zod_1.z.string().nullish(),
    }))
        .query(async ({ input }) => {
        /**
         * For pagination docs you can have a look here
         * @see https://trpc.io/docs/useInfiniteQuery
         * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
         */
        const limit = input.limit ?? 50;
        const { cursor } = input;
        const items = await prisma_1.prisma.teacher.findMany({
            select: defaultTeacherSelect,
            take: limit + 1,
            where: {},
            cursor: cursor
                ? {
                    id: cursor,
                }
                : undefined,
            orderBy: {
                createdAt: "desc",
            },
        });
        let nextCursor = undefined;
        if (items.length > limit) {
            const nextItem = items.pop();
            nextCursor = nextItem.id;
        }
        return {
            items: items.reverse(),
            nextCursor,
        };
    }),
    search: trpc_1.procedure
        .input(zod_1.z.object({
        query: zod_1.z.string(),
    }))
        .query(async ({ input }) => {
        const list = await prisma_1.prisma.teacher.findMany({
            //select: defaultTeacherSelect,
            select: { id: true, name: true },
        });
        const teacherFuse = new fuse_js_1.default(list, {
            keys: ["name"],
            includeScore: false,
        });
        return teacherFuse.search(input.query).map((x) => x.item);
    }),
    get: trpc_1.procedure
        .input(zod_1.z.object({
        id: zod_1.z.string(),
    }))
        .query(async ({ input }) => {
        const teacher = await prisma_1.prisma.teacher.findUnique({
            where: { id: input.id },
            select: defaultTeacherSelect,
        });
        return teacher;
    }),
    edit: trpc_1.procedure
        .input(zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
        subjects: zod_1.z.string().array(),
        workDates: zod_1.z
            .object({
            id: zod_1.z.string(),
            dayName: daysEnum,
            startsAt: zod_1.z.number(),
            endsAt: zod_1.z.number(),
        })
            .array(),
    }))
        .mutation(async ({ input }) => {
        const editedTeacher = await prisma_1.prisma.teacher.update({
            where: { id: input.id },
            data: {
                name: input.name,
                subjects: {
                    set: input.subjects.map((subjectId) => ({
                        id: subjectId,
                    })),
                },
                workDates: {
                    deleteMany: { NOT: { id: { in: input.workDates.map(({ id }) => id) } } },
                    upsert: input.workDates.map(({ id, endsAt, startsAt, dayName }) => ({
                        where: {
                            id,
                        },
                        update: {
                            startsAt,
                            endsAt,
                        },
                        create: {
                            id,
                            day: { connect: { name: dayName } },
                            startsAt,
                            endsAt,
                        },
                    })),
                },
            },
            select: defaultTeacherSelect,
        });
        return editedTeacher;
    }),
    delete: trpc_1.procedure
        .input(zod_1.z.object({
        id: zod_1.z.string(),
    }))
        .mutation(async ({ input }) => {
        const editedTeacher = await prisma_1.prisma.teacher.delete({
            where: { id: input.id },
            select: defaultTeacherSelect,
        });
        return editedTeacher;
    }),
});
