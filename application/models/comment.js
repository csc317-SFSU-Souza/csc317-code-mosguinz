var db = require("../conf/database");

class Comment {

    static async postComment(content, postId, userId) {
        var [rows, _] = await db.execute(`INSERT INTO comments
        (content, fk_post, fk_author) VALUE ?,?,?;`,
            [content, postId, userId]);
        return rows[0];
    }

}

module.exports = Comment;
