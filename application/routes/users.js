var express = require('express');
var router = express.Router();
var db = require("../conf/database");
var bcrypt = require("bcrypt");

const User = require("../models/user");

router.post("/login", async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.redirect("/login");
    }

    var [rows, fields] = await db.execute(
        `SELECT id, username, password, email FROM users WHERE username=?;`,
        [username]
    );

    const user = rows[0];
    if (!user) {
        req.flash("error", "Log in failed");
        return res.redirect("/login");
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
        req.session.user = {
            userId: user.id,
            email: user.email,
            username: user.username
        };
        return res.redirect("/");
    }
    return res.redirect("/login");
});


router.post("/logout", (req, res, next) => {
    req.session.destroy((err) => {
        if (err) { next(err); }
        return res.redirect("/");
    });
});


router.post("/register", async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const resObject = await User.register(username, email, password);

        // send client resp
        if (resObject && resObject.affectedRows) {
            return res.redirect("/login");
        } else {
            return res.redirect("/registration");
        }
    } catch (err) {
        req.flash("error", String(err));
        req.session.save((err) => {
            return res.redirect("/registration");
        });
    }
});

module.exports = router;
