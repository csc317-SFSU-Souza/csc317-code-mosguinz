/**
 * @param   {string}    username
 */
function validateUsername(username) {
    const beginsWithAZ = username.match(/^[a-z]/gi) !== null;
    const meetsLength = username.length >= 3;
    const isAlphanumeric = username.match(/^[a-z0-9]+/gi) !== null;
    return {
        valid: beginsWithAZ && meetsLength && isAlphanumeric,
        beginsWithAZ: beginsWithAZ,
        meetsLength: meetsLength,
        isAlphanumeric: isAlphanumeric
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
        valid: meetsLength && containsUppercase && containsDigit && containsSpecials,
        meetsLength: meetsLength,
        containsUppercase: containsUppercase,
        containsDigit: containsDigit,
        containsSpecials: containsSpecials
    };
}


document.getElementById("username").addEventListener("input", (e) => {
    /** @type {HTMLInputElement} */
    const target = e.target;
    console.log(validateUsername(target.value));
});

