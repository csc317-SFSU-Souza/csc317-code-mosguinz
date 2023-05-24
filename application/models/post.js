var db = require("../conf/database");

class Post {

    static async upload(title, description, path, thumbnail, userId) {
        var [resObject, fields] = await db.execute(`INSERT INTO posts
        (title, description, video, thumbnail, fk_author) VALUE (?,?,?,?,?);`,
            [title, description, path, thumbnail, userId]);
        return resObject;
    }

    static async getPostById(postId) {
        const [rows, _] = await db.execute(
            `SELECT u.username, p.video, p.title, p.description, p.id, p.createdAt
            FROM posts p JOIN users u ON p.fk_author=u.id WHERE p.id=?;`,
            [postId]
        );
        return rows[0];
    }

    static async getComments(postId) {
        const [rows, _] = await db.execute(
            `SELECT u.username, c.content, c.createdAt
            FROM comments c JOIN users u ON c.fk_author=u.id WHERE c.fk_post=?;`,
            [postId]
        );
        return rows;
    }

}

module.exports = Post;

