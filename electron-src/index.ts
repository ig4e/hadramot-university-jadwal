// Native
import { join } from "path";
import { format } from "url";

// Packages
import { BrowserWindow, app } from "electron";
import isDev from "electron-is-dev";
import prepareNext from "electron-next";
import express from "express";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";

// Imports
import { appRouter } from "./server/routers/_app";

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
		width: 800,
		height: 600,
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
});

// Quit the app once all windows are closed
const server = expressApp.listen(3000, () => console.log("server started at 3000"));

app.on("window-all-closed", () => {
	app.quit();
	server.close();
});
