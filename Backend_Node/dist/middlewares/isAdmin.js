export const isAdmin = (req, res, next) => {
    const user = req.user;
    if (!user || user.role !== "admin") {
        return res.status(403).json({ message: "Admin access only" });
    }
    next();
};
//# sourceMappingURL=isAdmin.js.map