import { NavigationBar } from "./ui/NavigationBar";
import { ContextMenu, ContextMenuItem, ContextMenuSeparator } from "./ui/ContextMenu";

class BrowserApplication {
    private navigationBar: NavigationBar;

    public constructor() {
        this.navigationBar = new NavigationBar(document.querySelector("#navigationBar")!);
        this.initializeMainWindow();
    }

    private initializeMainWindow(): void {
        this.navigationBar.left.innerHTML = `
            <div id="logo">Scripting</div>
            <button class="navigation-bar-button" id="file">File</button>
            <button class="navigation-bar-button" id="edit">Edit</button>
            <button class="navigation-bar-button" id="select">Select</button>
            <button class="navigation-bar-button" id="view">View</button>
            <button class="navigation-bar-button" id="help">Help</button>
        `;

        const fileButton = this.navigationBar.left.querySelector("#file")!;
        fileButton.addEventListener("mousedown", e => {
            new ContextMenu([
                new ContextMenuItem({
                    id: "newBlank",
                    title: "New blank file",
                    action: () => {},
                }),
                new ContextMenuItem({
                    id: "newProject",
                    title: "New project...",
                    action: () => {},
                }),
            ], fileButton, true);
        });
    }
}

window.addEventListener("DOMContentLoaded", e => {
    new BrowserApplication;
});