import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore/lite";
import { config } from "../../../../../config/site-config";
import { Modal } from "../Modal";
import { FormControl } from "./FormControl";

export class ContactFormComponent {

    constructor(el) {
        this.contactForm = el;
        this.app = initializeApp(config.firebase);
        this.db = getFirestore(this.app);        
        this.formControls = []
    }

    init() {
        // this.addRecaptcha();
        const formControlElements = [...this.contactForm.querySelectorAll("[data-form-control]")];
        formControlElements.forEach(el => {
            const formControl = new FormControl(el);
            formControl.init();
            this.formControls.push(formControl);
        });

        this.contactForm.addEventListener("submit", (e) => {
            this.submit(e);
        })

        const modalEl = this.contactForm.querySelector("[data-modal]");
        if (modalEl) {
            this.modal = new Modal(modalEl);
            this.modal.init();
        }
    }

    async submit(e) {
        e.preventDefault();

        const formData = new FormData(this.contactForm);

        const date = new Date();
        const posted = {
            dateObj: date,
            formattedDate: date.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            })
        }

        const newMessage = {
            posted: posted,
            name: formData.get("name").trim(),
            email: formData.get("email").trim(),
            phone: formData.get("phone").trim(),
            message: formData.get("message").trim()
        };

        let isFormValid = true;

        this.formControls.forEach(formControl => {
            const isValid = formControl.isValid();

            if (!isValid) {
                isFormValid = false;
            }
        })

        if (isFormValid) {
            try {            
                const docRef = await addDoc(collection(this.db, "messages"), newMessage)
                    .then(res => {                
                        this.contactForm.reset();
                        
                        this.formControls.forEach(formControl => {                        
                            formControl.hideInput();
                        });
    
                        if (this.modal) {
                            this.modal.open();
                        }
    
                    });
    
            } catch (err) {
                console.error("Something went wrong posting message: " + err);
            }
        }
    }
}