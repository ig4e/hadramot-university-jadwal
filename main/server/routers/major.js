"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.majorRouter = void 0;
const trpc_1 = require("../trpc");
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const prisma_1 = require("../prisma");
const fuse_js_1 = __importDefault(require("fuse.js"));
const defaultMajorSelect = client_1.Prisma.validator()({
    id: true,
    type: true,
    name: true,
    createdAt: true,
    updatedAt: true,
    studentsCount: true,
});
exports.majorRouter = (0, trpc_1.router)({
    create: trpc_1.procedure
        .input(zod_1.z.object({
        name: zod_1.z.string(),
        studentsCount: zod_1.z.number(),
        type: zod_1.z.number(),
    }))
        .mutation(async ({ input: { name, studentsCount, type } }) => {
        const createdMajor = await prisma_1.prisma.major.create({
            data: {
                name,
                studentsCount,
                type,
            },
        });
        return createdMajor;
    }),
    list: trpc_1.procedure
        .input(zod_1.z.object({
        limit: zod_1.z.number().min(1).max(250).nullish(),
        cursor: zod_1.z.string().nullish(),
        type: zod_1.z.number().max(2).nullish(),
    }))
        .query(async ({ input }) => {
        /**
         * For pagination docs you can have a look here
         * @see https://trpc.io/docs/useInfiniteQuery
         * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
         */
        const limit = input.limit ?? 50;
        const { cursor } = input;
        const items = await prisma_1.prisma.major.findMany({
            select: defaultMajorSelect,
            take: limit + 1,
            where: {
                type: input.type || undefined,
            },
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
        const list = await prisma_1.prisma.major.findMany({
            select: defaultMajorSelect,
        });
        const majorFuse = new fuse_js_1.default(list, {
            keys: ["name"],
            includeScore: false,
        });
        return majorFuse.search(input.query).map((x) => x.item);
    }),
    get: trpc_1.procedure
        .input(zod_1.z.object({
        id: zod_1.z.string(),
    }))
        .query(async ({ input }) => {
        const major = await prisma_1.prisma.major.findUnique({
            where: { id: input.id },
            select: defaultMajorSelect,
        });
        return major;
    }),
    edit: trpc_1.procedure
        .input(zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
        studentsCount: zod_1.z.number(),
        type: zod_1.z.number(),
    }))
        .mutation(async ({ input }) => {
        const editedMajor = await prisma_1.prisma.major.update({
            where: { id: input.id },
            data: {
                name: input.name,
                studentsCount: input.studentsCount,
                type: input.type,
            },
            select: defaultMajorSelect,
        });
        return editedMajor;
    }),
    delete: trpc_1.procedure
        .input(zod_1.z.object({
        id: zod_1.z.string(),
    }))
        .mutation(async ({ input }) => {
        const editedMajor = await prisma_1.prisma.major.delete({
            where: { id: input.id },
            select: defaultMajorSelect,
        });
        return editedMajor;
    }),
});
