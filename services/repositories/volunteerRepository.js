const db = require("../../config/database");

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
        const insertVolunteer = `
          INSERT INTO volunteer (userId, createdAt, updatedAt) VALUES (?, NOW(), NOW())
        `;
        const [volunteerResult] = await db.execute(insertVolunteer, [userId]);
        volunteerId = volunteerResult.insertId;
      }

      // Insert ke postVolunteer
      const insertPostVolunteer = `
        INSERT INTO postVolunteer (volunteerId, postId, checkin, createdAt, updatedAt)
        VALUES (?, ?, false, NOW(), NOW())
      `;
      const [result] = await db.execute(insertPostVolunteer, [volunteerId, postId]);
      const [newVolunteer] = await db.query(
        `SELECT * FROM postVolunteer WHERE id = ?`,
        [result.insertId]
      );

      return newVolunteer[0];
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }

  async getAllVolunteer() {
    const sql = `SELECT postVolunteer.id, postVolunteer.volunteerId, postVolunteer.checkin, postVolunteer.postId, post.schedule, postVolunteer.createdAt, postVolunteer.updatedAt FROM postVolunteer JOIN post ON postVolunteer.postId = post.id;`;
    const [result] = await db.execute(sql);
    return result;
  }

  async getVolunteerLeaderboard() {
    try {
      const sql = `
        SELECT 
          u.id AS userId, 
          u.username,  
          COUNT(pv.id) AS totalActivities
        FROM postVolunteer pv
        JOIN volunteer v ON pv.volunteerId = v.id
        JOIN user u ON v.userId = u.id
        WHERE pv.checkin = TRUE
        GROUP BY u.id
        ORDER BY totalActivities DESC, u.username ASC;
      `;
      const [result] = await db.execute(sql);
      return result;
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }

  // async getVolunteersByPost(postId) {
  //   const sql = `
  //     SELECT pv.id AS postVolunteerId, v.id AS volunteerId, u.username, p.title, pv.checkin
  //     FROM postVolunteer pv
  //     JOIN volunteer v ON pv.volunteerId = v.id
  //     JOIN user u ON v.userId = u.id
  //     JOIN post p ON pv.postId = p.id
  //     WHERE pv.postId = ?
  //   `;
  //   const [rows] = await db.execute(sql, [postId]);
  //   return rows;
  // }

  async getVolunteersByPost(postId) {
    const sql = `
      SELECT 
        pv.id AS postVolunteerId, 
        v.id AS volunteerId, 
        pv.postId, 
        pv.checkin, 
        pv.createdAt, 
        pv.updatedAt
      FROM postVolunteer pv
      JOIN volunteer v ON pv.volunteerId = v.id
      WHERE pv.postId = ?
    `;

    const [rows] = await db.execute(sql, [postId]);

    return {
      totalVolunteers: rows.length, // Hitung jumlah volunteer dari hasil query
      volunteers: rows
    };
  }


  async getVolunteersByUser(userId) {
    const sql = `
      SELECT pv.id AS postVolunteerId, v.id AS volunteerId, p.id AS postId , p.title, p.schedule, pv.checkin
      FROM postVolunteer pv
      JOIN volunteer v ON pv.volunteerId = v.id
      JOIN post p ON pv.postId = p.id
      WHERE v.userId = ?
    `;
    const [rows] = await db.execute(sql, [userId]);
    return rows;
  }

  async deleteVolunteer(id) {
    const sql = `DELETE FROM postVolunteer WHERE id = ?`;
    await db.execute(sql, [id]);
    return { message: "Volunteer deleted successfully" };
  }

  async updateVolunteer(id, checkin) {
    const sql = `
      UPDATE postVolunteer 
      SET checkin = ?
      WHERE id = ?
    `;
    await db.execute(sql, [checkin, id]);
    return { message: "Volunteer updated successfully" };
  }
}

module.exports = new VolunteerRepository();
