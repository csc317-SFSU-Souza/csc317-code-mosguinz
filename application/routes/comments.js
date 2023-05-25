var express = require("express");
var router = express.Router();
var { isLoggedIn } = require("../middleware/auth");

const Comment = require("../models/comment");

/**
 * Create a comment.
 * Expects exactly two values in the request body: `postId` and `content`.
 */
router.post("/create", isLoggedIn, async (req, res, next) => {
    const { userId, username } = req.session.user;
    const { postId, content } = req.body;

    try {
        const resObject = await Comment.postComment(comment, postId, userId);
        if (resObject && resObject.affectedRows == 1) {
            return res.status(201).json({
                commentId: resObject.insertId,
                username: username,
                content: content
            });
        }
        return res.json({
            message: "Failed to post comment"
        });
    } catch (err) {
        return next(err);
    }
});

