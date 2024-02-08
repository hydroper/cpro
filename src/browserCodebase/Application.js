import { HeaderNavigation } from "./ui/HeaderNavigation.js";

class Application {
    constructor() {
        this.HeaderNavigation = new HeaderNavigation;
    }
}

window.addEventListener("DOMContentLoaded", e => {
    new Application;
});