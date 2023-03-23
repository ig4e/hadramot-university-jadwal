"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const trpc_1 = require("../trpc");
const hall_1 = require("./hall");
const major_1 = require("./major");
const subject_1 = require("./subject");
const table_1 = require("./table");
const teacher_1 = require("./teacher");
exports.appRouter = (0, trpc_1.router)({
    major: major_1.majorRouter,
    subject: subject_1.subjectRouter,
    teacher: teacher_1.teacherRouter,
    hall: hall_1.hallRouter,
    table: table_1.tableRouter,
});
