import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";
export const createToken = (id, email, expiresIn = "7d") => {
    return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn });
};
export const verifyToken = (req, res, next) => {
    const token = req.signedCookies[COOKIE_NAME];
    if (!token)
        return res.status(401).json({ message: "Not authenticated" });
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err)
            return res.status(401).json({ message: "Token invalid" });
        res.locals.jwtData = data;
        next();
    });
};
//# sourceMappingURL=token-manager.js.map