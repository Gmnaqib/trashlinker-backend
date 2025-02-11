const userRepository = require("../repositories/userRepository");

class UserController {
    async registerUser(req, res) {
        try {
            const { email, username, password, address, longitude, latitude, role } = req.body;

            if (!email || !username || !password) {
                return res.status(400).json({ message: "Email, username, and password are required" });
            }

            await userRepository.registration({ email, username, password, address, longitude, latitude, role });

            return res.status(201).json({ message: "Register success" });

        } catch (error) {
            res.status(500).json({ message: `Error: ${error.message}` });
        }
    }

    async updateUser(req, res) {
        const { id } = req.userData;
        const userData = req.body;

        try {
            const updatedUser = await userRepository.updateUser(id, userData);

            if (updatedUser.affectedRows > 0) {
                return res.status(200).json({
                    message: "User updated successfully",
                    data: userData,
                });
            } else {
                return res.status(404).json({
                    message: "User not found or no changes made",
                });
            }
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    }
}

module.exports = new UserController();
