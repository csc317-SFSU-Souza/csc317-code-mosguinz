/**
 * @param   {string}    username
 */
function validateUsername(username) {
    const beginsWithAZ = username.match(/^[a-z]/gi) !== null;
    const meetsLength = username.length >= 3;
    const isAlphanumeric = username.match(/^[a-z0-9]+$/gi) !== null;
    return {
        isValid: beginsWithAZ && meetsLength && isAlphanumeric,
        status: {
            beginsWithAZ: beginsWithAZ,
            meetsLength: meetsLength,
            isAlphanumeric: isAlphanumeric
        }
    };
}

/**
 * @param    {string}    s
 */
function validatePassword(s) {
    const meetsLength = s.length >= 8;
    const containsUppercase = s.match(/[A-Z]/g) !== null;
    const containsDigit = s.match(/[0-9]/g) !== null;
    const containsSpecials = s.match(/[\/\*\-\+\!\@\#\$\^\&\~\[\]]/g) !== null;
    return {
        isValid: meetsLength && containsUppercase && containsDigit && containsSpecials,
        status: {
            meetsLength: meetsLength,
            containsUppercase: containsUppercase,
            containsDigit: containsDigit,
            containsSpecials: containsSpecials
        }
    };
}


document.getElementById("username").addEventListener("input", (e) => {
    /** @type {HTMLInputElement} */
    const target = e.target;
    const { status } = validateUsername(target.value);
    const messages = [];

    if (!status.meetsLength) {
        messages.push("Must be at least 3 characters in length.")
    }
    if (!status.beginsWithAZ) {
        messages.push("Must start with an alphabet (A-Z).")
    }
    if (!status.isAlphanumeric) {
        messages.push("Must be alphanumeric (A-Z and 0-9).")
    }

    target.setCustomValidity(messages.join("\n"));
    target.reportValidity();
});

document.getElementById("email").addEventListener("input", (e) => {
    /** @type {HTMLInputElement} */
    const target = e.target;
    target.reportValidity();
});

document.getElementById("password").addEventListener("input", (e) => {
    /** @type {HTMLInputElement} */
    const target = e.target;
    const { status } = validatePassword(target.value);
    const messages = [];

    if (!status.meetsLength) {
        messages.push("Must be 8 characters or longer.");
    }
    if (!status.containsUppercase) {
        messages.push("Must contain at least one uppercase character.");
    }
    if (!status.containsDigit) {
        messages.push("Must contain at least one digit.");
    }
    if (!status.containsSpecials) {
        messages.push("Must contain at least one of the following characters: / * - + ! @ # $ ^ & ~ [ ].");
    }

    target.setCustomValidity(messages.join("\n"));
    target.reportValidity();
});

document.getElementById("confirm-password").addEventListener("input", (e) => {
    /** @type {HTMLInputElement} */
    const target = e.target;
    const original = document.getElementById("password").value;
    if (!validatePassword(original).isValid) {
        target.setCustomValidity("Your chosen password is invalid.");
        target.reportValidity();
        return;
    }
    if (target.value !== original) {
        target.setCustomValidity("Passwords must match.");
        target.reportValidity();
    } else {
        target.setCustomValidity("");
    }
});

document.getElementById("registration-form").addEventListener("submit", (e) => {
    /** @type {HTMLFormElement} */
    const target = e.target;
    if (target.reportValidity()) {
        window.alert("Client-side validation passed. Registration form was submitted.");
    }
});
