import Employee from "../models/employee.model.js";
import { errorHandler } from "../utills/error.js";
export const signout = (req, res, next) => {
    try {
        res
          .clearCookie("access_token")
          .status(200)
          .json("User has been signed out");
      } catch (error) {
        next(error);
      }
}

export const getEmployees = async (req, res, next) => {
  if(!req.user.isAdmin) {
    return next(errorHandler(403, "You are not authorized to access employees details"));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'asc' ? 1 : -1;
    const role = req.query.role;
    const employees = await Employee.find({role})
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const employeesWithoutPassword = employees.map((employee) => {
      const { password, ...rest } = employee._doc;
      return rest;
    });

    const totalEmployees = await Employee.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthEmployees = await Employee.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      employees: employeesWithoutPassword,
      totalEmployees,
      lastMonthEmployees,
    });
  } catch (error) {
    next(error);
  }
}


export const deleteEmployee = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.id !== req.params.empId) {
    return next(errorHandler(403, "You are not allowed to delete this user"));
  }
  try {
    await Employee.findByIdAndDelete(req.params.empId);
    res.status(200).json("Employee has been deleted");
  } catch (error) {
    next(error);
  }
};