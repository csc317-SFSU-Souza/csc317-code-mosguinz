var db = require("../conf/database");

class Comment {

    /**
     * @returns {import("mysql2").ResultSetHeader}
     */
    static async postComment(content, postId, userId) {
        var [res, _] = await db.execute(`INSERT INTO comments
        (content, fk_post, fk_author) VALUES (?,?,?);`,
            [content, postId, userId]);
        return res;
    }

}

module.exports = Comment;
