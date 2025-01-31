const db = require("../../config/database");
const bcrypt = require("bcrypt");

class UserRepository {
    async registration(user) {
        try {
            // Hash password secara asynchronous
            const hashedPassword = await bcrypt.hash(user.password, 10);

            const result = await db.query(
                "INSERT INTO user (email, username, password, address, longitude, latitude, role) VALUES (?, ?, ?, ?, ?, ?, ?)",
                [user.email, user.username, hashedPassword, user.address, user.longitude, user.latitude, user.role]
            );

            // Mengembalikan ID user yang baru dibuat
            return { id: result[0].insertId, ...user, password: hashedPassword };
        } catch (error) {
            throw new Error(`Database error: ${error.message}`);
        }
    }

    async login(email) {
        try {
            const [rows] = await db.query("SELECT * FROM user WHERE email = ?", [email]);
            return rows.length > 0 ? rows[0] : null;  // Mengembalikan satu user jika ditemukan
        } catch (error) {
            throw new Error(`Database error: ${error.message}`);
        }
    }

    async getUserById(id) {
        try {
            const [rows] = await db.query("SELECT id, email, username, address, longitude, latitude, role, createdAt, updatedAt FROM user WHERE id = ?", [id]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            throw new Error(`Database error: ${error.message}`);
        }
    }
}

module.exports = new UserRepository();
