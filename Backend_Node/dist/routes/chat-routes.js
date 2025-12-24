import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { generateChatCompletion, sendChatsToUser, deleteChats, } from "../controllers/chat-controllers.js";
const router = Router();
router.post("/:category/:questionId", verifyToken, generateChatCompletion);
router.get("/all-chats/:category/:questionId", verifyToken, sendChatsToUser);
router.delete("/delete", verifyToken, deleteChats);
export default router;
//# sourceMappingURL=chat-routes.js.map