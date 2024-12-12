const db = require('../../../config/database');

const getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM user');
    return res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
}

module.exports = { getAllUsers };
