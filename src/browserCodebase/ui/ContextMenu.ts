import { Input } from "../input";

export class ContextMenu {
    private modal: HTMLElement;
    private readonly openLists: HTMLElement[] = [];
    private handleEscapeKey: Function;
    private handlePressedInput: Function;
    private handleWindowMouseDown: Function;

    /**
     * @param itemList List containing either `ContextMenuItem` or `ContextMenuSeparator`.
     * @param position Either an `HTMLElement`, `MouseEvent` or `Array`. If it is specified
     * as an `Array` object, it is a `[Number, Number]` tuple, `[x, y]` respectively.
     */
    public constructor(itemList: Object[], position: Object, bottomPosition: boolean) {
        this.modal = document.createElement("div");
        this.modal.ariaModal = "true";
        this.modal.role = "dialog";
        this.modal.className = "context-menu-modal";
        this.modal.addEventListener("mousedown", e => {
            this.destroy();
        });
        this.modal.addEventListener("mouseleave", e => {
            window.addEventListener("mousedown", this.handleWindowMouseDown as any);
        });
        this.modal.addEventListener("mouseenter", e => {
            window.removeEventListener("mousedown", this.handleWindowMouseDown as any);
        });
        document.body.appendChild(this.modal);

        const headerNavigationBar = document.querySelector("header > #navigationBar")!;
        const r = headerNavigationBar.getBoundingClientRect();
        this.modal.style.top = `${r.y + r.height}px`;

        this.handleEscapeKey = (evt: KeyboardEvent): void => {
            if (evt.key == "Escape") {
                this.escape();
            }
        };

        this.handlePressedInput = (evt: Event): void => {
            this.arrowNavigation();
        };

        this.handleWindowMouseDown = (evt: Event): void => {
            this.destroy();
        };

        this.renderItemList(itemList, position, bottomPosition);

        window.addEventListener("keydown", this.handleEscapeKey as any);
        Input.input.addEventListener("inputPressed", this.handlePressedInput as any);
    }

    private renderItemList(itemList: Object[], position: Object, bottomPosition: boolean): HTMLElement {
        const renderedList = document.createElement("div");
        renderedList.className = "context-menu";
        renderedList.addEventListener("mousedown", e => {
            e.preventDefault();
        });
        this.modal.appendChild(renderedList);
        this.openLists.push(renderedList);

        // Render items
        for (const item of itemList) {
            renderedList.appendChild(this.renderItem(item, this.openLists.length));
        }

        const renderedRect = renderedList.getBoundingClientRect();

        // Position
        let finalX = 0;
        let finalY = 0;
        if (position instanceof HTMLElement) {
            const positionRect = position.getBoundingClientRect();
            if (bottomPosition) {
                finalX = positionRect.x;
                finalY = positionRect.y + positionRect.height;
            } else {
                finalX = positionRect.x + positionRect.width;
                finalX = finalX > window.innerWidth ? positionRect.x - renderedRect.width : finalX;
                finalY = positionRect.y;
            }
        } else if (position instanceof MouseEvent) {
            finalX = position.clientX;
            finalY = position.clientY;
        } else if (position instanceof Array) {
            finalX = position[0];
            finalY = position[1];
        } else {
            throw new Error("Unrecognized position argument");
        }
        finalX = finalX > window.innerWidth ? window.innerWidth - renderedRect.width : finalX;
        finalY = finalY > window.innerHeight ? window.innerHeight - renderedRect.height : finalY;
        renderedList.style.left = finalX + "px";
        renderedList.style.top = finalY + "px";
        return renderedList;
    }

    private renderItem(item: Object, openListsLengthUntilParentList: number): HTMLElement {
        if (item instanceof ContextMenuItem) {
            const renderedItem = document.createElement("button");
            const listCharacter = item.list != null ? "&gt;" : "";
            renderedItem.innerHTML = `<ul><span class="title">${item.title}</span><span><span class="shortcut"></span><span class="list">${listCharacter}</span></span></ul>`;
            renderedItem.addEventListener("mouseover", e => {
                renderedItem.focus();
            });
            if (item.list != null) {
                renderedItem.addEventListener("focus", e => {
                    for (let list of this.openLists.slice(openListsLengthUntilParentList)) {
                        list.remove();
                    }
                    this.openLists.length = openListsLengthUntilParentList;
                    let blurTimeout: any = undefined;
                    const subrenderedList = this.renderItemList(item.list!, this.openLists[this.openLists.length - 1], false);
                    subrenderedList.addEventListener("mouseleave", e => {
                        if (blurTimeout !== undefined) {
                            clearTimeout(blurTimeout);
                        }
                        blurTimeout = setTimeout(() => {
                            if (subrenderedList.parentElement != null) {
                                this.escape();
                            }
                        }, 1_000);
                    });
                    subrenderedList.addEventListener("mouseenter", e => {
                        if (blurTimeout !== undefined) {
                            clearTimeout(blurTimeout);
                        }
                    });
                });
            }
            renderedItem.addEventListener("click", e => {
                this.destroy();
                item.action?.();
            });
            return renderedItem;
        } else if (item instanceof ContextMenuSeparator) {
            const renderedItem = document.createElement("div");
            renderedItem.className = "context-menu-separator";
            return renderedItem;
        } else {
            throw new Error("Unmatched item");
        }
    }

    private destroy(): void {
        if (this.modal.parentElement == null) {
            return;
        }
        this.modal.remove();
        window.removeEventListener("mousedown", this.handleWindowMouseDown as any);
        window.removeEventListener("keydown", this.handleEscapeKey as any);
        Input.input.removeEventListener("inputPressed", this.handlePressedInput as any);
    }

    private escape(): void {
        this.openLists.pop();
        if (this.openLists.length == 0) {
            this.destroy();
        }
    }

    private arrowNavigation(): void {
        if (Input.input.isPressed("uiLeft")) {
            //
        } else if (Input.input.isPressed("uiRight")) {
            //
        } else if (Input.input.isPressed("uiUp")) {
            //
        } else if (Input.input.isPressed("uiDown")) {
            //
        }
    }
}

export class ContextMenuSeparator {}

export class ContextMenuItem {
    public id: string;
    public title: string;
    public action: (() => void) | null;
    public list: Object[] | null;
    public shortcutAction: string | null;

    public constructor(options: ContextMenuItemOptions) {
        this.id = options.id;
        this.title = options.title;
        this.action = options.action || null;
        this.list = options.list || null;
        this.shortcutAction = options.shortcutAction || null;
    }
}

export type ContextMenuItemOptions = {
    id: string,
    title: string,
    action?: () => void,
    list?: Object[],
    shortcutAction?: string,
};