const userRepository = require("../repositories/userRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await userRepository.login(email);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const payload = {
                id: user.id,
                name: user.username,
                email: user.email,
                role: user.role,
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "5h" });

            res.status(200).json({
                message: "Login successful",
                data: {
                    id: user.id,
                    name: user.username,
                    email: user.email,
                    role: user.role,
                    token: token
                }
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    },
    me: async (req, res) => {
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
