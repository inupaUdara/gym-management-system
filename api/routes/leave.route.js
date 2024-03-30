import express from 'express';
import { verifyToken } from '../utills/verifyUser.js';
import { createLeaves, getLeaves, getLeaveIns, deleteLeave } from '../controllers/leave.controller.js';

const router = express.Router();

router.post('/createleave', verifyToken, createLeaves);
router.get('/getleave', verifyToken, getLeaves);
router.get('/getleavein/:empId', verifyToken, getLeaveIns);
router.delete('/deleteleave/:leaveId', verifyToken, deleteLeave);

export default router;