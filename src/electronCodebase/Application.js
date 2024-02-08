const { app: application, ipcMain, BrowserWindow } = require("electron");
const path = require("path");

class Main {
    constructor() {
        application.whenReady().then(() => {
            this.createWindow();
        });
    }

    createWindow() {
        const window = new BrowserWindow({
            width: 1024,
            height: 640,
            menuBarVisible: false,
            autoHideMenuBar: true,
            titleBarStyle: "hidden",
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            },
        });
        window.loadFile("src/index.html");

        ipcMain.on("request-minimize", e => {
            BrowserWindow.getFocusedWindow()?.minimize();
        });

        ipcMain.on("request-maximize", e => {
            BrowserWindow.getFocusedWindow()?.maximize();
        });

        ipcMain.on("request-close", e => {
            application.quit();
        });
    }
}

new Main;