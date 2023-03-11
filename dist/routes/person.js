import express from "express";
import protect from "../middleware/authMiddleware.js";
import { registerPerson, loginPerson, getPerson, } from "../controllers/personController.js";
const router = express.Router();
router.post("/", registerPerson);
router.post("/login", loginPerson);
router.get("/current", protect, getPerson);
export default router;
