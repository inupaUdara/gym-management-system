import express from "express";
import { createSupplements } from "../controllers/supplements.controller.js";
import { verifyToken } from "../utills/verifyUser.js";

const router = express.Router();

router.post('/create', verifyToken, createSupplements);

export default router;