var db = require("../conf/database");

class Comment {

    /**
     * @returns {import("mysql2").OkPacket}
     */
    static async postComment(content, postId, userId) {
        var [rows, _] = await db.execute(`INSERT INTO comments
        (content, fk_post, fk_author) VALUES (?,?,?);`,
            [content, postId, userId]);
        return rows[0];
    }

}

module.exports = Comment;
