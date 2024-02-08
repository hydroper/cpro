const { app: application } = require("electron");

export class HeaderNavigation {
    constructor() {
        // Close button
        this.closeButton = document.querySelector("#navigationBar #close");
        this.closeButton.addEventListener("click", e => {
            application.quit();
        });
    }
}