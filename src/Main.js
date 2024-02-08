const { app: application, BrowserWindow } = require("electron");

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
        });
        window.loadFile("src/index.html");
    }
}

new Main;