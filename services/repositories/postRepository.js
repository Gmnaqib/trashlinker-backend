const db = require("../../config/database");
const Post = require("../models/Post");

class PostRepository {
    async createPost(title, description, type, image, longitude, latitude, userId, tpaId, schedule, fullAddress) {
        const sql = `
        INSERT INTO post (title, description, type, image, longitude, latitude, userId, tpaId, schedule, fullAddress, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        `;
        const [result] = await db.execute(sql, [title, description, type, image, longitude, latitude, userId, tpaId, schedule, fullAddress]);

        return new Post(result.insertId, title, description, type, image, longitude, latitude, userId, tpaId, schedule, fullAddress, new Date(), new Date());
    }

    async myPostRepository(userId) {
        const sql = `SELECT * FROM post WHERE userId = ?`;
        const [rows] = await db.execute(sql, [userId]);

        return rows.map(row => new Post(row.id, row.title, row.description, row.type, row.image, row.longitude, row.latitude, row.userId, row.tpaId, row.schedule, row.fullAddress, row.createdAt, row.updatedAt));
    }

    async getReportPost() {
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
            post.fullAddress,
            user.username AS userName, 
            user.address AS userAddress,
            post.tpaId, 
            tpa.tpa_name AS tpaName,
            tpa.tpa_location AS tpaAddress,
            post.schedule, 
            post.createdAt, 
            post.updatedAt,
            COUNT(postVolunteer.id) AS volunteerCount
        FROM post
        JOIN user ON post.userId = user.id
        JOIN tpa ON post.tpaId = tpa.id
        LEFT JOIN postVolunteer ON postVolunteer.postId = post.id
        WHERE post.type = 'Report'
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
            fullAddress: row.fullAddress,
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
            volunteerCount: row.volunteerCount
        }));
    }

    async getPostById(postId) {
        const sql = `SELECT * FROM post WHERE id = ?`;
        const [rows] = await db.execute(sql, [postId]);

        if (rows.length === 0) return null;

        const row = rows[0];
        return new Post(row.id, row.title, row.description, row.type, row.image, row.longitude, row.latitude, row.userId, row.tpaId, row.schedule, row.createdAt, row.updatedAt);
    }

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
            post.fullAddress,
            user.username AS userName, 
            user.address AS userAddress,
            post.tpaId, 
            tpa.tpa_name AS tpaName,
            tpa.tpa_location AS tpaAddress,
            post.schedule, 
            post.createdAt, 
            post.updatedAt,
            COUNT(postVolunteer.id) AS volunteerCount
        FROM post
        JOIN user ON post.userId = user.id
        JOIN tpa ON post.tpaId = tpa.id
        LEFT JOIN postVolunteer ON postVolunteer.postId = post.id
        WHERE type = "volunteer"
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
            fullAddress: row.fullAddress,
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
            volunteerCount: row.volunteerCount
        }));
    }

    async updatePost(postId, title, description, type, image, longitude, latitude, schedule) {
        const sql = `
        UPDATE post 
        SET title = ?, description = ?, type = ?, image = ?, longitude = ?, latitude = ?, schedule = ?, updatedAt = NOW()
        WHERE id = ?
        `;
        const [result] = await db.execute(sql, [title, description, type, image, longitude, latitude, schedule, postId]);

        if (result.affectedRows === 0) {
            throw new Error(`Post with ID ${postId} not found`);
        }

        return { message: "Post updated successfully" };
    }

    async deletePost(postId) {
        const sql = `DELETE FROM post WHERE id = ?`;
        const [result] = await db.execute(sql, [postId]);

        if (result.affectedRows === 0) {
            throw new Error(`Post with ID ${postId} not found`);
        }

        return { message: "Post deleted successfully" };
    }

    async getAllPostsWithinRadius(userLatitude, userLongitude, radiusKm) {
        try {
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
                post.fullAddress,
                post.tpaId, 
                tpa.tpa_name AS tpaName,
                tpa.tpa_location AS tpaAddress,
                post.schedule, 
                post.createdAt, 
                post.updatedAt,
                COUNT(postVolunteer.id) AS volunteerCount,
                (6371 * ACOS(
                    COS(RADIANS(?)) * COS(RADIANS(post.latitude)) *
                    COS(RADIANS(post.longitude) - RADIANS(?)) +
                    SIN(RADIANS(?)) * SIN(RADIANS(post.latitude))
                )) AS distance_km
            FROM post
            JOIN user ON post.userId = user.id
            JOIN tpa ON post.tpaId = tpa.id
            LEFT JOIN postVolunteer ON postVolunteer.postId = post.id
            WHERE type = "volunteer"
        GROUP BY post.id
            HAVING distance_km <= ?
            ORDER BY distance_km ASC;
            `;

            const [posts] = await db.execute(sql, [userLatitude, userLongitude, userLatitude, radiusKm]);

            return posts.map(post => ({
                id: post.id,
                title: post.title,
                description: post.description,
                type: post.type,
                image: post.image,
                longitude: post.longitude,
                latitude: post.latitude,
                fullAddress: post.fullAddress,
                userId: post.userId,
                userName: post.userName,
                userAddress: post.userAddress,
                tpaId: post.tpaId,
                tpaName: post.tpaName,
                tpaAddress: post.tpaAddress,
                schedule: post.schedule,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
                distanceKm: parseFloat(post.distance_km.toFixed(2)),
                volunteerCount: post.volunteerCount
            }));
        } catch (error) {
            throw new Error(`Database error: ${error.message}`);
        }
    }

    async updateToVolunteer(postId, userId, schedule, type) {
        const sql = `
    UPDATE post 
    SET userId = ?, schedule = ?, type = ?, updatedAt = NOW()
    WHERE id = ?
    `;
        const [result] = await db.execute(sql, [userId, schedule, type, postId]);

        if (result.affectedRows === 0) {
            throw new Error(`Post with ID ${postId} not found`);
        }

        return { message: "Successfully Added to volunteer " };
    }

}

module.exports = new PostRepository();
