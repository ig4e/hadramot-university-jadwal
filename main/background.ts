import { app } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import express from "express";
import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
const expressApp = express();
require("@electron/remote/main").initialize();

// import { appRouter } from "./server/routers/_app";

expressApp.use(
	cors({
		origin: "*",
	}),
);

// expressApp.use(
// 	"/trpc",
// 	trpcExpress.createExpressMiddleware({
// 		router: appRouter,
// 	}),
// );

const isProd: boolean = process.env.NODE_ENV === "production";

if (isProd) {
	serve({ directory: "app" });
} else {
	app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
	await app.whenReady();

	const mainWindow = createWindow("main", {
		width: 1200,
		height: 600,
		autoHideMenuBar: true,
		fullscreenable: true,
		title: "Hadhramout University Tables Tool",
		icon: "../resources/icon.ico",
		webPreferences: {
			nodeIntegration: true,
		},
	});

	expressApp.get("/generate/pdf", async (req, res) => {
		const { title } = req.query;

		const pdf = await mainWindow.webContents.printToPDF({
			displayHeaderFooter: false,
			landscape: false,
			margins: { marginType: "none", bottom: 0, left: 0, right: 0, top: 0 },
			printBackground: true,
		});

		res.setHeader("Content-Length", pdf.byteLength);
		res.setHeader("Content-Type", "application/pdf");
		res.setHeader("Content-Disposition", `attachment; filename=${title}.pdf`);
		res.send(pdf);
	});

	if (isProd) {
		await mainWindow.loadURL("app://./index.html");
	} else {
		const port = process.argv[2];
		await mainWindow.loadURL(`http://localhost:${port}/`);
		//mainWindow.webContents.openDevTools();
	}
})();

const server = expressApp.listen(3000, () => console.log("server started at 3000"));

app.on("window-all-closed", () => {
	app.quit();
	server.close();
});
