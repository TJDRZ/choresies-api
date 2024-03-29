import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getChores, createChore, updateName, updateIndex, updateDate, updateTimer, deleteChore, } from "../controllers/choreController.js";
const router = express.Router();
router.get("/:person", protect, getChores);
router.post("/", protect, createChore);
router.put("/nameChange", protect, updateName);
router.put("/updateIndex", protect, updateIndex);
router.put("/updateDate", protect, updateDate);
router.put("/updateTimer", protect, updateTimer);
router.delete("/", protect, deleteChore);
export default router;
