export class FormControl {

    constructor(el) {
        this.el = el;
        this.model = JSON.parse(this.el.dataset.formControl);
        this.input;
    }

    init() {
        if (this.model.input === "textarea") {
            this.input = this.el.querySelector("textarea");
        } else {
            this.input = this.el.querySelector("input");
        }
        this.input.addEventListener("focus", e =>  this.showInput());
    }

    showInput() {
        this.el.classList.add("opened");
    }
}