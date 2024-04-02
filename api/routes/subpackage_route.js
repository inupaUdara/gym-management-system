import express from "express";
import { addSubPackage, getSubPackage, getIdSubPackage } from "../controllers/subpackage_controller.js";

const router = express.Router();

router.post('/addSubPackage', addSubPackage);
router.get('/getSubPackage', getSubPackage);
router.get('/getIdSubPackage/:id', getIdSubPackage);

export default router;