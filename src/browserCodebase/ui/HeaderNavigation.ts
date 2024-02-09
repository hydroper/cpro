const { ipcRenderer } = require("electron");

export class HeaderNavigation {
    private navigationBar: HTMLElement;
    private minimizeButton: HTMLElement | null;
    private maximizeButton: HTMLElement | null;
    private closeButton: HTMLElement;

    public constructor(navigationBar: HTMLElement) {
        this.navigationBar = navigationBar;

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