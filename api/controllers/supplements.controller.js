import Supplements from "../models/supplements.model.js";
import { errorHandler } from "../utills/error.js";


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

        const supplementId = req.query.supplementId;

    const query = supplementId ? { supplementId } : {};

      // Find supplements by IDs
      const supplements = await Supplements.find({ 
        productName:{$regex:new RegExp(searchQuery,'i')},
        ...(req.query.supplementId && { _id: req.query.supplementId}),
        ...(req.query.productName && { productName: req.query.productName}),
        ...(req.query.sellingPrice && { sellingPrice: req.query.sellingPrice}),
        ...(req.query.imageUrl && { imageUrls: req.query.imageUrl}),
       });


       const totalSupplements = await Supplements.countDocuments(); // Count total supplements

  
      res.status(200).json({ 
        supplements ,
        totalSupplements,
    
    });
    } catch (error) {
      next(error);
    }
  };

  export const getAllSupplementsById = async (req, res, next) => {
    try {

        const query = supplementId ? { supplementId } : {};
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
    // if(!req.user.role === 'Manager'){
    //     next(errorHandler(403, "You are not access to leaves"));
    // }

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
