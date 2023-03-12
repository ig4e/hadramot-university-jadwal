"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tableRouter = void 0;
const trpc_1 = require("../trpc");
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const prisma_1 = require("../prisma");
const range_1 = require("../../utils/range");
// const defaultTableSelect: Prisma.TableSelect = {
// 	id: true,
// 	createdAt: true,
// 	level: true,
// 	major: true,
// 	semester: true,
// 	type: true,
// 	updatedAt: true,
// 	subjects: {
// 		include: {
// 			day: true,
// 			hall: true,
// 			subject: true,
// 			teacher: true,
// 		},
// 	},
// };
const defaultTableSelect = client_1.Prisma.validator()({
    id: true,
    createdAt: true,
    level: true,
    major: true,
    semester: true,
    type: true,
    updatedAt: true,
    subjects: {
        include: {
            day: true,
            hall: true,
            subject: true,
            teacher: true,
        },
    },
});
/*
{
    "semester": 1,
    "acceptType": 1,
    "majorId": "",
    "level": 1,
    "SUNDAY": [
        {
            "id": "15feef53-a4da-4b78-9131-163c971953de",
            "teacherId": "538281ac-1522-4b24-89d9-598396be8456",
            "subjectId": "",
            "hallId": "0ead6a6c-0320-4dbc-abe9-47aba0d46091",
            "timeRange": [
                4.5,
                16
            ]
        }
    ],
    "MONDAY": [],
    "TUESDAY": [],
    "WEDNESDAY": [],
    "THURSDAY": [],
    "FRIDAY": [],
    "SATURDAY": []
}
*/
const tableDayInputType = zod_1.z
    .object({
    id: zod_1.z.string(),
    teacherId: zod_1.z.string(),
    subjectId: zod_1.z.string(),
    hallId: zod_1.z.string(),
    timeRange: zod_1.z.tuple([zod_1.z.number(), zod_1.z.number()]),
})
    .array();
exports.tableRouter = (0, trpc_1.router)({
    create: trpc_1.procedure
        .input(zod_1.z.object({
        semester: zod_1.z.number().min(1).max(2),
        acceptType: zod_1.z.number().min(1).max(2),
        level: zod_1.z.number().min(1).max(4),
        majorId: zod_1.z.string(),
        SUNDAY: tableDayInputType,
        MONDAY: tableDayInputType,
        TUESDAY: tableDayInputType,
        WEDNESDAY: tableDayInputType,
        THURSDAY: tableDayInputType,
        FRIDAY: tableDayInputType,
        SATURDAY: tableDayInputType,
    }))
        .mutation(async ({ input }) => {
        const validation = await validateTable(input);
        if (validation.error)
            return validation;
        const { semester, majorId, level, acceptType, ...days } = input;
        const daysWithDayName = Object.keys(days)
            .map((key) => {
            const dayName = key;
            return days[dayName].map((day) => ({ dayName: dayName, ...day }));
        })
            .reduce((total, current) => [...total, ...current], []);
        const table = await prisma_1.prisma.table.create({
            data: {
                level: level,
                semester: semester,
                type: acceptType,
                major: { connect: { id: majorId } },
                subjects: {
                    create: daysWithDayName.map((subject) => ({
                        id: subject.id,
                        hall: { connect: { id: subject.hallId } },
                        day: { connect: { name: subject.dayName } },
                        startsAt: subject.timeRange[0],
                        endsAt: subject.timeRange[1],
                        subject: { connect: { id: subject.subjectId } },
                        teacher: { connect: { id: subject.teacherId } },
                    })),
                },
            },
        });
        return { ...validation, table };
    }),
    validate: trpc_1.procedure
        .input(zod_1.z.object({
        semester: zod_1.z.number().min(1).max(2),
        acceptType: zod_1.z.number().min(1).max(2),
        level: zod_1.z.number().min(1).max(4),
        majorId: zod_1.z.string(),
        SUNDAY: tableDayInputType,
        MONDAY: tableDayInputType,
        TUESDAY: tableDayInputType,
        WEDNESDAY: tableDayInputType,
        THURSDAY: tableDayInputType,
        FRIDAY: tableDayInputType,
        SATURDAY: tableDayInputType,
    }))
        .query(async ({ input }) => {
        return await validateTable(input);
    }),
    list: trpc_1.procedure
        .input(zod_1.z.object({
        limit: zod_1.z.number().min(1).max(250).nullish(),
        cursor: zod_1.z.string().nullish(),
        semester: zod_1.z.number().min(1).max(2).nullish(),
        type: zod_1.z.number().min(1).max(2).nullish(),
        level: zod_1.z.number().min(1).max(4).nullish(),
        majorId: zod_1.z.string().nullish(),
    }))
        .query(async ({ input }) => {
        /**
         * For pagination docs you can have a look here
         * @see https://trpc.io/docs/useInfiniteQuery
         * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
         */
        const limit = input.limit ?? 50;
        const { cursor } = input;
        const items = await prisma_1.prisma.table.findMany({
            select: defaultTableSelect,
            take: limit + 1,
            where: {
                semester: input.semester || undefined,
                type: input.type || undefined,
                level: input.level || undefined,
                major: input.majorId ? { id: input.majorId } : undefined,
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
    get: trpc_1.procedure
        .input(zod_1.z.object({
        id: zod_1.z.string(),
    }))
        .query(async ({ input }) => {
        const table = await prisma_1.prisma.table.findUnique({
            where: { id: input.id },
            select: defaultTableSelect,
        });
        return table;
    }),
    edit: trpc_1.procedure
        .input(zod_1.z.object({
        id: zod_1.z.string(),
    }))
        .mutation(async ({ input }) => { }),
    delete: trpc_1.procedure
        .input(zod_1.z.object({
        id: zod_1.z.string(),
    }))
        .mutation(async ({ input }) => {
        const deletedTable = await prisma_1.prisma.table.delete({
            where: { id: input.id },
            select: defaultTableSelect,
        });
        return deletedTable;
    }),
});
async function validateTable(input) {
    const errors = {};
    const { semester, majorId, level, acceptType, ...days } = input;
    const daysWithDayName = Object.keys(days)
        .map((key) => {
        const dayName = key;
        return days[dayName].map((day) => ({ dayName: dayName, ...day }));
    })
        .reduce((total, current) => [...total, ...current], []);
    for (let day of daysWithDayName) {
        const { id, dayName, hallId, subjectId, teacherId, timeRange } = day;
        const dayIndex = days[dayName].findIndex((daySubject) => daySubject.id === id);
        errors[`${dayName}.${dayIndex}.timeRange`] = "";
        const teacher = await prisma_1.prisma.teacher.findUnique({
            where: { id: teacherId },
            include: {
                tableSubjects: { where: { day: { name: dayName }, table: { semester: input.semester } } },
                workDates: { where: { day: { name: dayName } } },
            },
        });
        if ((0, range_1.isConflicting)(timeRange, teacher?.tableSubjects.map(({ startsAt, endsAt }) => [startsAt, endsAt]))) {
            errors[`${dayName}.${dayIndex}.timeRange`] = "المعلم فمحاضرة اخرى";
        }
        if ((0, range_1.isConflicting)(timeRange, days[dayName]
            .filter((_, index) => index !== dayIndex && _.teacherId === teacherId)
            .map(({ timeRange: [startsAt, endsAt] }) => [startsAt, endsAt]))) {
            errors[`${dayName}.${dayIndex}.timeRange`] = "المعلم فمحاضرة اخرى فنفس الوقت والجدول";
        }
        if (!(0, range_1.isIn)(timeRange, teacher?.workDates.map(({ startsAt, endsAt }) => [startsAt, endsAt]))) {
            errors[`${dayName}.${dayIndex}.timeRange`] = "المعلم غير متوفر";
        }
    }
    return { errors, error: Object.keys(errors).some((key) => errors[key]) };
}
