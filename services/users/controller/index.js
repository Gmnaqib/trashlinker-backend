const UserRepository = require("../repository");
const userRepo = new UserRepository();

module.exports = {
  addUser: async (req, res) => {
    const { email, username, password, address, longitude, latitude, role } = req.body;
    try {
        const newUser = await userRepo.addUserRepository(email,username,password,address,longitude,latitude,role);
        return res.json({ message: "Registration Success", data: req.body });
    } catch (error) {
        return res.status(500).json({ error: "Email sudah terdaftar" });
    }
  },
};
