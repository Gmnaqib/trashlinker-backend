const db = require("../../config/database");
const Volunteer = require("../models/Volunteer");

class VolunteerRepository {
  async addVolunteer(userId, postId) {
    const sql = `
      INSERT INTO volunteer (userId, postId, checkin, createdAt, updatedAt)
      VALUES (?, ?, false, NOW(), NOW())
    `;
    const [result] = await db.execute(sql, [userId, postId]);
    return new Volunteer(result.insertId, false, userId, postId, new Date(), new Date());
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
      SELECT v.*, p.title
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
