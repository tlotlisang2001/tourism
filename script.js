const form = document.getElementById("registrationForm");

if (!form) {
    console.warn("Registration form not found on this page.");
} else {
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const feedback = document.getElementById("formFeedback");
        if (feedback) {
            feedback.innerHTML = "";
        }

        const fullName = document.getElementById("fullName");
        const email = document.getElementById("email");
        const phone = document.getElementById("phone");
        const gender = document.getElementById("gender");
        const password = document.getElementById("password");
        const confirmPassword = document.getElementById("confirmPassword");

        const validationRules = [
            { id: "fullNameError", value: fullName ? fullName.value.trim() : "", test: value => value.length < 2, message: "Enter your full name." },
            { id: "emailError", value: email ? email.value.trim() : "", test: value => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), message: "Enter a valid email address." },
            { id: "phoneError", value: phone ? phone.value.trim() : "", test: value => !/^[0-9+() -]{8,20}$/.test(value), message: "Enter a valid phone number." },
            { id: "genderError", value: gender ? gender.value : "", test: value => value === "", message: "Please select your gender." },
            { id: "passwordError", value: password ? password.value : "", test: value => value.length < 8, message: "Password must contain at least 8 characters." },
            { id: "confirmError", value: confirmPassword ? confirmPassword.value : "", test: value => value !== (password ? password.value : "") || value === "", message: "Passwords do not match." }
        ];

        let valid = true;

        validationRules.forEach(function(rule) {
            const errorElement = document.getElementById(rule.id);
            if (errorElement) {
                errorElement.textContent = "";
            }

            if (rule.test(rule.value)) {
                if (errorElement) {
                    errorElement.textContent = rule.message;
                }
                valid = false;
            }
        });

        if (valid && feedback) {
            feedback.innerHTML = '<div class="alert alert-success">Registration successful!</div>';
            form.reset();
        }
    });
}