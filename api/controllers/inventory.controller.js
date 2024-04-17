import Inventory from "../models/inventory.model.js";
import { errorHandler } from "../utills/error.js";

export const addItems = async (req, res, next) => {
    try {
        if (req.user.role !== 'Manager') {
            return next(errorHandler(403, "You are not allowed to add items"));
        }

        const { itemCode, itemName, description, quantity, itemStatus } = req.body;

        if (!itemCode || !itemName || !description || !quantity || !itemStatus) {
            return next(errorHandler(400, "All fields are required"));
        }

        const item = new Inventory({
            itemCode,
            itemName,
            description,
            quantity,
            itemStatus
        });

        const savedItem = await item.save();

        res.status(201).json(savedItem);
    } catch (error) {
        next(error);
    }
}

export const getItems= async (req, res, next) => {
    if(!req.user.role === 'Manager'){
        next(errorHandler(403, "You are not access to items"));
    } 

    try {
        const sortDirection = req.query.sort === 'asc' ? 1 : -1;
        const items = await Inventory.find({
            ...(req.query.itemId && { _id: req.query.itemId })
        })
            .sort({ createdAt: sortDirection });

        res.status(200).json({items});
        
    } catch (error) {
        next(error);
    }
}


export const getItemIns =async (req, res, next) => {	
    if(!req.user.role === 'Manager' || !req.user.role === 'Admin'){
        next(errorHandler(403, "You are not access to items"));
    }

    try {
        const { id } = req.params;
        const item = await Inventory.findById(id);

        if(!item) {
            return res.status(404).json({message: 'Item Package not found'});
        }
        return res.status(200).json(item);

    } catch (error) {
        console.log(error.message);
        next(errorHandler(500,{message: error.message}));
    }
}       



// export const getItemIns =async (req, res, next) => {	
//     if(!req.user.role === 'Manager' || !req.user.role === 'Admin'){
//         next(errorHandler(403, "You are not access to items"));
//     }

//     try {
//         const itemId = req.inventory.itemId;
//         const item = await Inventory.find(req.params.itemId);
//         res.status(200).json({item});
//     } catch (error) {
//         next(error);
//     }
// }



export const deleteItem = async (req, res, next) => {
    if (!req.user.role === 'Admin' || !req.user.role === 'Manager') {
        next(errorHandler(403, "You are not allowed to delete items"));
    }
    try {
        await Inventory.findByIdAndDelete(req.params.itemId)
        res.status(200).json("Item deletedee successfully");
    } catch (error) {
        next(error);
    }
}


export const updateItem = async (req, res, next) => {
    if(!req.user.role === 'Admin' || !req.user.role === 'Manager'){
        next(errorHandler(403, "You are not access to leaves"));
    }

    try {
        const updatedItem = await Inventory.findByIdAndUpdate(req.params.itemId, 
            {
                $set: {
                    itemCode: req.body.itemCode,
                    itemName: req.body.itemName,
                    description: req.body.description,
                    quantity: req.body.description,
                },
            },
            { new: true });
        res.status(200).json(updatedItem);
        
    } catch (error) {
        next(error);
    }
}
// export const updateItem = async (req, res, next) => {
//     try {
//         if (req.user.role !== 'Manager') {
//             return next(errorHandler(403, "You are not allowed to update items"));
//         }

//         const { itemId } = req.params;
//         const { itemCode, itemName, description, quantity} = req.body;

//         if (!itemCode || !itemName || !description || !quantity) {
//             return next(errorHandler(400, "All fields are required"));
//         }

//         const updatedItem = await Inventory.findByIdAndUpdate( req.params.itemId, {
//             itemCode,
//             itemName,
//             description,
//             quantity
//         }, { new: true });

//         if (!updatedItem) {
//             return next(errorHandler(404, "Item not found"));
//         }

//         res.status(200).json(updatedItem);
//     } catch (error) {
//         next(error);
//     }
// }
