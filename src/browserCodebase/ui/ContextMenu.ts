export class ContextMenu {
    private modal: HTMLElement;

    /**
     * @param itemList List containing either `ContextMenuItem` or `ContextMenuSeparator`.
     */
    public constructor(itemList: Object[]) {
        this.modal = document.createElement("div");
        this.modal.ariaModal = "true";
        this.modal.role = "dialog";
        this.modal.className = "context-menu-modal";
        document.body.appendChild(this.modal);

        this.renderItemList(itemList);
    }

    private renderItemList(itemList: Object[]): void {
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