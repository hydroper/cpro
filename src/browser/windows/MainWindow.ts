import { MenuBar } from "../ui/MenuBar";
import { ContextMenu, ContextMenuItem, ContextMenuSeparator } from "com.hydroper.webcontextmenu";

export class MainWindow {
    private menuBar: MenuBar;

    public constructor(menuBar: MenuBar) {
        this.menuBar = menuBar;
        this.initialize();
    }

    private initialize(): void {
        this.menuBar.left.innerHTML = `
            <div id="logo">CPRO</div>
            <button class="menu-bar-button" id="file">File</button>
            <button class="menu-bar-button" id="edit">Edit</button>
            <button class="menu-bar-button" id="select">Select</button>
            <button class="menu-bar-button" id="view">View</button>
            <button class="menu-bar-button" id="help">Help</button>
        `;

        const fileButton = this.menuBar.left.querySelector("#file")!;
        fileButton.addEventListener("mousedown", e => {
            new ContextMenu({
                menuBar: this.menuBar.menuBar,
                items: [
                    new ContextMenuItem({
                        title: "New blank file",
                        action: () => {
                            alert("New blank file");
                        },
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
                ],
                below: fileButton,
            });
        });
    }
}