const { app: application, BrowserWindow } = require("electron");
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
    }
}

new Main;