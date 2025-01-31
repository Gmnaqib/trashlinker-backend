const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization || !authorization.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Token required or invalid format" });
        }

        const token = authorization.split(" ")[1];
        const secret = process.env.JWT_SECRET;

        const jwtDecode = jwt.verify(token, secret);
        req.userData = jwtDecode;

        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
