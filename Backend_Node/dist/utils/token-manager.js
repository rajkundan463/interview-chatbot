import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "secret";
export const createToken = (id, email) => {
    return jwt.sign({ id, email }, JWT_SECRET, { expiresIn: "7d" });
};
export const verifyToken = (req, res, next) => {
    try {
        const token = req.signedCookies?.auth_token;
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
//# sourceMappingURL=token-manager.js.map