import { app as application, ipcMain, BrowserWindow } from "electron";
import path from "path";

class MainApplication {
    constructor() {
        // Handle creating or removing shortcuts on Windows when installing or uninstalling.
        if (require("electron-squirrel-startup")) {
            application.quit();
        }

        application.whenReady().then(() => {
            this.createWindow();
        });

        ipcMain.on("request-minimize", e => {
            BrowserWindow.getFocusedWindow()?.minimize();
        });

        ipcMain.on("request-maximize", e => {
            const window = BrowserWindow.getFocusedWindow();
            if (window == null) {
                return;
            }
            if (window.isMaximized()) {
                window.unmaximize();
            } else {
                window.maximize();
            }
        });

        ipcMain.on("request-close", e => {
            application.quit();
        });
    }

    createWindow() {
        const window = new BrowserWindow({
            width: 1024,
            height: 640,
            autoHideMenuBar: true,
            titleBarStyle: "hidden",
            webPreferences: {
                contextIsolation: false,
                nodeIntegration: true,
                preload: path.join(__dirname, 'preload.js'),
            },
        });

          // Load the index.html of the application.
        if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
            window.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
        } else {
            window.loadFile(path.join(__dirname, `../../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
        }
    }
}

new MainApplication;