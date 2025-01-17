const db = require("../../../config/database");
const bcrypt = require("bcrypt");

class UserRepository {
  constructor(email, username, password, address, longitude, latitude, role) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.address = address;
    this.longitude = longitude;
    this.latitude = latitude;
    this.role = role;
  }

  async addUserRepository( email, username, password, address, longitude, latitude, role ) {
    const passwordHash = bcrypt.hashSync(password, 10);
      const user = await db.query(
        "INSERT INTO user (email, username, password, address, longitude, latitude, role) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [ email, username, (password = passwordHash), address, longitude, latitude, role ]
      );
      return user;
  }

  async getAllEmailRepository(email) {
    return db.query("SELECT * FROM user WHERE email = ?", [email]);
  }
}

module.exports = UserRepository;
