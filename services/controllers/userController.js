const User = require("../models/user");
const userRepository = require("../repositories/userRepository");

class UserController {
    async registerUser(req, res) {
        try {
            const { email, username, password, address, longitude, latitude, role } = req.body;

            if (!email || !username || !password) {
                return res.status(400).json({ message: "Email, username, and password are required" });
            }

            const newUser = new User(email, username, password, address, longitude, latitude, role);

            const result = await userRepository.registration(newUser);

            res.status(201).json({
                message: "User registered successfully",
                userId: result.insertId,
            });

        } catch (error) {
            res.status(500).json({ message: `Error: ${error.message}` });
        }
    }
}

module.exports = new UserController();
