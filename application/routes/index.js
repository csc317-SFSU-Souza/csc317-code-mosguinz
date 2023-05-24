var express = require('express');
var router = express.Router();

const { isLoggedIn } = require("../middleware/auth");

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

router.get("/viewpost/:id", (req, res) => {
    res.render("viewpost", {
        title: "View post"
    });
});

module.exports = router;
