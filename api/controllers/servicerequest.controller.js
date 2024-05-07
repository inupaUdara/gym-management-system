import ServiceRequest from "../models/serviceRequest.model.js";
import { errorHandler } from "../utills/error.js";

export const addServiceRequest = async (req, res, next) => {
    try {
        const { itemCode, serviceType, serviceDescription,itemName, _id } = req.body;

        if (!itemCode || !serviceType || !serviceDescription || !itemName || !_id) {
            return next(errorHandler(400, "All fields are required"));
        }

        const serviceRequest = new ServiceRequest({
            itemCode,
            serviceType,
            serviceDescription,
            itemName,
            itemID: _id, // Correcting to "itemId" based on your model
        });

        const savedRequest = await serviceRequest.save();

        res.status(201).json(savedRequest);
    } catch (error) {
        next(error);
    }
}


export const getRequests= async (req, res, next) => {

    try {
        const sortDirection = req.query.sort === 'asc' ? 1 : -1;
        const requests = await ServiceRequest.find({
            ...(req.query.requestId && { _id: req.query.requestId })
        })
            .sort({ createdAt: sortDirection });

        res.status(200).json({requests});
        
    } catch (error) {
        next(error);
    }
}


export const getRequestIns =async (req, res, next) => {	

    try {
        const {requestId} = req.params;
        const request = await ServiceRequest.findById(requestId);

        if(!request) {
            return res.status(404).json({message: 'Service Recrod not found'});
        }
        return res.status(200).json(request);

    } catch (error) {
        console.log(error.message);
        next(errorHandler(500,{message: error.message}));
    }
}       

export const deleteRequest = async (req, res, next) => {
    try {
        const {requestId} = req.params;
        const result = await ServiceRequest.findByIdAndDelete(requestId);
        if (!result){
            return res.status(404).json({ message: `Package not Found` });
        }
        res.status(200).json("Service Record deleted successfully");
    } catch (error) {
        next(error);
    }
}

export const updateRequest = async (req, res, next) => {

    try {
        const updatedRequest = await ServiceRequest.findByIdAndUpdate(req.params.requestId, 
            {
                $set: {
                    itemCode: req.body.itemCode,
                    serviceType: req.body.itemName,
                    serviceDescription: req.body.description,
                    itemName: req.body.quantity,
                    serviceStatus: req.body.status
                },
            },
            { new: true });
        res.status(200).json(updatedRequest);
        
    } catch (error) {
        next(error);
    }
}