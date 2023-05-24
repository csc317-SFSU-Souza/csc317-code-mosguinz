/**
 * This module cannot handle paths with spaces!
 * Added using `app.use()` in app.js instead.
 */
// var ffmpeg = require("ffmpeg-static");

var exec = require("child_process").exec;

module.exports = {

    makeThumbnail: (req, res, next) => {
        const { file } = req;
        if (!file) {
            return next(new Error("Uh oh"));
        }

        try {
            const ext = "png";
            const dest = `public/images/uploads/thumb-${file.filename.split(".")[0]}.${ext}`;
            const cmd = `ffmpeg -ss 00:00:01 -i ${file.path} -y -s 200x200 -vframes 1 -f image2 ${dest}`;
            exec(cmd);
            file.thumbnail = dest;
            next();
        } catch (err) {
            next(err);
        }
    }

}
