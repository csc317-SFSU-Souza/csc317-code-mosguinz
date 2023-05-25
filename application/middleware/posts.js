/**
 * This module cannot handle paths with spaces!
 * Added using `app.use()` in app.js instead.
 */
// var ffmpeg = require("ffmpeg-static");

var exec = require("child_process").exec;
const Post = require("../models/post");

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
    },

    getPostById: async function (req, res, next) {
        try {
            const post = await Post.getPostById(req.params.id);
            if (!post) {
                req.flash("error", "Could not find post");
                return res.redirect(`/`);
            } else {
                res.locals.currentPost = post;
                next();
            }
        } catch (error) {
            next(error);
        }
    },

    getCommentsForPostById: async function (req, res, next) {
        try {
            rows = await Post.getComments(req.params.id);
            res.locals.currentPost.comments = rows;
            next();
        } catch (error) {
            next(error);
        }
    },

    getRecentPosts: async function (req, res, next) {
        try {
            const posts = await Post.getRecentPosts(10);
            res.locals.posts = posts;
            next();
        } catch (err) {
            next(err);
        }
    }

}
