import express from 'express';
import { deleteEmployee, getEmployees, signout } from '../controllers/employee.controller.js';
import { verifyToken } from '../utills/verifyUser.js';

const router = express.Router();

router.post('/signout', signout);
router.get('/getemployee', verifyToken, getEmployees);
router.delete('/deleteemployee/:empId', verifyToken, deleteEmployee);

export default router;