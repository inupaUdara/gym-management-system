import express from 'express';
import { verifyToken } from '../utills/verifyUser.js';
import { addItems, getItems, getItemIns, deleteItem, updateItem } from '../controllers/inventory.controller.js';

const router = express.Router();

router.post('/addItems', verifyToken, addItems);
router.get('/getItems', verifyToken, getItems);
router.get('/getItemIns', verifyToken, getItemIns);
router.delete('/deleteItem/:itemId', verifyToken, deleteItem);
router.put('/updateItem/:itemId', verifyToken, updateItem);


export default router;