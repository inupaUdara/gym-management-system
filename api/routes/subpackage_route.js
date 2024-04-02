import express from "express";
import { addSubPackage, getSubPackage, getIdSubPackage, updateSubPackage, deleteSubPackage } from "../controllers/subpackage_controller.js";

const router = express.Router();

router.post('/addSubPackage', addSubPackage);
router.get('/getSubPackage', getSubPackage);
router.get('/getIdSubPackage/:id', getIdSubPackage);
router.put('/updateSubPackage/:id', updateSubPackage);
router.delete('/deleteSubPackage/:id', deleteSubPackage);

export default router;