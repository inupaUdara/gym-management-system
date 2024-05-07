import express from "express";
import {
  createSupplements,
  getAllSupplements,
  deleteSupplement,
  updateSupplements,
} from "../controllers/supplements.controller.js";
import { verifyToken } from "../utills/verifyUser.js";

const router = express.Router();

router.post("/createSupplements", verifyToken, createSupplements);
router.get("/getAllSupplements", getAllSupplements);
router.delete("/deleteSupplement/:supplementId", deleteSupplement);
router.put("/updateSupplements/:supplementId", verifyToken, updateSupplements);
// router.get('/getAllSupplements', getAllSupplements);

router.post("/create", verifyToken, createSupplements);
export default router;
