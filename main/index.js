"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.dbPath = void 0;
// Native
const path_1 = __importStar(require("path"));
const url_1 = require("url");
// Packages
const electron_1 = require("electron");
const electron_is_dev_1 = __importDefault(require("electron-is-dev"));
//@ts-ignore
const electron_next_1 = __importDefault(require("electron-next"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const trpcExpress = __importStar(require("@trpc/server/adapters/express"));
const fs_1 = __importDefault(require("fs"));
// Imports
const _app_1 = require("./server/routers/_app");
const prisma_client_1 = require("../generated/prisma-client");
exports.dbPath = electron_is_dev_1.default ? path_1.default.join(__dirname, "../prisma/dev.db") : path_1.default.join(electron_1.app.getPath("userData"), "database.db");
if (!electron_is_dev_1.default) {
    try {
        // database file does not exist, need to create
        fs_1.default.copyFileSync((0, path_1.join)(process.resourcesPath, "prisma/dev.db"), exports.dbPath, fs_1.default.constants.COPYFILE_EXCL);
        console.log("New database file created");
    }
    catch (err) {
        if (err.code != "EEXIST") {
            console.error(`Failed creating sqlite file.`, err);
        }
        else {
            console.log("Database file detected");
        }
    }
}
exports.prisma = new prisma_client_1.PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    datasources: {
        db: {
            url: `file:${exports.dbPath}`,
        },
    },
});
const expressApp = (0, express_1.default)();
expressApp.use((0, cors_1.default)({
    origin: "*",
}));
expressApp.use("/trpc", trpcExpress.createExpressMiddleware({
    router: _app_1.appRouter,
}));
// Prepare the renderer once the app is ready
electron_1.app.on("ready", async () => {
    await (0, electron_next_1.default)("./renderer");
    const mainWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: false,
            preload: (0, path_1.join)(__dirname, "preload.js"),
        },
    });
    const url = electron_is_dev_1.default
        ? "http://localhost:8000/"
        : (0, url_1.format)({
            pathname: (0, path_1.join)(__dirname, "../renderer/out/index.html"),
            protocol: "file:",
            slashes: true,
        });
    mainWindow.loadURL(url);
});
// Quit the app once all windows are closed
const server = expressApp.listen(3000, () => console.log("server started at 3000"));
electron_1.app.on("window-all-closed", () => {
    server.close();
    electron_1.app.quit();
});
