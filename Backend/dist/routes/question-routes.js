import { Router } from "express";
import { addQuestion, deleteQuestion, getAllQuestions, getQuestions, updateQuestion, } from "../controllers/question-controller.js";
const router = Router();
router.post("/add", addQuestion);
router.get("/get", getAllQuestions);
router.get("/:category", getQuestions);
router.put("/update/:id", updateQuestion);
router.delete("/delete/:id", deleteQuestion);
export default router;
//# sourceMappingURL=question-routes.js.map