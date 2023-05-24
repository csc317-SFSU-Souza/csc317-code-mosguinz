var express = require("express");
var router = express.Router();
var multer = require("multer");

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

router.post("/create", upload.single("video-file"), (req, res, next) => {
    console.log(req.file);
    console.log(req.body);
    res.end();
});

module.exports = router;
