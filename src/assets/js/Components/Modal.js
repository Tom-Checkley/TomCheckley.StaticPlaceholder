export class Modal {
    constructor(el) {
        this.modal = el;
        this.modalCloseButton = el.querySelector("[data-modal-close-button]");
    }

    init() {
        const modalCloseButton = this.modal.querySelector("[data-modal-close-button]");
        modalCloseButton.addEventListener("click", e => this.close());

        const modalMask = this.modal.querySelector("[data-modal-mask]");
        modalMask.addEventListener("click", e => this.close());
    }

    open() {
        this.modal.removeAttribute("hidden");
        this.modal.focus();
    }

    close() {
        this.modal.setAttribute("hidden", "hidden");
    }
}