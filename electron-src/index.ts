// Native
import path, { join } from "path";
import { format } from "url";

// Packages
import { BrowserWindow, app } from "electron";
import isDev from "electron-is-dev";
//@ts-ignore
import prepareNext from "electron-next";
import express from "express";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import fs from "fs";

// Imports
import { appRouter } from "./server/routers/_app";
import { PrismaClient, Prisma } from "@prisma/client";

export const dbPath = isDev ? path.join(__dirname, "../prisma/dev.db") : path.join(app.getPath("userData"), "database.db");

if (!isDev) {
	try {
		// database file does not exist, need to create
		fs.copyFileSync(join(process.resourcesPath, "prisma/dev.db"), dbPath, fs.constants.COPYFILE_EXCL);
		console.log("New database file created");
	} catch (err: any) {
		if (err.code != "EEXIST") {
			console.error(`Failed creating sqlite file.`, err);
		} else {
			console.log("Database file detected");
		}
	}
}

export const prisma = new PrismaClient({
	log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
	// datasources: {
	// 	db: {
	// 		url: `file:${dbPath}`,
	// 	},
	// },
});

const expressApp = express();

expressApp.use(
	cors({
		origin: "*",
	}),
);

expressApp.use(
	"/trpc",
	trpcExpress.createExpressMiddleware({
		router: appRouter,
	}),
);

// Prepare the renderer once the app is ready
app.on("ready", async () => {
	await prepareNext("./renderer");

	const mainWindow = new BrowserWindow({
		width: 1200,
		height: 800,
		autoHideMenuBar: true,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: false,
			preload: join(__dirname, "preload.js"),
		},
	});

	const url = isDev
		? "http://localhost:8000/"
		: format({
				pathname: join(__dirname, "../renderer/out/index.html"),
				protocol: "file:",
				slashes: true,
		  });

	mainWindow.loadURL(url);

	expressApp.get("/generate/pdf", async (req, res) => {
		const { title } = req.query;

		const pdf = await mainWindow.webContents.printToPDF({
			marginsType: 1,
			landscape: false,
			printBackground: true,
		});

		res.setHeader("Content-Length", pdf.byteLength);
		res.setHeader("Content-Type", "application/pdf");
		res.setHeader("Content-Disposition", `attachment; filename=${title}.pdf`);
		res.send(pdf);
	});
});

// Quit the app once all windows are closed
const server = expressApp.listen(3000, () => console.log("server started at 3000"));

app.on("window-all-closed", () => {
	server.close();
	app.quit();
});
