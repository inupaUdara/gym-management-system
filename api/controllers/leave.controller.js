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
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); 
        const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0); 


        const sortDirection = req.query.sort === 'asc' ? 1 : -1;
        const leaves = await Leave.find({
            createdAt: { $gte: new Date(1970, 0, 1), $lt: firstDayOfMonth },
            ...(req.query.leaveId && { _id: req.query.leaveId }),
            ...(req.query.employeeId && { employeeId: req.query.employeeId }),
            ...(req.query.status && { status: req.query.status }),
        }).sort({ createdAt: sortDirection });

        const allLeaves = await Leave.find({
            // createdAt: { $gte: new Date(1970, 0, 1), $lt: firstDayOfMonth },
            ...(req.query.leaveId && { _id: req.query.leaveId }),
            ...(req.query.employeeId && { employeeId: req.query.employeeId }),
            ...(req.query.status && { status: req.query.status }),
        }).sort({ createdAt: sortDirection });

        const leavesByCurrentMonth = await Leave.find({
            createdAt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
            ...(req.query.leaveId && { _id: req.query.leaveId }),
            ...(req.query.employeeId && { employeeId: req.query.employeeId }),
            ...(req.query.status && { status: req.query.status }),
        }).sort({ createdAt: sortDirection});


        
        const AllTotalLeavesByStatus = await Leave.countDocuments(
            { 
                status: req.query.status,
            }
            );

        const totalLeaves = await Leave.countDocuments(
        { 
            status: req.query.status,
            employeeId: req.query.employeeId, 
        }
        );

        const allTotalLeaves = await Leave.countDocuments({
            employeeId: req.query.employeeId,
        });

        const employees = await Leave.aggregate([
            {
                $group: {
                    _id: "$empUsername",
                    totalLeaves: { $sum: 1 }
                }
            }
        ]);

        

        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );

        const lastMonthLeavesByStatus = await Leave.countDocuments({
            createdAt: { $gte: firstDayOfMonth , $lte: lastDayOfMonth },
            status: req.query.status,
            employeeId: req.query.employeeId,
        });

        const lastMonthLeaves = await Leave.countDocuments({
            createdAt: { $gte: firstDayOfMonth , $lte: lastDayOfMonth },
            employeeId: req.query.employeeId,
        });

        res.status(200).json({
            allLeaves,
            leaves,
            leavesByCurrentMonth,
            totalLeaves,
            lastMonthLeaves,
            allTotalLeaves,
            lastMonthLeavesByStatus,
            AllTotalLeavesByStatus,
            employees,
        });
        
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


export const updateLeave = async (req, res, next) => {
    if(!req.user.role === 'Admin' || !req.user.role === 'Manager' || !req.user.role === 'Instructor'){
        next(errorHandler(403, "You are not access to leaves"));
    }

    try {
        const updatedLeave = await Leave.findByIdAndUpdate(req.params.leaveId, 
            {
                $set: {
                    leaveType: req.body.leaveType,
                    startDate: req.body.startDate,
                    endDate: req.body.endDate,
                    reason: req.body.reason,
                    status: req.body.status,
                },
            },
            { new: true });
        res.status(200).json(updatedLeave);
        
    } catch (error) {
        next(error);
    }
}