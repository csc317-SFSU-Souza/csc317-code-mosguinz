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
            `SELECT u.username, p.video, p.title, p.description, p.id, p.createdAt, p.fk_author AS author
            FROM posts p JOIN users u ON p.fk_author=u.id WHERE p.id=?;`,
            [postId]
        );
        return rows[0];
    }

    static async getPostsByUser(userId) {
        const [rows, _] = await db.execute(
            `SELECT * FROM posts WHERE fk_author=? ORDER BY createdAt DESC;`,
            [userId]
        );
        return rows;
    }

    static async getComments(postId) {
        const [rows, _] = await db.execute(
            `SELECT u.username, c.content, c.createdAt
            FROM comments c JOIN users u ON c.fk_author=u.id WHERE c.fk_post=?;`,
            [postId]
        );
        return rows;
    }

    static async getRecentPosts(limit = 10) {
        const [rows, _] = await db.execute(
            `SELECT p.*, u.username
            FROM posts p
            JOIN users u
            ON p.fk_author=u.id
            ORDER BY p.createdAt DESC LIMIT ?;`,
            [`${limit}`]
        );
        return rows;
    }

    static async search(query) {
        const [rows, _] = await db.execute(
            `SELECT p.*, u.username,
            concat_ws(" ", p.title, p.description) AS haystack
            FROM posts p
            JOIN users u
            ON p.fk_author=u.id
            HAVING haystack like ?`,
            [`%${query}%`]
        );
        return rows;
    }

    static async deletePost(postId, userId) {
        const post = await Post.getPostById(postId);
        console.log("postid", postId)
        console.log(post)
        if (!post || post.author !== userId) {
            throw new Error("You do not have permission to perform this action.");
        }
        var [rows, _] = await db.execute(
            `DELETE FROM comments WHERE fk_post=?`,
            [postId]
        );
        var [rows, _] = await db.execute(
            `DELETE FROM posts WHERE id=?`,
            [postId]
        );
        return rows;
    }

}

module.exports = Post;

