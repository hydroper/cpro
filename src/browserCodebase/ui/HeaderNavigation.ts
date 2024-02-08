const { ipcRenderer } = require("electron");

export class HeaderNavigation {
    private minimizeButton: HTMLElement;
    private maximizeButton: HTMLElement;
    private closeButton: HTMLElement;

    constructor() {
        // Minimize button
        this.minimizeButton = document.querySelector("#navigationBar #minimize")!;
        this.minimizeButton.addEventListener("click", e => {
            ipcRenderer.send("request-minimize");
        });

        // Maximize button
        this.maximizeButton = document.querySelector("#navigationBar #maximize")!;
        this.maximizeButton.addEventListener("click", e => {
            ipcRenderer.send("request-maximize");
        });

        // Close button
        this.closeButton = document.querySelector("#navigationBar #close")!;
        this.closeButton.addEventListener("click", e => {
            ipcRenderer.send("request-close");
        });
    }
}