export class FormControl {

    constructor(el) {
        this.formControl = el;
        this.model = JSON.parse(this.formControl.dataset.formControl);
        this.input;
    }

    init() {
        if (this.model.input === "textarea") {
            this.input = this.formControl.querySelector("textarea");
        } else {
            this.input = this.formControl.querySelector("input");
        }
        this.input.addEventListener("focus", e =>  this.showInput());
    }

    showInput() {
        this.formControl.classList.add("opened");
    }
}