export class FormControl {

    constructor(el) {
        this.formControl = el;
        this.model = JSON.parse(this.formControl.dataset.formControl);
        this.input;
        this.validationErrorMessage = "";
        this.inputValidationMessageEl = this.formControl.querySelector("[data-input-validation-message]");
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

    hideInput() {
        this.formControl.classList.remove("opened");
    }

    isValid() {
        
        let isValid = true;
        this.validationErrorMessage = "";
        const val = this.input.value.trim();

        isValid = this.isValidRequired(val);

        switch (this.model.type) {
            case "email":
                isValid = this.isValidEmail(val);
                break;
            case "phone":
                isValid = this.isValidPhoneNumber(val);
                break;
            default:
                break;
        }

        if (!isValid) {
            this.inputValidationMessageEl.innerHTML = this.validationErrorMessage;
            this.formControl.classList.add("invalid");
            this.inputValidationMessageEl.removeAttribute("hidden");
            this.formControl.classList.add("opened");
        } else {
            this.formControl.classList.remove("invalid");
            this.inputValidationMessageEl.innerHtml = "";
            this.inputValidationMessageEl.setAttribute("hidden", "hidden");
        }

        return isValid;
    }

    isRequired() {
        return this.input.hasAttribute("required");
    }

    isValidRequired(val) {
        if (!val && this.isRequired()) {
            const label = this.formControl.querySelector(".label__text");
            console.log(label);
            
            this.validationErrorMessage += `<span>The ${label.innerText} field is required.</span>`;
            return false;
        }
        return true;
    }

    isValidEmail(val) {
        const validEmailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!val.match(validEmailRegEx)) {
            this.validationErrorMessage += `<span>Please enter a valid email address.</span>`;
            return false;
        }
        return true;
    }
    isValidPhoneNumber(val) {
        const validUKPhoneNumberRegex = /^(?:0|\+?44)(?:\d\s?){9,10}$/;
        if (!this.isRequired() && !val) {
            return true;
        }
        if (!val.match(validUKPhoneNumberRegex)) {
            this.validationErrorMessage += `<span>Please enter a valid phone number. If you're outside the UK please leave blank.</span>`;
            return false;
        }
        return true;
    }
}