import express from 'express';
import { createWorkout, deleteWorkout, getCreateWorkouts, updateWorkout } from '../controllers/CreateWorkout.controller.js';
import { verifyToken } from '../utills/verifyUser.js';



const router = express.Router();

router.post("/create", verifyToken, createWorkout);
router.get('/getWorkout', verifyToken, getCreateWorkouts);
router.delete('/deleteWorkout/:workoutId', verifyToken, deleteWorkout);
router.put('/updateWorkout/:workoutId', verifyToken, updateWorkout)
export default router;