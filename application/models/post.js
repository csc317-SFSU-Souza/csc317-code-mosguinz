var db = require("../conf/database");

class Post {

    static async upload(title, description, path, thumbnail, userId) {
        var [resObject, fields] = await db.execute(`INSERT INTO posts
        (title, description, video, thumbnail, fk_author) VALUE (?,?,?,?,?);`,
            [title, description, path, thumbnail, userId]);
        return resObject;
    }

}

module.exports = Post;

