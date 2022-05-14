import "../scss/main.scss";
import { ContactFormComponent } from "./Components/Form/ContactFormComponent";

const form = document.getElementById("contactForm");
const contactForm = new ContactFormComponent(form);
contactForm.init();

(function() {
    const yearNow = new Date().getFullYear();
    const yearsExp = yearNow - 2013;
    
    const yearsExpHolder = document.querySelector("[data-years-exp");
    if (yearsExpHolder) {
        yearsExpHolder.innerHTML = yearsExp;
    }
}());
