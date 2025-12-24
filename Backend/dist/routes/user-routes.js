import { Router } from "express";
import { userSignup, userLogin, verifyUser, userLogout, } from "../controllers/user-controllers.js";
import { verifyToken } from "../utils/token-manager.js";
import { validate, loginValidator, signupValidator } from "../utils/validators.js";
const router = Router();
router.post("/signup", validate(signupValidator), userSignup);
router.post("/login", validate(loginValidator), userLogin);
router.get("/auth-status", verifyToken, verifyUser);
router.get("/logout", verifyToken, userLogout);
export default router;
//# sourceMappingURL=user-routes.js.map