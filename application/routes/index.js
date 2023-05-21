var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'CSC 317 App', name: "Mos Kullathon" });
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/registration", (req, res) => {
    res.render("registration");
});

router.get("/postvideo", (req, res) => {
    res.render("postvideo");
});

router.get("/profile", (req, res) => {
    res.render("profile");
});

router.get("/viewpost/:id", (req, res) => {
    res.render("viewpost");
});

module.exports = router;
