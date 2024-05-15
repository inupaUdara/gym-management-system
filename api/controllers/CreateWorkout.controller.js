import CreateWorkout from "../models/CreateWorkout.js";
import { errorHandler } from "../utills/error.js";

export const createWorkout = async (req, res, next) => {
    if(!req.user.role === 'Instructor'){
        next(errorHandler(403, "You are not allowed to request a leave"));
    }

    if(!req.body.memberId || !req.body.validDate || !req.body.plan || !req.body.planType){
        return next(errorHandler(400, "All field are required"));
    }

    const workout = new CreateWorkout({
        ...req.body,
    });

    try {
        const saveWorkout = await workout.save();
        res.status(201).json(saveWorkout);
        
    } catch (error) {
        next(error);
    }
}

export const getCreateWorkouts = async (req, res, next) => {
    if(!req.user.role === 'Instructor'){
        next(errorHandler(403, "You are not access to leaves"));
    }

    try {
        const workouts = await CreateWorkout.find({
                ...(req.query.workoutsId && { _id: req.query.workoutsId }),
                ...(req.query.userId && { memberId: req.query.userId }),
               
            }
        );
    
        res.status(200).json({workouts});
    } catch (error) {
        next(error);
    }
    
};


export const deleteWorkout = async (req, res, next) => {
    if(!req.user.role === 'Instructor'){
        next(errorHandler(403, "You are not access to leaves"));
    }

    try {
        await CreateWorkout.findByIdAndDelete(req.params.workoutId)
        res.status(200).json("The workout is deleted");
    } catch (error) {
        next(error)
    }
}


export const updateWorkout = async (req, res, next) => {
    if(!req.user.role === 'Instructor'){
        next(errorHandler(403, "You are not access to leaves"));
    }

    try {
        const updatedWorkout = await CreateWorkout.findByIdAndUpdate(req.params.workoutId, 
            {
                $set: {
                    memberId: req.body.memberId,
                    planType: req.body.planType,
                    validDate: req.body.validDate,
                    plan: req.body.plan,
                },
            },
            { new: true });
        res.status(200).json(updatedWorkout);
        
    } catch (error) {
        next(error);
    }
}