const db = require("../../../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginRepository = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Query untuk mendapatkan user berdasarkan email
    const [rows] = await db.query("SELECT * FROM user WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      // Jika user tidak ditemukan
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];

    // Verifikasi password
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      // Jika password tidak cocok
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Jika password cocok, buat token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role }, // Payload
      process.env.JWT_SECRET, // Secret key dari environment variable
      { expiresIn: "1h" } // Token berlaku selama 1 jam
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
