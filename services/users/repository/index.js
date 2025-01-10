const db = require("../../../config/database");
const bcrypt = require("bcrypt");

class UserRepository {
  constructor(email, username, password, address, role) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.address = address;
    this.role = role;
  }

  async addUserRepository(email, username, password, address, role) {
    const passwordHash = bcrypt.hashSync(password, 10);
    try {
      const [rows] = await db.query(
        "INSERT INTO user (email, username, password, address, role) VALUES (?, ?, ?, ?, ?)",
        [email, username, (password = passwordHash), address, role]
      );

      if (result.affectedRows > 0) {
        return {
          success: true,
          data: {
            email,
            username,
            address,
            role,
            password: passwordHash,
          },
        };
      } else {
        return {
          success: false,
          message: "Registration failed",
        };
      }
    } catch (error) {
      return error;
    }
  }
}

module.exports = UserRepository;
