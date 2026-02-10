function isValidEmail(stringToTest) {
    const emailRegex =
        /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_'+\-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i;
    return emailRegex.test(stringToTest);
}

const form = document.querySelector("#contact-form");

if (form) {
    form.addEventListener("submit", (event) => {
        clearErrors(form);

        const emailInput = form.querySelector("#email");
        const messageInput = form.querySelector("#message");
        const moodInputs = Array.from(form.querySelectorAll('input[name="mood"]'));

        let firstInvalid = null;
        let hasErrors = false;

        if (!emailInput || !isValidEmail(emailInput.value.trim())) {
            const error = createError("email-error", "Please enter a valid email address.");
            attachError(emailInput, error);
            firstInvalid = firstInvalid || emailInput;
            hasErrors = true;
        }

        const anyMoodChecked = moodInputs.some((input) => input.checked);
        if (!anyMoodChecked) {
            const fieldset = form.querySelector("fieldset");
            const error = createError("mood-error", "Please select at least one option.");
            if (fieldset) {
                fieldset.append(error);
            }
            moodInputs.forEach((input) => {
                input.setAttribute("aria-invalid", "true");
                input.setAttribute("aria-describedby", "mood-error");
            });
            firstInvalid = firstInvalid || moodInputs[0];
            hasErrors = true;
        }

        if (!messageInput || messageInput.value.trim() === "") {
            const error = createError("message-error", "Please enter a message.");
            attachError(messageInput, error);
            firstInvalid = firstInvalid || messageInput;
            hasErrors = true;
        }

        if (hasErrors) {
            event.preventDefault();
            firstInvalid?.focus();
        }
    });
}

if (form) {
    const moodInputs = Array.from(form.querySelectorAll('input[name="mood"]'));
    moodInputs.forEach((input) => {
        input.addEventListener("change", () => {
            if (!input.checked) {
                return;
            }
            moodInputs.forEach((other) => {
                if (other !== input) {
                    other.checked = false;
                }
            });
        });
    });
}

function createError(id, message) {
    const error = document.createElement("p");
    error.className = "form-error";
    error.id = id;
    error.textContent = message;
    return error;
}

function attachError(input, errorElement) {
    if (!input) {
        return;
    }
    input.setAttribute("aria-invalid", "true");
    input.setAttribute("aria-describedby", errorElement.id);
    input.insertAdjacentElement("afterend", errorElement);
}

function clearErrors(formElement) {
    const errors = formElement.querySelectorAll(".form-error");
    errors.forEach((error) => error.remove());

    const invalidFields = formElement.querySelectorAll("[aria-invalid]");
    invalidFields.forEach((field) => {
        field.removeAttribute("aria-invalid");
        field.removeAttribute("aria-describedby");
    });
}
