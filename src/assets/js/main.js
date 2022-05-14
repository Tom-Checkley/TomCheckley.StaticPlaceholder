import "../scss/main.scss";
import { ContactFormComponent } from "./Components/Form/ContactFormComponent";

const form = document.getElementById("contactForm");
const contactForm = new ContactFormComponent(form);
contactForm.init();
