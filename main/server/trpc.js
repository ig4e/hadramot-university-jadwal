"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.procedure = exports.router = void 0;
const server_1 = require("@trpc/server");
const superjson_1 = __importDefault(require("superjson"));
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = server_1.initTRPC.create({
    transformer: superjson_1.default,
});
// Base router and procedure helpers
exports.router = t.router;
exports.procedure = t.procedure;
