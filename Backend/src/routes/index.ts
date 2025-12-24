import { Router } from "express";
import userRoutes from "./user-routes.js";
import questionRoutes from "./question-routes.js";
import chatRoutes from "./chat-routes.js";

const router = Router();

router.use("/user", userRoutes);
router.use("/questions", questionRoutes);
router.use("/chat", chatRoutes);

export default router;
