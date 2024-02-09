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
                    title: "New blank file",
                    action: () => {},
                }),
                new ContextMenuItem({
                    title: "New project...",
                    action: () => {},
                }),
                new ContextMenuItem({
                    title: "Temporary",
                    list: [
                        new ContextMenuItem({
                            title: "X",
                            action: () => {},
                        }),
                        new ContextMenuItem({
                            title: "Y",
                            list: [
                                new ContextMenuItem({
                                    title: "XY",
                                    action: () => {},
                                }),
                            ],
                        }),
                    ],
                }),
                new ContextMenuItem({
                    title: "Temporary (2)",
                    list: [
                        new ContextMenuItem({
                            title: "X (2)",
                            action: () => {},
                        }),
                        new ContextMenuItem({
                            title: "Y (2)",
                            list: [
                                new ContextMenuItem({
                                    title: "XY (2)",
                                    action: () => {},
                                }),
                            ],
                        }),
                    ],
                }),
            ], fileButton, true);
        });
    }
}

window.addEventListener("DOMContentLoaded", e => {
    new BrowserApplication;
});