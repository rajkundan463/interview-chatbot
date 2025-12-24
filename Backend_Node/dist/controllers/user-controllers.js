import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";
/*  GET ALL USERS (ADMIN) */
export const getAllUsers = async (_req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json({ message: "OK", users });
    }
    catch (error) {
        console.error("❌ Get users error:", error);
        res.status(500).json({ message: "Failed to fetch users" });
    }
};
/* SIGNUP */
export const userSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ message: "All fields required" });
            return;
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(409).json({ message: "User already registered" });
            return;
        }
        const hashedPassword = await hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "user",
        });
        const token = createToken(user._id.toString(), user.email);
        const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        res.cookie(COOKIE_NAME, token, {
            httpOnly: true,
            signed: true,
            path: "/",
            expires,
        });
        res.status(201).json({
            message: "Signup successful",
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (error) {
        console.error("❌ Signup error:", error);
        res.status(500).json({ message: "Signup failed" });
    }
};
/*  LOGIN */
export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Email & password required" });
            return;
        }
        const user = await User.findOne({ email });
        if (!user || !user.password) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(403).json({ message: "Invalid credentials" });
            return;
        }
        const token = createToken(user._id.toString(), user.email);
        const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        res.cookie(COOKIE_NAME, token, {
            httpOnly: true,
            signed: true,
            path: "/",
            expires,
        });
        res.status(200).json({
            message: "Login successful",
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (error) {
        console.error("❌ Login error:", error);
        res.status(500).json({ message: "Login failed" });
    }
};
/* VERIFY USER  */
export const verifyUser = async (req, res) => {
    try {
        const userData = req.user;
        if (!userData) {
            return res.status(401).json({ message: "Not authenticated" });
        }
        const user = await User.findById(userData.id);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        return res.status(200).json({
            message: "OK",
            name: user.name,
            email: user.email,
            role: user.role,
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Auth status failed" });
    }
};
/* LOGOUT */
export const userLogout = async (req, res) => {
    try {
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            signed: true,
            path: "/",
        });
        res.status(200).json({ message: "Logout successful" });
    }
    catch (error) {
        console.error(" Logout error:", error);
        res.status(500).json({ message: "Logout failed" });
    }
};
//# sourceMappingURL=user-controllers.js.map