const db = require("../../config/database");
const Post = require("../models/post");

class PostRepository {
    async createPost(title, description, type, image, longitude, latitude, userId, tpaId, schedule) {
        const sql = `
      INSERT INTO post (title, description, type, image, longitude, latitude, userId, tpaId, schedule, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;
        const [result] = await db.execute(sql, [title, description, type, image, longitude, latitude, userId, tpaId, schedule]);
        return new Post(result.insertId, title, description, type, image, longitude, latitude, userId, tpaId, schedule, new Date(), new Date());
    }

    async getPostById(postId) {
        const sql = `SELECT * FROM post WHERE id = ?`;
        const [rows] = await db.execute(sql, [postId]);
        if (rows.length === 0) return null;
        const row = rows[0];
        return new Post(row.id, row.title, row.description, row.type, row.image, row.longitude, row.latitude, row.userId, row.tpaId, row.schedule, row.createdAt, row.updatedAt);
    }

    async getAllPosts() {
        const sql = `SELECT * FROM post ORDER BY createdAt DESC`;
        const [rows] = await db.execute(sql);
        return rows.map(row => new Post(row.id, row.title, row.description, row.type, row.image, row.longitude, row.latitude, row.userId, row.tpaId, row.schedule, row.createdAt, row.updatedAt));
    }

    async updatePost(postId, title, description, type, image, longitude, latitude, schedule) {
        const sql = `
      UPDATE post 
      SET title = ?, description = ?, type = ?, image = ?, longitude = ?, latitude = ?, schedule = ?, updatedAt = NOW()
      WHERE id = ?
    `;
        await db.execute(sql, [title, description, type, image, longitude, latitude, schedule, postId]);
        return { message: "Post updated successfully" };
    }

    async deletePost(postId) {
        const sql = `DELETE FROM post WHERE id = ?`;
        await db.execute(sql, [postId]);
        return { message: "Post deleted successfully" };
    }
}

module.exports = new PostRepository();
