import express from "express";
import { addSubPackage, getSubPackage } from "../controllers/subpackage_controller.js";

const router = express.Router();

router.post('/addSubPackage', addSubPackage);
router.get('/getSubPackage', getSubPackage);

export default router;