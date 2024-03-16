const { ipcRenderer } = require("electron");

export class MenuBar {
    public menuBar: HTMLElement;
    public left: HTMLElement;
    public right: HTMLElement;
    public minimizeButton: HTMLElement | null;
    public maximizeButton: HTMLElement | null;
    public closeButton: HTMLElement;

    public constructor(menuBar: HTMLElement) {
        this.menuBar = menuBar;
        this.left = this.menuBar.querySelector("#left")!;
        this.right = this.menuBar.querySelector("#left")!;

        // Minimize button
        this.minimizeButton = this.menuBar.querySelector("#minimize");
        this.minimizeButton?.addEventListener("click", e => {
            ipcRenderer.send("request-minimize");
        });

        // Maximize button
        this.maximizeButton = this.menuBar.querySelector("#maximize");
        this.maximizeButton?.addEventListener("click", e => {
            ipcRenderer.send("request-maximize-or-unmaximize");
        });

        // Close button
        this.closeButton = this.menuBar.querySelector("#close")!;
        this.closeButton.addEventListener("click", e => {
            ipcRenderer.send("request-close");
        });
    }
}