const db = require("../../../config/database");

class UserRepository {
  constructor(email, username, password, address, role) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.address = address;
    this.role = role;
  }
  
  async addUserRepository (email, username, password, address, role)  {
    try {
      const [rows]= await db.query(
        "INSERT INTO user (email, username, password, address, role) VALUES (?, ?, ?, ?, ?)",
        [email, username, password, address, role]
      );
    } catch (error) {
      return error;
    }
  };
  async getAllUsersEmailRepository() {
    try {
      const [rows] = await db.query("SELECT * FROM user where email = ?", [this.email]);
      return "success";
    } catch (error) {
      return error;
    }
  };
}

module.exports = UserRepository; 


