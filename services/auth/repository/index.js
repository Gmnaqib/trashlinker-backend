const db = require("../../../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginRepository = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query("SELECT * FROM user WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        longitude: user.longitude,
        latitude: user.latitude,
      },
      process.env.JWT_SECRET
    );

    return res.status(200).json({
      message: "Login Success",
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

module.exports = { loginRepository };
