export const isAdmin = (req, res, next) => {
    if (res.locals.user?.role !== "admin") {
        return res.status(403).json({ message: "Admin access only" });
    }
    next();
};
//# sourceMappingURL=isAdmin.js.map