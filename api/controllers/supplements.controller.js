import Supplements from "../models/supplements.model.js";

export const createSupplements = async (req, res, next) => {

    try {
        const supplements = await Supplements.create(req.body);
        return res.status(201).json(supplements);
    } catch (error) {
        next(error);
    }

};