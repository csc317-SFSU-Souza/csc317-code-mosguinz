var express = require('express');
var router = express.Router();

const { isLoggedIn } = require("../middleware/auth");
const { getCommentsForPostById, getPostById } = require("../middleware/posts");

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: "TestTube",
        js: ["index.js"]
    });
});

router.get("/login", (req, res) => {
    res.render("login", {
        title: "Login"
    });
});

router.get("/registration", (req, res) => {
    res.render("registration", {
        title: "Registration",
        js: ["validation.js"]
    });
});

router.get("/postvideo", (req, res) => {
    res.render("postvideo", {
        title: "Post video"
    });
});

router.get("/profile", isLoggedIn, (req, res) => {
    res.render("profile", {
        title: "View profile"
    });
});

router.get("/logout", (req, res, next) => {
    req.session.destroy((err) => {
        if (err) { next(err); }
        return res.redirect("/");
    });
});


router.get("/viewpost/:id(\\d+)", getPostById, getCommentsForPostById, function (req, res) {
    console.log(req.body);
    res.render("viewpost", {
        title: `View Post ${req.params.id}`,
        js: ["viewpost.js"]
    });
});

module.exports = router;
