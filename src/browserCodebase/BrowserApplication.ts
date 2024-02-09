import { NavigationBar } from "./ui/NavigationBar";

class BrowserApplication {
    private navigationBar: NavigationBar;

    public constructor() {
        this.navigationBar = new NavigationBar(document.querySelector("#navigationBar")!);
        this.navigationBar.left.innerHTML = `
            <div id="logo">Scripting</div>
            <button class="navigation-bar-button" id="file">File</button>
            <button class="navigation-bar-button" id="edit">Edit</button>
            <button class="navigation-bar-button" id="select">Select</button>
            <button class="navigation-bar-button" id="view">View</button>
            <button class="navigation-bar-button" id="help">Help</button>
        `;
    }
}

window.addEventListener("DOMContentLoaded", e => {
    new BrowserApplication;
});