import express from "express";
import { verifyToken } from '../utills/verifyUser.js';
import { Workoutplans, getUserWorkoutPlanRequest } from "../controllers/workoutplans.controller.js";

const router = express.Router();

router.post("/create",verifyToken, Workoutplans);
router.get('/getWorkoutUserRequests',verifyToken,getUserWorkoutPlanRequest);

export default router;
