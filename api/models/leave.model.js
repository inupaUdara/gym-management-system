import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: true,
    },
    empUsername: {
        type: String,
        required: true,
    },
    leaveType: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "Pending",
    },
}, { timestamps: true });

const Leave = mongoose.model("Leave", leaveSchema);

export default Leave;