import express from "express";
import { createSupplements, getAllSupplements, deleteSupplement, updateSupplements } from "../controllers/supplements.controller.js";
import { verifyToken } from "../utills/verifyUser.js";

const router = express.Router();

router.post('/createSupplements', verifyToken, createSupplements);
 router.get('/getAllSupplements', verifyToken, getAllSupplements);
 router.delete('/deleteSupplement/:supplementId', verifyToken, deleteSupplement);
 router.put('/updateSupplements/:supplementId', verifyToken,updateSupplements)
// router.get('/getAllSupplements', getAllSupplements);

export default router;
