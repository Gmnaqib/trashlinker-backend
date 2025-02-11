const db = require("../../config/database");
const bcrypt = require("bcrypt");

class UserRepository {
    async registration(user) {
        try {

            const existingUser = await db.query("SELECT id FROM user WHERE email = ?", [user.email]);

            if (existingUser[0].length > 0) {
                return { message: "Email already registered" };
            }
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

    async updateUser(id, userData) {
        try {
            // Menyusun query untuk update data, hanya update yang ada dalam userData
            let updateQuery = "UPDATE user SET ";
            let values = [];
            let fields = [];

            // Iterasi untuk memeriksa jika field ada dalam userData, lalu membangun query update
            for (let field in userData) {
                if (userData[field] !== undefined) {
                    fields.push(`${field} = ?`);
                    values.push(userData[field]);
                }
            }

            // Menyusun query berdasarkan fields yang diupdate
            if (fields.length > 0) {
                updateQuery += fields.join(", ") + " WHERE id = ?";
                values.push(id); // Menambahkan ID user untuk WHERE clause
                const [result] = await db.query(updateQuery, values);

                return result; // Mengembalikan hasil query update
            } else {
                throw new Error("No valid fields to update");
            }
        } catch (error) {
            throw new Error(`Database error: ${error.message}`);
        }
    }

    async getAllUser() {
        try {
            const sql = "SELECT * from user";
            const [rows] = await db.execute(sql);
            return rows;
        } catch (error) {
            throw new Error(`Database error: ${error.message}`);
        }
    }
}



module.exports = new UserRepository();
