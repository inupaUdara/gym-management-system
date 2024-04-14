import express from 'express';
import { verifyToken } from "../utills/verifyUser.js";
import { create, gettasks, deletetasks, updatetasks,  } from "../controllers/tasks.controller.js";

const router =  express.Router();

router.post('/create', verifyToken, create)
router.get('/gettasks', verifyToken, gettasks)
router.delete('/deletetasks/:taskId/:userId', verifyToken, deletetasks)
router.put('/updatetasks/:taskId/:userId', verifyToken, updatetasks)

export default router; 