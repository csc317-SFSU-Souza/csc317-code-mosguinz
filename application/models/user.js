var db = require("../conf/database");
var bcrypt = require("bcrypt");

class User {

    /**
     * @param   {number}    id
     * @param   {String}    username
     * @param   {String}    email
     */
    constructor(id, username, email) {
        this.id = id;
        this.username = username;
        this.email = email;
    }

    /**
     * @param   {String}    username
     * @param   {String}    email
     * @param   {String}    password
     */
    static async register(username, email, password) {
        if (await User.usernameExists(username)) {
            throw new Error("Account with this username already exists.")
        }
        if (await User.emailExists(email)) {
            throw new Error("Account with the email already exists.");
        }

        const hashedPassword = await bcrypt.hash(password, 3);
        var [resObject, fields] = await db.execute(`INSERT INTO users
        (username, email, password) value (?, ?, ?)`, [username, email, hashedPassword]);
        return resObject;
    }

    /**
     * @param   {String}    username
     * @returns {boolean}
     */
    static async usernameExists(username) {
        var [rows, fields] = await db.execute(`SELECT id FROM users WHERE username=?;`, [username]);
        return rows && rows.length;
    }

    /**
     * @param   {String}    email
     * @returns {boolean}
     */
    static async emailExists(email) {
        var [rows, fields] = await db.execute(`SELECT id FROM users WHERE email=?;`, [email]);
        return rows && rows.length;
    }

}

module.exports = User;
