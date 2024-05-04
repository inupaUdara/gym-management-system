import Supplements from "../models/supplements.model.js";
import { errorHandler } from "../utills/error.js";
// import User from "../models/user.model.js";

export const createSupplements = async (req, res, next) => {

    try {
        const supplements = await Supplements.create(req.body);
        return res.status(201).json(supplements);
    } catch (error) {
        next(error);
    }

};



export const getAllSupplements = async (req, res, next) => {
    try {
      
        const searchQuery = req.query.search || ''  ;
      // Find supplements by IDs
      const supplements = await Supplements.find({ 
        productName:{$regex:new RegExp(searchQuery,'i')},
        ...(req.query.supplementId && { _id: req.query.supplementId})
       });
  
      res.status(200).json({ supplements });
    } catch (error) {
      next(error);
    }
  };

  export const getAllSupplementsById = async (req, res, next) => {
    try {
      const supplements = await Supplements.findById(req.params.id);
      if (!supplements) {
        return next(errorHandler(404, 'Listing not found!'));
      }
      res.status(200).json(supplements);
    } catch (error) {
      next(error);
    }
  };
  

export const deleteSupplement = async (req, res, next) => {
    if(!req.user.role === 'Admin' || !req.user.role === 'Manager'){
        next(errorHandler(403, "You are not access to leaves"));
    }

    try {
        await Supplements.findByIdAndDelete(req.params.supplementId)
        res.status(200).json("The supplement is deleted");
    } catch (error) {
        next(error);
    }
}

export const updateSupplements = async (req, res, next) => {
    if(!req.user.role === 'Admin' || !req.user.role === 'Manager'){
        next(errorHandler(403, "You are not access to delete"));
    }

    try {
        const updateSupplement = await Supplements.findByIdAndUpdate(
            req.params.supplementId, 
            {
                $set: {
                    productName: req.body.productName,
                    brandName: req.body.brandName,
                    description: req.body.description,
                    category: req.body.category,
                    price: req.body.price,
                    sellingPrice: req.body.sellingPrice,
                    imageUrls: req.body.imageUrls,
                },
            },
            { new: true });
        res.status(200).json(updateSupplement);
        
    } catch (error) {
        next(error);
    }
}
