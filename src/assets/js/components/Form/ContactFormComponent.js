import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "../../../../../config/firebase.config";
import { getFirestore, collection, doc, addDoc } from "firebase/firestore";
import { FormControl } from "./FormControl";

export class ContactFormComponent {

    constructor(el) {
        this.el = el;
        this.app = initializeApp(firebaseConfig);
        this.db = getFirestore(this.app);
        this.analytics = getAnalytics(this.app);
        this.formControls = [...this.el.querySelectorAll("[data-form-control]")];
    }

    init() {
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
        console.log(e);
        const formData = new FormData(this.el);

        var date = new Date;
        const posted = {
            dateObj: date,
            formattedDate: date.toLocaleDateString("dd")
        }

        const newMessage = {
            posted: Date.now(),
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            message: formData.get("message")
        };

        try {
            console.log(newMessage);
            
            const docRef = await addDoc(collection(this.db, "messages"), newMessage);
        } catch (err) {
            console.error("Something went wrong posting mesagge: " + err);
        }
    }
}