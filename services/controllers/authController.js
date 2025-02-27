const userRepository = require("../repositories/userRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthController {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await userRepository.login(email);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Wrong password" });
            }

            const payload = {
                id: user.id,
                name: user.username,
                email: user.email,
                role: user.role,
                latitude: user.latitude,
                longitude: user.longitude
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET);
            // const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "5h" });

            res.status(200).json({
                message: "Login successful",
                data: {
                    id: user.id,
                    name: user.username,
                    email: user.email,
                    role: user.role,
                    latitude: user.latitude,
                    longitude: user.longitude,
                    token: token
                }
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
    async me(req, res) {
        const { id } = req.userData;

        try {
            const user = await userRepository.getUserById(id);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            return res.status(200).json({
                message: "Get current user success",
                data: user
            });
        } catch (error) {
            return res.status(500).json({
                message: "Server error",
                error: error.message
            });
        }
    }
};

module.exports = new AuthController();
