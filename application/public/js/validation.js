/**
 * @param   {string}    username
 */
function validateUsername(username) {
    const beginsWithAZ = username.match(/^[a-z]/gi);
    const meetsLength = username.length >= 3;
    const isAlphanumeric = username.match(/^[a-z0-9]+/gi);
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
    const containsUppercase = s.match(/[A-Z]/g);
    const containsDigit = s.match(/[0-9]/g);
    const containsSpecials = s.match(/[\/\*\-\+\!\@\#\$\^\&\~\[\]]/g);
    return {
        valid: meetsLength && containsUppercase && containsDigit && containsSpecials,
        meetsLength: meetsLength,
        containsUppercase: containsUppercase,
        containsDigit: containsDigit,
        containsSpecials: containsSpecials
    };
}


