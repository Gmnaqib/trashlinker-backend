const db = require("../../../config/database");

class PostRepository {
  constructor(title, description, image, location, volunteer, schedule, userId, tpaId) {
    this.title = title;
    this.description = description;
    this.image = image;
    this.location = location;
    this.volunteer = volunteer;
    this.schedule = schedule ;
    this.userId = userId;
    this.tpaId = tpaId;
  }
  
  async addPostRepository (title, description, image, location, volunteer, schedule, userId, tpaId)  {
    try {
      const [rows]= await db.query(
        "INSERT INTO post (title, description, image, location, volunteer, schedule, userId, tpaId) VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
        [title, description, image, location, volunteer, schedule, userId, tpaId]
      );
    } catch (error) {
      return error;
    }
  };
}
module.exports = PostRepository; 


