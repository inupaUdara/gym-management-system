import express from 'express';
import { verifyToken } from '../utills/verifyUser.js';
import { addServiceRequest } from '../controllers/serviceRequest.controller.js';

const router = express.Router();

router.post('/addServiceRequest', verifyToken, addServiceRequest);
// router.get('/getItems', verifyToken, getItems);
// router.get('/getItemIns', verifyToken, getItemIns);
// router.delete('/deleteItem/:itemId', verifyToken, deleteItem);
// router.put('/updateItem/:itemId', verifyToken, updateItem);


export default router;