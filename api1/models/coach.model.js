import mongoose from "mongoose";

const coachSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        // unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
    cname: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    msg: {
        type: String,
    },
}, { timestamps: true });

const Employee = mongoose.model("Coach", coachSchema);
export default Coach;