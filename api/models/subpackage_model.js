import mongoose from "mongoose";

const SubpackageShema = mongoose.Schema(
    {
        subPackageName: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        validTime: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true
        },
        note1: {
            type: String,
            required: true
        },
        note2: {
            type: String,
            required: true
        },
        note3: {
            type: String,
            required: true
        }
        
    }
);
const SubPackage = mongoose.model('subPackage', SubpackageShema);

export default SubPackage;