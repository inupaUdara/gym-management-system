import SubPackage from "../models/subpackage_model.js";
import { errorHandler } from "../utills/error.js";

//save a package
export const addSubPackage = async (req, res, next) => {
    try {
        if(!req.body.subPackageName || !req.body.price || !req.body.validTime || !req.body.description || !req.body.note1 || !req.body.note2 || !req.body.note3){
           return res.status(400).send({
                message: `Send all required fields: subPackageName, price, validTime, description, note1, note2, note3`,
           });
        }
        
        const newSubPackage = {

            subPackageName: req.body.subPackageName,
            price: req.body.price,
            validTime: req.body.validTime,
            description: req.body.description,
            note1: req.body.note1,
            note2: req.body.note2,
            note3: req.body.note3,
        };

        const NwSubPackage = await SubPackage.create(newSubPackage);
        return res.status(201).send(NwSubPackage);
        
    } catch (error) {
        console.log(error.message);
        next(errorHandler(500,{message: error.message}));
      }
}

//get all subscription package from db
export const getSubPackage = async (req, res, next) => {
    try {
        const NwSubPackages = await SubPackage.find({});

        return res.status(200).json({
            count: NwSubPackages.length,
            data: NwSubPackages
        });

    } catch (error) {
        console.log(error.message);
        next(errorHandler(500,{message: error.message}));
    }
}

//get all packages from db by id
export const getIdSubPackage = async (req, res, next) => {
    try {
        
        const { id } = req.params;
        const NwSubPackage = await SubPackage.findById(id);


        if(!NwSubPackage) {
            return res.status(404).json({message: 'Subsciption Package not found'});
        }
        return res.status(200).json(NwSubPackage);

    } catch (error) {
        console.log(error.message);
        next(errorHandler(500,{message: error.message}));
    }
}
