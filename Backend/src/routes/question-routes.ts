import { Router } from "express";
import {
  getQuestions,
  getAllQuestions,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  test
} from "../controllers/question-controller.js";

const questionRoutes = Router();

console.log("Question Routes Loaded");
questionRoutes.get("/test", test); // Test endpoint to check if routes are workin
questionRoutes.post("/add", addQuestion);
questionRoutes.get("/get", getAllQuestions);
questionRoutes.put("/:id", updateQuestion);
questionRoutes.delete("/:id", deleteQuestion);
questionRoutes.get("/:category",getQuestions);

export default questionRoutes;
