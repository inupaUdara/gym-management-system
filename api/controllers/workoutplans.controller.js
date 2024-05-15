import Workout from "../models/workoutplans.model.js";

export const Workoutplans = async (req, res) => {
  const {
    name,
    age,
    gender,
    number,
    email,
    h1,
    h2,
    h3,
    h4,
    h5,
    f1,
    f2,
    f3,
    f4,
    f5,
    l1,
    l2,
    l3,
    l4,
    addi,
  } = req.body;

  try {
    const workoutdetails = await Workout.create({
      name,
      age,
      gender,
      number,
      email,
      h1,
      h2,
      h3,
      h4,
      h5,
      f1,
      f2,
      f3,
      f4,
      f5,
      l1,
      l2,
      l3,
      l4,
      addi,
      userID: req.user.id 
    });

    res.status(201).json(workoutdetails);
  } catch (error) {
    console.error("Error Submitting Details", error);
    res
      .status(422)
      .json({ message: "Failed To Submit Details", error: error.message });
  }
};

export const getUserWorkoutPlanRequest = async (req, res, next) => {
  // if(!req.user.role === 'Instructor'){
  //     next(errorHandler(403, "You are not access to user workout requests"));
  // }

  try {
      const UserWorkoutRequest = await Workout.find({
              ...(req.query.userWorkoutReqId && { _id: req.query.userWorkoutReqId }),
              // ...(req.query.userId && { employeeId: req.query.userId }),
          }
      );
  
      res.status(200).json({UserWorkoutRequest});
  } catch (error) {
      next(error);
  }
  
};
