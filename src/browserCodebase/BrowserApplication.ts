import { HeaderNavigation } from "./ui/HeaderNavigation";

class BrowserApplication {
    private headerNavigation: HeaderNavigation;

    public constructor() {
        this.headerNavigation = new HeaderNavigation(document.querySelector("#navigationBar")!);
    }
}

window.addEventListener("DOMContentLoaded", e => {
    new BrowserApplication;
});