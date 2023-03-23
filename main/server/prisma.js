"use strict";
/**
 * Instantiates a single instance PrismaClient and save it on the global object.
 * @link https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.Prisma = void 0;
const __1 = require("..");
Object.defineProperty(exports, "prisma", { enumerable: true, get: function () { return __1.prisma; } });
const client_1 = require("@prisma/client");
Object.defineProperty(exports, "Prisma", { enumerable: true, get: function () { return client_1.Prisma; } });
