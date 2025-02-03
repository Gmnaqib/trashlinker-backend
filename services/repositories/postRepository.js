const db = require("../../config/database");
const Post = require("../models/Post");
// const haversine = require("haversine-distance");

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

    // async getAllPosts() {
    //     const sql = `
    //     SELECT 
    //         post.id, 
    //         post.title, 
    //         post.description, 
    //         post.type, 
    //         post.image, 
    //         post.longitude, 
    //         post.latitude, 
    //         post.userId, 
    //         user.username AS userName, 
    //         user.address AS userAddress,
    //         post.tpaId, 
    //         tpa.tpa_name AS tpaName,
    //         tpa.tpa_location AS tpaAddress,
    //         post.schedule, 
    //         post.createdAt, 
    //         post.updatedAt
    //     FROM post
    //     JOIN user ON post.userId = user.id
    //     JOIN tpa ON post.tpaId = tpa.id
    //     ORDER BY post.createdAt DESC
    // `;

    //     const [rows] = await db.execute(sql);
    //     return rows.map(row => ({
    //         id: row.id,
    //         title: row.title,
    //         description: row.description,
    //         type: row.type,
    //         image: row.image,
    //         longitude: row.longitude,
    //         latitude: row.latitude,
    //         userId: row.userId,
    //         userName: row.userName,
    //         userAddress: row.userAddress,
    //         tpaId: row.tpaId,
    //         tpaName: row.tpaName,
    //         tpaAddress: row.tpaAddress,
    //         schedule: row.schedule,
    //         createdAt: row.createdAt,
    //         updatedAt: row.updatedAt
    //     }));
    // }

    async getAllPosts() {
        const sql = `
        SELECT 
            post.id, 
            post.title, 
            post.description, 
            post.type, 
            post.image, 
            post.longitude, 
            post.latitude, 
            post.userId, 
            user.username AS userName, 
            user.address AS userAddress,
            post.tpaId, 
            tpa.tpa_name AS tpaName,
            tpa.tpa_location AS tpaAddress,
            post.schedule, 
            post.createdAt, 
            post.updatedAt,
            COUNT(volunteer.id) AS volunteerCount
        FROM post
        JOIN user ON post.userId = user.id
        JOIN tpa ON post.tpaId = tpa.id
        LEFT JOIN volunteer ON volunteer.postId = post.id
        GROUP BY post.id
        ORDER BY post.createdAt DESC
    `;

        const [rows] = await db.execute(sql);
        return rows.map(row => ({
            id: row.id,
            title: row.title,
            description: row.description,
            type: row.type,
            image: row.image,
            longitude: row.longitude,
            latitude: row.latitude,
            userId: row.userId,
            userName: row.userName,
            userAddress: row.userAddress,
            tpaId: row.tpaId,
            tpaName: row.tpaName,
            tpaAddress: row.tpaAddress,
            schedule: row.schedule,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
            volunteerCount: row.volunteerCount // Menambahkan jumlah volunteer
        }));
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

    async getAllPostsWithinRadius(userLatitude, userLongitude, radiusKm) {
        try {
            const query = `
            SELECT 
                post.id, 
                post.title, 
                post.description, 
                post.type, 
                post.image, 
                post.longitude, 
                post.latitude, 
                post.userId, 
                user.username AS userName, 
                user.address AS userAddress,
                post.tpaId, 
                tpa.tpa_name AS tpaName,
                tpa.tpa_location AS tpaAddress,
                post.schedule, 
                post.createdAt, 
                post.updatedAt,
                (6371 * ACOS(
                    COS(RADIANS(?)) * COS(RADIANS(post.latitude)) *
                    COS(RADIANS(post.longitude) - RADIANS(?)) +
                    SIN(RADIANS(?)) * SIN(RADIANS(post.latitude))
                )) AS distance_km
            FROM post
            JOIN user ON post.userId = user.id
            JOIN tpa ON post.tpaId = tpa.id
            HAVING distance_km <= ?
            ORDER BY distance_km ASC;
        `;

            const [posts] = await db.query(query, [
                userLatitude,
                userLongitude,
                userLatitude,
                radiusKm
            ]);

            return posts.map(post => ({
                id: post.id,
                title: post.title,
                description: post.description,
                type: post.type,
                image: post.image,
                longitude: post.longitude,
                latitude: post.latitude,
                userId: post.userId,
                userName: post.userName,
                userAddress: post.userAddress,
                tpaId: post.tpaId,
                tpaName: post.tpaName,
                tpaAddress: post.tpaAddress,
                schedule: post.schedule,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
                distanceKm: post.distance_km.toFixed(2) // Jarak dalam KM dengan 2 desimal
            }));
        } catch (error) {
            throw new Error(`Database error: ${error.message}`);
        }
    }



}

module.exports = new PostRepository();
