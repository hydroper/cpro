const { ipcRenderer } = require("electron");

export class NavigationBar {
    public navigationBar: HTMLElement;
    public left: HTMLElement;
    public right: HTMLElement;
    public minimizeButton: HTMLElement | null;
    public maximizeButton: HTMLElement | null;
    public closeButton: HTMLElement;

    public constructor(navigationBar: HTMLElement) {
        this.navigationBar = navigationBar;
        this.left = this.navigationBar.querySelector("#left")!;
        this.right = this.navigationBar.querySelector("#left")!;

        // Minimize button
        this.minimizeButton = this.navigationBar.querySelector("#minimize");
        this.minimizeButton?.addEventListener("click", e => {
            ipcRenderer.send("request-minimize");
        });

        // Maximize button
        this.maximizeButton = this.navigationBar.querySelector("#maximize");
        this.maximizeButton?.addEventListener("click", e => {
            ipcRenderer.send("request-maximize-or-unmaximize");
        });

        // Close button
        this.closeButton = this.navigationBar.querySelector("#close")!;
        this.closeButton.addEventListener("click", e => {
            ipcRenderer.send("request-close");
        });
    }
}