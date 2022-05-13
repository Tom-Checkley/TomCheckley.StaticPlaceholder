import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { config } from "../../../../../config/site-config";

import { getFirestore, collection, doc, addDoc } from "firebase/firestore";
import { FormControl } from "./FormControl";

export class ContactFormComponent {

    constructor(el) {
        this.el = el;
        this.app = initializeApp(config.firebase);
        this.db = getFirestore(this.app);
        this.analytics = getAnalytics(this.app);
        this.formControls = [...this.el.querySelectorAll("[data-form-control]")];
    }

    init() {
        // this.addRecaptcha();

        this.formControls.forEach(el => {
            const formControl = new FormControl(el);
            formControl.init();
            this.formControls.push(formControl);
        });

        this.el.addEventListener("submit", (e) => {
            this.submit(e);
        })
    }

    async submit(e) {
        e.preventDefault();

        const formData = new FormData(this.el);

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
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            message: formData.get("message")
        };

        try {            
            const docRef = await addDoc(collection(this.db, "messages"), newMessage)
                .then(res => {                
                    this.el.reset();
                    this.formControls.forEach(formControl => formControl.classList.remove("opened"));
                });

        } catch (err) {
            console.error("Something went wrong posting message: " + err);
        }
    }
}