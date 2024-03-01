import Employee from "../models/employee.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utills/error.js";
import jwt from "jsonwebtoken";
export const create = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    name === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const nameToUsername = name.split(" ").join("") +  + Math.random().toString(9).slice(-4);
  const newEmployee = new Employee({
    name,
    username: nameToUsername,
    email,
    password: hashedPassword,
  });
  try {
    await newEmployee.save();
    res.json("Employee created");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password || username === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    const validEmployee = await Employee.findOne({ username });
    if (!validEmployee) {
      next(errorHandler(404, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(
      password,
      validEmployee.password
    );
    if (!validPassword) {
      return next(errorHandler(400, "Invalid credentials"));
    }
    const token = jwt.sign(
      {
        empId: validEmployee._id,
      },
      process.env.JWT_SECRET_EMP
    );
    
    const { password: pass, ...rest} = validEmployee._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
