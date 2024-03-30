import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import employeeRoutes from "./routes/employee.route.js";
import authEmployeeRoutes from "./routes/authEmployee.route.js";
import leaveRoutes from "./routes/leave.route.js";
import cookieParser from "cookie-parser";
dotenv.config();

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/api/employee", employeeRoutes);
app.use("/api/authemployee", authEmployeeRoutes);
app.use("/api/leave", leaveRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ 
    success: false,
    statusCode,
    message
   });
})