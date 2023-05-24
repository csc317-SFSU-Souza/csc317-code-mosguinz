var express = require("express");
var router = express.Router();
var multer = require("multer");
var db = require("../conf/database");

const { isLoggedIn } = require("../middleware/auth");
const { makeThumbnail } = require("../middleware/posts");

const Post = require("../models/post");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/videos/uploads");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        const suffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `${file.fieldname}-${suffix}.${ext}`);
    }
});


const upload = multer({ storage: storage });

router.post("/create", isLoggedIn, upload.single("videoFile"), makeThumbnail,
    async (req, res, next) => {
        const { path, thumbnail } = req.file;
        const { videoTitle, videoDescription } = req.body;
        const { userId } = req.session.user;

        console.log(videoTitle, videoDescription, path, thumbnail, userId)
        try {
            const result = await Post.upload(videoTitle, videoDescription, path, thumbnail, userId);
            req.flash("error", "Your post was uploaded");
            return req.session.save((err) => {
                if (err) { next(err); }
                return res.redirect("/");
            });
        } catch (err) {
            next(new Error("Your post could not be created. Please try again."));
        }
    });

module.exports = router;
