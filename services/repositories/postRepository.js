const db = require("../../config/database");

class PostRepository {
    async createPost(post) {
        try {
            const { title, description, type, image, longitude, latitude, userId, tpaId, schedule, fullAddress } = post;
            // const sql = ;
            const [result] = await db.query(`INSERT INTO post (title, description, type, image, longitude, latitude, userId, tpaId, schedule, fullAddress, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`, [title, description, type, image, longitude, latitude, userId, tpaId, schedule, fullAddress]);

            const [newPost] = await db.query(
                `SELECT * FROM post WHERE id = ?`,
                [result.insertId]
            );
            return newPost[0];
        } catch (error) {
            throw new Error(`Database error: ${error.message}`);

        }
    }

    async myPostRepository(userId) {
        const sql = `SELECT * FROM post WHERE userId = ?`;
        const [rows] = await db.query(sql, [userId]);
        return rows;
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

        const [rows] = await db.query(sql);
        return rows;
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

        const [rows] = await db.query(sql);
        return rows;
    }

    async updatePost(postId, updates) {
        const fields = Object.keys(updates).map(key => `${key} = ?`).join(", ");
        const values = [...Object.values(updates), postId];

        const sql = `UPDATE post SET ${fields}, updatedAt = NOW() WHERE id = ?`;
        const [result] = await db.execute(sql, values);

        if (result.affectedRows === 0) {
            throw new Error(`Post with ID ${postId} not found`);
        }

        // Ambil data terbaru setelah update
        const [updatedPost] = await db.execute(`SELECT * FROM post WHERE id = ?`, [postId]);

        return updatedPost[0];
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
