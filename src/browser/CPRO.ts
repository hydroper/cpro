import { MenuBar } from "./ui/MenuBar";
import { ContextMenu, ContextMenuItem, ContextMenuSeparator } from "com.hydroper.webcontextmenu";
import { MainWindow } from "./windows/MainWindow";

class CPRO {
    private menuBar: MenuBar;

    public constructor() {
        this.menuBar = new MenuBar(document.querySelector("#menuBar")!);
        new MainWindow(this.menuBar);
    }
}

window.addEventListener("DOMContentLoaded", e => {
    new CPRO;
});