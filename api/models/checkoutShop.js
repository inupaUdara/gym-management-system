import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    paymentId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
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
    company: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      required: true,
    },
    apartment: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    termsAndConditions: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    productName: {
      type: String,
      default: "ISO100 Dymatize ISO100 Hydrolyzed",
    },
    brandName: {
      type: String,
      default: "Dymatize",
    },
    description: {
      type: String,
      default: "Whey Protein Isolate 2.3KGFlavours: Fudge Brownie",
    },
    category: {
      type: String,
      default: "Supplement",
    },
    sellingPrice: {
      type: String,
      default: "Rs .36,990.00",
    },
    shippingMethod: {
      type: String,
      required: true,
      default: "store_pickup",
    },
    shippingfee: {
      type: String,
      default: "59.00",
    },
    paymentMethod: {
      type: String,
      required: true,
      default: "pay-on-delivery",
    },
    // cardDetails: {
    //   type: {
    //     number: { type: String },
    //     expiry: { type: String },
    //     cvv: { type: String },
    //   },
    //   default: "",
    // },
  },
  { timestamps: true }
);

const PaymentShop = mongoose.model("PaymentShop", paymentSchema);

export default PaymentShop;
