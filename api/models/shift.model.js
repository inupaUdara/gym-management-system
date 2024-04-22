import mongoose from "mongoose";

const shiftSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: true,
    },
    employeeName: {
        type: String,
        required: true,
    },
    shiftName: {
        type: String,
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

const ShiftChangeRequest = mongoose.model("ShiftChangeRequest", shiftSchema);

export default ShiftChangeRequest;