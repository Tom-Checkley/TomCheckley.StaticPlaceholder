export class Modal {
    constructor(el) {
        this.modal = el;
        this.modalCloseButton = el.querySelector("[data-modal-close-button]");
        this.modalMask = el.querySelector("[data-modal-mask]");
    }

    open() {
        this.modal.removeAttribute("hidden");
    }
}