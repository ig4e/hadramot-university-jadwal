"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHallAvailable = exports.hallRouter = exports.DAYS_ARRAY = exports.daysEnum = void 0;
const trpc_1 = require("../trpc");
const zod_1 = require("zod");
const prisma_1 = require("../prisma");
const fuse_js_1 = __importDefault(require("fuse.js"));
const range_1 = require("../../utils/range");
exports.daysEnum = zod_1.z.enum(["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]);
exports.DAYS_ARRAY = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
const defaultHallSelect = prisma_1.Prisma.validator()({
    id: true,
    name: true,
    createdAt: true,
    updatedAt: true,
    studentsCount: true,
});
exports.hallRouter = (0, trpc_1.router)({
    create: trpc_1.procedure
        .input(zod_1.z.object({ name: zod_1.z.string(), studentsCount: zod_1.z.number() }))
        .mutation(async ({ input: { name, studentsCount } }) => {
        const createdHall = await prisma_1.prisma.hall.create({
            data: {
                name,
                studentsCount,
            },
        });
        return createdHall;
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
        const items = await prisma_1.prisma.hall.findMany({
            select: defaultHallSelect,
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
        const list = await prisma_1.prisma.hall.findMany({
            select: defaultHallSelect,
        });
        const hallFuse = new fuse_js_1.default(list, {
            keys: ["name"],
            includeScore: false,
        });
        return hallFuse.search(input.query).map((x) => x.item);
    }),
    get: trpc_1.procedure
        .input(zod_1.z.object({
        id: zod_1.z.string(),
    }))
        .query(async ({ input }) => {
        const hall = await prisma_1.prisma.hall.findUnique({
            where: { id: input.id },
            select: defaultHallSelect,
        });
        return hall;
    }),
    edit: trpc_1.procedure
        .input(zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
        studentsCount: zod_1.z.number(),
    }))
        .mutation(async ({ input }) => {
        const editedHall = await prisma_1.prisma.hall.update({
            where: { id: input.id },
            data: {
                name: input.name,
                studentsCount: input.studentsCount,
            },
            select: defaultHallSelect,
        });
        return editedHall;
    }),
    delete: trpc_1.procedure
        .input(zod_1.z.object({
        id: zod_1.z.string(),
    }))
        .mutation(async ({ input }) => {
        const editedHall = await prisma_1.prisma.hall.delete({
            where: { id: input.id },
            select: defaultHallSelect,
        });
        return editedHall;
    }),
    isAvailable: trpc_1.procedure
        .input(zod_1.z.object({
        id: zod_1.z.string(),
        hallId: zod_1.z.string(),
        dayName: exports.daysEnum,
        range: zod_1.z.tuple([zod_1.z.number(), zod_1.z.number()]),
    }))
        .query(async ({ input }) => {
        return isHallAvailable(input);
    }),
});
async function isHallAvailable(input) {
    const hall = await prisma_1.prisma.hall.findUnique({
        where: { id: input.hallId },
        include: { tableSubjects: { where: { day: { name: input.dayName } } } },
    });
    if (!hall)
        return {
            error: false,
            message: ``,
        };
    const hallTableWorkDatesRanges = hall?.tableSubjects.map(({ startsAt, endsAt }) => [startsAt, endsAt]) || [];
    if ((0, range_1.isIn)(input.range, hallTableWorkDatesRanges) || (0, range_1.isConflicting)(input.range, hallTableWorkDatesRanges))
        return {
            error: true,
            message: `القاعة مشغولة بمحاضرة اخرى الأن`,
        };
    return {
        error: false,
        message: ``,
    };
}
exports.isHallAvailable = isHallAvailable;
