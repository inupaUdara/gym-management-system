import express from 'express';
import { verifyToken } from '../utills/verifyUser.js';
import { addServiceRequest, getRequests, getRequestIns, deleteRequest, updateRequest } from '../controllers/servicerequest.controller.js';

const router = express.Router();

router.post('/addServiceRequest', verifyToken, addServiceRequest);
router.get('/getRequests', verifyToken, getRequests);
router.get('/getRequestIns/:requestId', verifyToken, getRequestIns);
router.delete('/deleteRequest/:requestId', verifyToken, deleteRequest);
router.put('/updateRequest/:requestId', verifyToken, updateRequest);


export default router;