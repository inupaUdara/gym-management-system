import Leave from "../models/leave.model.js";
import { errorHandler } from "../utills/error.js";

export const createLeaves = async (req, res, next) => {
    if(!req.user.role === 'Instructor'){
        next(errorHandler(403, "You are not allowed to request a leave"));
    }

    if(!req.body.leaveType || !req.body.startDate || !req.body.endDate || !req.body.reason){
        return next(errorHandler(400, "All field are required"));
    }

    const leave = new Leave({
        ...req.body,
        employeeId: req.user.empId,
        empUsername: req.user.username,
    });

    try {
        const saveLeave = await leave.save();
        res.status(201).json(saveLeave);
        
    } catch (error) {
        next(error);
    }
}

export const getLeaves = async (req, res, next) => {
    if(!req.user.role === 'Manager'){
        next(errorHandler(403, "You are not access to leaves"));
    }

    try {
        const sortDirection = req.query.sort === 'asc' ? 1 : -1;
        const leaves = await Leave.find()
            .sort({ createdAt: sortDirection });

        res.status(200).json({leaves});
        
    } catch (error) {
        next(error);
    }
}

export const getLeaveIns =async (req, res, next) => {	
    if(!req.user.role === 'Instructor' || !req.user.role === 'Admin'){
        next(errorHandler(403, "You are not access to leaves"));
    }

    try {
        const empId = req.user.empId;
        const leaves = await Leave.find({employeeId: empId});
        res.status(200).json({leaves});
    } catch (error) {
        next(error);
    }
}

export const deleteLeave = async (req, res, next) => {
    if(!req.user.role === 'Admin' || !req.user.role === 'Manager' || !req.user.role === 'Instructor'){
        next(errorHandler(403, "You are not access to leaves"));
    }

    try {
        await Leave.findByIdAndDelete(req.params.leaveId)
        res.status(200).json("The leave is deleted");
    } catch (error) {
        next(error)
    }
}