"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subjectRouter = void 0;
const trpc_1 = require("../trpc");
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const prisma_1 = require("../prisma");
const fuse_js_1 = __importDefault(require("fuse.js"));
const defaultSubjectSelect = client_1.Prisma.validator()({
    id: true,
    name: true,
    createdAt: true,
    updatedAt: true,
});
exports.subjectRouter = (0, trpc_1.router)({
    create: trpc_1.procedure.input(zod_1.z.object({ name: zod_1.z.string() })).mutation(async ({ input }) => {
        const createdSubject = await prisma_1.prisma.subject.create({
            data: {
                name: input.name,
            },
        });
        return createdSubject;
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
        const items = await prisma_1.prisma.subject.findMany({
            select: defaultSubjectSelect,
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
        const list = await prisma_1.prisma.subject.findMany({
            select: defaultSubjectSelect,
        });
        const SubjectFuse = new fuse_js_1.default(list, {
            keys: ["name"],
            includeScore: false,
        });
        return SubjectFuse.search(input.query).map((x) => x.item);
    }),
    get: trpc_1.procedure
        .input(zod_1.z.object({
        id: zod_1.z.string(),
    }))
        .query(async ({ input }) => {
        const Subject = await prisma_1.prisma.subject.findUnique({
            where: { id: input.id },
            select: defaultSubjectSelect,
        });
        return Subject;
    }),
    edit: trpc_1.procedure
        .input(zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
    }))
        .mutation(async ({ input }) => {
        const editedSubject = await prisma_1.prisma.subject.update({
            where: { id: input.id },
            data: {
                name: input.name,
            },
            select: defaultSubjectSelect,
        });
        return editedSubject;
    }),
    delete: trpc_1.procedure
        .input(zod_1.z.object({
        id: zod_1.z.string(),
    }))
        .mutation(async ({ input }) => {
        const editedSubject = await prisma_1.prisma.subject.delete({
            where: { id: input.id },
            select: defaultSubjectSelect,
        });
        return editedSubject;
    }),
});
