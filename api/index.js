import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import employeeRoutes from "./routes/employee.route.js";
import authEmployeeRoutes from "./routes/authEmployee.route.js";
import leaveRoutes from "./routes/leave.route.js";

import createWorkoutRoutes from "./routes/CreateWorkout.route.js";
import workoutRoutes from "./routes/workoutplans.route.js";

import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.route.js";
import taskRoutes from "./routes/tasks.route.js";
import supplementsRoutes from "./routes/supplements.route.js";
import shiftChangeRoute from "./routes/shift.route.js";
import cookieParser from "cookie-parser";
import SubpackageRoutes from "./routes/subpackage_route.js";
import announcementRoutes from "./routes/announcement.route.js";

import checkoutShopRoutes from "./routes/checkoutShop.route.js";
import shippingRoutes from "./routes/shipping.route.js";

import inventoryRoutes from "./routes/inventory.route.js";
import ServiceRequestRoutes from "./routes/serviceRequest.route.js";
import emailRoutes from "./routes/email.route.js";

import refundRoutes from "./routes/refundRequest.route.js";

import booksRoute from "./routes/booksRoute.js";

import cors from "cors";
import path from "path";
dotenv.config();

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => {
    console.log(err);
  });
  
  const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/api/employee", employeeRoutes);
app.use("/api/authemployee", authEmployeeRoutes);
app.use("/api/leave", leaveRoutes);

app.use("/api/workoutplans", workoutRoutes);
app.use("/api/createworkoutplans", createWorkoutRoutes);

app.use("/api/subpackage", SubpackageRoutes);

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/shiftchange", shiftChangeRoute);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/shiftchange", shiftChangeRoute);

app.use("/api/supplements", supplementsRoutes);
app.use("/api/announcement", announcementRoutes);

app.use("/api/pay", checkoutShopRoutes);
app.use("/api/shipping", shippingRoutes);
app.use("/api/refunds", refundRoutes);

app.use("/api/email", emailRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/serviceRequest", ServiceRequestRoutes);

app.use("/api/books", booksRoute);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
