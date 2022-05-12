const formComponent = () => {
    const formGroups = [...document.querySelectorAll("[data-form-group]")];

    formGroups.forEach(formGroup => {
        const input = formGroup.querySelector("[data-form-input]");
        console.log(input);

        input.addEventListener("focus", (e) => {
            if (!formGroup.classList.contains("opened")) {
                formGroup.classList.add("opened");
            }
        });
    });
};

module.exports = {
    init: formComponent
}