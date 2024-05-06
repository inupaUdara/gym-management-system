import ServiceRequest from "../models/serviceRequest.model.js";
import { errorHandler } from "../utills/error.js";

export const addServiceRequest = async (req, res, next) => {
    try {
        // if (req.user.role !== 'Instructor' || req.user.role !== 'Manager') {
        //     return next(errorHandler(403, "You are not allowed to add items"));
        // }

        const { itemCode, serviceType, serviceDescription, itemName} = req.body;

        if (!itemCode || !serviceType || !serviceDescription || !itemName) {
            return next(errorHandler(400, "All fields are required"));
        }

        const servicerequest = new ServiceRequest({
            itemCode,
            serviceType,
            serviceDescription,
            itemName,
        });

        const savedRequest = await servicerequest.save();

        res.status(201).json(savedRequest);
    } catch (error) {
        next(error);
    }
}



// export const getItems= async (req, res, next) => {
//     if(!req.user.role === 'Manager'){
//         next(errorHandler(403, "You are not access to items"));
//     } 

//     try {
//         const sortDirection = req.query.sort === 'asc' ? 1 : -1;
//         const items = await Inventory.find({
//             ...(req.query.itemId && { _id: req.query.itemId })
//         })
//             .sort({ createdAt: sortDirection });

//         res.status(200).json({items});
        
//     } catch (error) {
//         next(error);
//     }
// }


// export const getItemIns =async (req, res, next) => {	
//     if(!req.user.role === 'Manager' || !req.user.role === 'Admin'){
//         next(errorHandler(403, "You are not access to items"));
//     }

//     try {
//         const { id } = req.params;
//         const item = await Inventory.findById(id);

//         if(!item) {
//             return res.status(404).json({message: 'Item Package not found'});
//         }
//         return res.status(200).json(item);

//     } catch (error) {
//         console.log(error.message);
//         next(errorHandler(500,{message: error.message}));
//     }
// }       

// export const deleteItem = async (req, res, next) => {
//     if (!req.user.role === 'Admin' || !req.user.role === 'Manager') {
//         next(errorHandler(403, "You are not allowed to delete items"));
//     }
//     try {
//         await Inventory.findByIdAndDelete(req.params.itemId)
//         res.status(200).json("Item deletedee successfully");
//     } catch (error) {
//         next(error);
//     }
// }