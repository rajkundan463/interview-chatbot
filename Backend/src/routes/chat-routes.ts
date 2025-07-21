import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
// import { chatCompletionValidator, validate } from "../utils/validators.js";
import {
  deleteChats,
  generateChatCompletion,
  sendChatsToUser,
} from "../controllers/chat-controllers.js";

//Protected API
const chatRoutes = Router();
// chatRoutes.post(
//   "/new",
//   validate(chatCompletionValidator),
//   verifyToken,
//   generateChatCompletion
// );

chatRoutes.get("/all-chats/:category/:questionId", verifyToken, sendChatsToUser);
chatRoutes.delete("/delete", verifyToken, deleteChats);
chatRoutes.post("/:category/:questionId",verifyToken,generateChatCompletion);

export default chatRoutes;
