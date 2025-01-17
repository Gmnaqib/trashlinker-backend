const db = require("../../../config/database");

class PostRepository {
  constructor( title, description, image, longitude, latitude, schedule, userId, tpaId ) {
    this.title = title;
    this.description = description;
    this.image = image;
    this.longitude = longitude;
    this.latitude = latitude;
    this.schedule = schedule;
    this.userId = userId;
    this.tpaId = tpaId;
  }

  async addPostRepository( title, description, image, longitude, latitude, schedule, userId, tpaId ) {
      const [rows] = await db.query(
        "INSERT INTO post (title, description, image, longitude, latitude, schedule, userId, tpaId) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?);",
        [ title, description, image, longitude, latitude, schedule, userId, tpaId ]
      );
  }

  async AddVolunteerRepository( checkin, userId, postId ) {
      const [rows] = await db.query(
        "INSERT INTO volunteer (checkin, userId, postId ) VALUES ( ?, ?, ?);",
        [ checkin, userId, postId ]
      );
  }
}
module.exports = PostRepository;
