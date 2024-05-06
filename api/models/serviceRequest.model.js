import mongoose from "mongoose";

const serviceRequestSchema = new mongoose.Schema({
    itemCode: {
        type: String,
        required: true,
    },
    serviceType: {
        type: String,
        required: true,
    },
    serviceDescription: {
        type: String,
        required: true,
    },
    itemName: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const ServiceRequest = mongoose.model("ServiceRequest", serviceRequestSchema);
export default ServiceRequest;