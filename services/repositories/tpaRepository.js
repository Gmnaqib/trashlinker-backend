const db = require("../../config/database");

class TpaRepository {
    // Mendapatkan semua TPA
    async getAllTpa() {
        const [rows] = await db.query("SELECT * FROM tpa");
        return rows;
    }

    // Mendapatkan satu TPA berdasarkan ID
    async getTpaById(id) {
        const [rows] = await db.query("SELECT * FROM tpa WHERE id = ?", [id]);
        return rows.length > 0 ? rows[0] : null;
    }

    // Menambahkan TPA baru
    async createTpa(tpa) {
        const { tpa_name, tpa_location, tpa_image, tpa_description } = tpa;
        const [result] = await db.query(
            "INSERT INTO tpa (tpa_name, tpa_location, tpa_image, tpa_description) VALUES (?, ?, ?, ?)",
            [tpa_name, tpa_location, tpa_image, tpa_description]
        );
        return result;
    }

    // Mengupdate data TPA
    async updateTpa(id, tpa) {
        const { tpa_name, tpa_location, tpa_image, tpa_description } = tpa;
        const [result] = await db.query(
            "UPDATE tpa SET tpa_name = ?, tpa_location = ?, tpa_image = ?, tpa_description = ? WHERE id = ?",
            [tpa_name, tpa_location, tpa_image, tpa_description, id]
        );
        return result;
    }

    // Menghapus TPA berdasarkan ID
    async deleteTpa(id) {
        const [result] = await db.query("DELETE FROM tpa WHERE id = ?", [id]);
        return result;
    }
}

module.exports = new TpaRepository();
