const form = document.querySelector("form");
const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const mobile = document.querySelector("#mobile");
const email = document.querySelector("#email");
const city = document.querySelector("#city");
const state = document.querySelector("#state");
const password = document.querySelector("#password");
const retypePassword = document.querySelector("#retype-password");

// Validation message elements
const firstNameMessage = document.querySelector("#first-name-message");
const lastNameMessage = document.querySelector("#last-name-message");
const mobileMessage = document.querySelector("#mobile-message");
const emailMessage = document.querySelector("#email-message");
const cityMessage = document.querySelector("#city-message");
const stateMessage = document.querySelector("#state-message");
const passwordMessage = document.querySelector("#password-message");
const retypePasswordMessage = document.querySelector("#retype-password-message");


const stateAbbreviations = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

const nameRegex = /^[a-zA-Z']{3,8}$/;
const mobileRegex = /^\d{3}-\d{3}-\d{4}$/;
const emailRegex = /^[a-zA-Z][\w-'.]*@[a-zA-Z]+(\.[a-zA-Z]+){1,2}$/;
const passwordRegex = /^[a-zA-Z][a-zA-Z0-9]{5,}$/;

function validateName(name) {
    return nameRegex.test(name);
}

function validateMobile(number) {
    return mobileRegex.test(number);
}

function validateState(state) {
    return stateAbbreviations.includes(state);
}

function validateEmail(email) {
    return emailRegex.test(email);
}

function validatePassword(password) {
    return passwordRegex.test(password);
}

function validatePasswordsMatch(password, confirmPassword) {
    return password === confirmPassword;
}

// Helper function to display validation messages
function displayValidationMessage(element, isValid, message) {
    if (isValid) {
        element.textContent = "Correct";
        element.style.color = "green";
    } else {
        element.textContent = message;
        element.style.color = "red";
    }
}

// Input event listeners for each field
firstName.addEventListener("input", () => {
    displayValidationMessage(firstNameMessage, validateName(firstName.value), "Error: Invalid first name. Enter 3-8 characters.");
});

lastName.addEventListener("input", () => {
    displayValidationMessage(lastNameMessage, validateName(lastName.value), "Error: Invalid last name. Enter 3-8 characters.");
});

mobile.addEventListener("input", () => {
    displayValidationMessage(mobileMessage, validateMobile(mobile.value), "Error: Invalid mobile number. Format should be xxx-xxx-xxxx.");
});

email.addEventListener("input", () => {
    displayValidationMessage(emailMessage, validateEmail(email.value), "Error: Invalid email.");
});

state.addEventListener("input", () => {
    displayValidationMessage(stateMessage, validateState(state.value), "Error: Invalid state abbreviation. Enter only two characters");
});

password.addEventListener("input", () => {
    displayValidationMessage(passwordMessage, validatePassword(password.value), "Error: Invalid password. At least 6 characters. Include lowercase, uppercase, and digits.");
});

retypePassword.addEventListener("input", () => {
    displayValidationMessage(retypePasswordMessage, validatePasswordsMatch(password.value, retypePassword.value), "Error: Passwords don't match.");
});


// Form submit event listener
form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Check if all validations pass
    if (
        validateName(firstName.value) &&
        validateName(lastName.value) &&
        validateMobile(mobile.value) &&
        validateState(state.value) &&
        validateEmail(email.value) &&
        validatePassword(password.value) &&
        validatePasswordsMatch(password.value, retypePassword.value)
    ) {

        $.post("form.php", $("#form").serialize())
            .done(function (data) {
                alert(data);
            });
    } else {
        alert("Please fix the errors in the form.");
    }
});
