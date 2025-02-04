const db = require("../../config/database");
const Volunteer = require("../models/Volunteer");

class VolunteerRepository {
  async addVolunteer(userId, postId) {
    try {
      // Cek apakah user sudah menjadi volunteer untuk post ini
      const checkExisting = `
            SELECT pv.id FROM postVolunteer pv
            JOIN volunteer v ON pv.volunteerId = v.id
            WHERE v.userId = ? AND pv.postId = ?
        `;
      const [existing] = await db.execute(checkExisting, [userId, postId]);
      if (existing.length > 0) {
        throw new Error("User already joined as volunteer for this post");
      }

      // Cek apakah user sudah ada di tabel volunteer
      const checkVolunteer = `SELECT id FROM volunteer WHERE userId = ?`;
      const [volunteers] = await db.execute(checkVolunteer, [userId]);

      let volunteerId;
      if (volunteers.length > 0) {
        volunteerId = volunteers[0].id;
      } else {
        const insertVolunteer = `INSERT INTO volunteer (userId, createdAt, updatedAt) VALUES (?, NOW(), NOW())`;
        const [volunteerResult] = await db.execute(insertVolunteer, [userId]);
        volunteerId = volunteerResult.insertId;
      }

      // Insert ke postVolunteer
      const insertPostVolunteer = `
            INSERT INTO postVolunteer (volunteerId, postId, checkin, createdAt, updatedAt)
            VALUES (?, ?, false, NOW(), NOW())
        `;
      const [result] = await db.execute(insertPostVolunteer, [volunteerId, postId]);

      // Gunakan Model Volunteer untuk hasil pengembalian
      return new Volunteer(volunteerId, userId, new Date(), new Date());
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }


  async getAllVolunteer() {
    const sql = `SELECT * FROM volunteer`;
    const [result] = await db.execute(sql);
    return result;
  }

  async getVolunteerLeaderboard() {
    try {
      const sql = `
            SELECT 
                user.id AS userId, 
                user.username,  
                COUNT(volunteer.id) AS totalActivities
            FROM volunteer
            JOIN user ON volunteer.userId = user.id
            WHERE volunteer.checkin = TRUE
            GROUP BY user.id
            ORDER BY totalActivities DESC, user.username ASC;
        `;

      const [result] = await db.execute(sql);
      return result;
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }


  async getVolunteersByPost(postId) {
    const sql = `
      SELECT v.*, u.username, p.title
      FROM volunteer v
      JOIN user u ON v.userId = u.id
      JOIN post p ON v.postId = p.id
      WHERE v.postId = ?
    `;
    const [rows] = await db.execute(sql, [postId]);
    return rows;
  }

  async getVolunteersByUser(userId) {
    const sql = `
      SELECT v.*, p.title, p.schedule
      FROM volunteer v
      JOIN post p ON v.postId = p.id
      WHERE v.userId = ?
    `;
    const [rows] = await db.execute(sql, [userId]);
    return rows;
  }

  async deleteVolunteer(volunteerId) {
    const sql = `DELETE FROM volunteer WHERE id = ?`;
    await db.execute(sql, [volunteerId]);
    return { message: "Volunteer deleted successfully" };
  }

  async updateVolunteer(volunteerId, checkin) {
    const sql = `
      UPDATE volunteer 
      SET checkin = ?
      WHERE id = ?
    `;
    await db.execute(sql, [checkin, volunteerId]);
    return { message: "Volunteer updated successfully" };
  }
}

module.exports = new VolunteerRepository();
