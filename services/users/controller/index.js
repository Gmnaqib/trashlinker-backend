const UserRepository = require('../repository'); // Pastikan file ini benar
const userRepo = new UserRepository();

module.exports = {
  addUser: async (req, res) => {
    const { email, username, password, address, role } = req.body;
    try {
        const checkUser = await userRepo.getAllUsersEmailRepository(email);
        const newUser = await userRepo.addUserRepository(email, username, password, address, role);
        return res.json({User: req.body});
    } catch (error) {
        console.error("Error in addUser:", error); // Log error di server
        return res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
  },
};
