import express from 'express';
import { verifyToken } from '../utills/verifyUser.js';
import { createShiftChangeRequest, getShiftChangeRequestsById, getShiftChangeRequests, updateShiftByStatus } from '../controllers/shift.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createShiftChangeRequest);
router.get('/getShiftChangeReq/:empId', verifyToken, getShiftChangeRequestsById);
router.get('/getShiftChanges', verifyToken, getShiftChangeRequests);
router.put('/updateStatus/:shiftId', verifyToken, updateShiftByStatus);
export default router;
