/**
 * Instantiates a single instance PrismaClient and save it on the global object.
 * @link https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
 */

import { prisma } from "..";
import { Prisma } from "@prisma/client";

export { Prisma, prisma };
