import express from "express";
import { generate } from "../controllers/generateController.js";

const router = express.Router();

// ✅ POST route
router.post("/generate", generate);

export default router;