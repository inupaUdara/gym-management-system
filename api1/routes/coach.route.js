import express from 'express';
import { handleSubmit, updateAppointment, handleDelete } from '../controllers/coach.controller.js';

const router = express.Router();

router.get('/getUser/:id');
router.post('/createUser');
router.put('/updateUser/:id');
router.delete('/deleteUser/:id');

export default router;