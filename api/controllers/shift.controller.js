import ShiftChangeRequest from "../models/shift.model.js";
import { errorHandler } from "../utills/error.js";

export const createShiftChangeRequest = async (req, res, next) => {
    if(!req.user.role === 'Instructor'){
        next(errorHandler(403, "You are not allowed to request a shift change"));
    }

    const countShiftChange = await ShiftChangeRequest.countDocuments(
        {
            employeeId: req.user.empId,
            status: "Pending",
        }
    )

    if(countShiftChange === 1){
        return next(errorHandler(400, "You already have a pending request"));
    }


    if(!req.body.shiftName || !req.body.reason){
        return next(errorHandler(400, "All fields are required"));
    }

    const shiftChangeReq = new ShiftChangeRequest({
        ...req.body,
        employeeId: req.user.empId,
        employeeName: req.user.name,
    });

    try {
        const saveShiftChangeReq = await shiftChangeReq.save();
        res.status(201).json(saveShiftChangeReq);
        
    } catch (error) {
        next(error);
    }
};

export const getShiftChangeRequestsById = async (req, res, next) => {
    if(!req.user.role === 'Instructor' || !req.user.role === 'Admin'){
        next(errorHandler(403, "You are not access to leaves"));
    }

    try {
        const empId = req.user.empId;
        const shiftCahnge = await ShiftChangeRequest.find({employeeId: empId});
        res.status(200).json({shiftCahnge});
    } catch (error) {
        next(error);
    }
};


export const getShiftChangeRequests = async (req, res, next) => {
    if(!req.user.role === 'Manager'){
        next(errorHandler(403, "You are not access to leaves"));
    }

    try {
        const shiftChanges = await ShiftChangeRequest.find({
                ...(req.query.shiftChangeId && { _id: req.query.shiftChangeId }),
                ...(req.query.employeeId && { employeeId: req.query.employeeId }),
            }
        );
    
        res.status(200).json({shiftChanges});
    } catch (error) {
        next(error);
    }
    
};


export const updateShiftByStatus = async (req, res, next) => {
    if(!req.user.role === 'Admin' || !req.user.role === 'Manager'){
        next(errorHandler(403, "You are not access to shifts"));
    }

    try {
        const updatedStatus = await ShiftChangeRequest.findByIdAndUpdate(req.params.shiftId, 
            {
                $set: {
                   
                    status: req.body.status,
                },
            },
            { new: true });
        res.status(200).json(updatedStatus);
        
    } catch (error) {
        next(error);
    }
}