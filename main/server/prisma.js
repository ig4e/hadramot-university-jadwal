"use strict";
/**
 * Instantiates a single instance PrismaClient and save it on the global object.
 * @link https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.Prisma = void 0;
const __1 = require("..");
Object.defineProperty(exports, "prisma", { enumerable: true, get: function () { return __1.prisma; } });
const prisma_client_1 = require("../../generated/prisma-client");
Object.defineProperty(exports, "Prisma", { enumerable: true, get: function () { return prisma_client_1.Prisma; } });
