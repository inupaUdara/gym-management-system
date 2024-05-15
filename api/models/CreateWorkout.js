import mongoose from "mongoose";

const CreateWorkoutSchema = new mongoose.Schema({
    memberId: {
        type: String,
        required: true,
    },
    planType: {
        type: String,
        required: true,
    },
 
    validDate: {
        type: Date,
        required: true,
    },
  
    plan: {
        type: String,
        required: true,
    },
    

}, {timestamps: true});

const CreateWorkout = mongoose.model('CreateWorkout',CreateWorkoutSchema);

export default CreateWorkout;
