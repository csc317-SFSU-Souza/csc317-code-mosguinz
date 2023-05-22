var express = require('express');
var router = express.Router();
var db = require("../conf/database");
var bcrypt = require("bcrypt");

router.post("/register", async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        var [rows, fields] = await db.execute(`SELECT id FROM users WHERE username=?;`, [username]);
        if (rows && rows.length) {
            return res.redirect("/registration");
        }
        var [rows, fields] = await db.execute(`SELECT id FROM users WHERE email=?;`, [email]);
        if (rows && rows.length) {
            return res.redirect("/registration");
        }

        const hashedPassword = await bcrypt.hash(password, 3);
        var [resObject, fields] = db.execute(`INSERT INTO users
        (username, email, password) value (?, ?, ?)`, [username, email, hashedPassword]);

        // send client resp
        if (resObject && resObject.affectedRows) {
            return res.redirect("/login");
        } else {
            return res.redirect("/registration");
        }
    } catch (err) {
        next(err);
    }
    res.end();
});

module.exports = router;
