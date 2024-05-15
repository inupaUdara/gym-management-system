import mongoose from "mongoose";

const checkPackageSchema = new mongoose.Schema({
  paymentType: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  termsAccepted: {
    type: Boolean,
    required: true,
  },
  membership: {
    type: String,
    required: true,
  },
  membershipPrice: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  cardDetails: {
    type: {
      number: { type: String },
      expiry: { type: String },
      cvv: { type: String },
    },
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PaymentPackage = mongoose.model("PaymentPackage", checkPackageSchema);

export default PaymentPackage;
