import { Router } from "express";
import userRoutes from "./user-routes.js";
import chatRoutes from "./chat-routes.js";
import questionRoutes from "./question-routes.js";

const appRouter = Router();

appRouter.use("/questions", questionRoutes); //domain/api/v1/questions
appRouter.use("/user", userRoutes); //domain/api/v1/user
appRouter.use("/chat", chatRoutes); //domain/api/v1/chats

export default appRouter;
