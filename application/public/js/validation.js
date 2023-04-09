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
