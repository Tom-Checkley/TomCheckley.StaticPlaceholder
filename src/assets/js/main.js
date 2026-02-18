import "../scss/main.scss";
import { ContactFormComponent } from "./Components/Form/ContactFormComponent";
import { config } from "../../../config/site-config";

const firebaseApp = initializeApp(config.firebase);
const analytics = getAnalytics(firebaseApp);

const form = document.getElementById("contactForm");
const contactForm = new ContactFormComponent(form, firebaseApp);
contactForm.init();

(function() {
    const yearNow = new Date().getFullYear();
    const yearsExp = yearNow - 2013;
    
    const yearsExpHolder = document.querySelector("[data-years-exp");
    if (yearsExpHolder) {
        yearsExpHolder.innerHTML = yearsExp;
    }
}());
