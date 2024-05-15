import mongoose from "mongoose";

const refundRequestSchema = new mongoose.Schema(
  {
    refundId: {
      type: String,
      required: true,
    },
    refundReason: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
    },
    refundDescription: {
      type: String,
      required: true,
    },
    photo: {
      type: String, // We'll store the photo path or URL as a string
      required: false,
    },
    userEmail: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Declined"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const RefundRequest = mongoose.model("RefundRequest", refundRequestSchema);

export default RefundRequest;
