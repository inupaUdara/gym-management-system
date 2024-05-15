import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
    name: String,
    age: String ,
    gender: String,
    number:String,
    email:String,
    h1:String,
    h2:String,
    h3:String,
    h4:String,
    h5:String,
    f1:String,
    f2:String,
    f3:String,
    f4:String,
    f5:String,
    l1:String,
    l2:String,
    l3:String,
    l4:String,
    addi:String,
    userID:String,
}, {timestamps: true});

const Workout = mongoose.model('Workout',workoutSchema);

export default Workout;
