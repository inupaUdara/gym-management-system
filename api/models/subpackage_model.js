import mongoose from "mongoose";

const SubpackageShema = mongoose.Schema(
    {
        subPackageName: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        validTime: {
            type: String,
            required: true,
            default: '1 Month',
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
        },
        Pactype: {
            type: String,
            //required: true,
            default: 'SubscriptionPackage'
        },
        startDate: {
            type: Date
        },
        endDate: {
            type: Date
        },
        status: {
            type: String,
            default: 'Pending'
        }   
    }, {timestamps: true}
);
const SubPackage = mongoose.model('subPackage', SubpackageShema);

export default SubPackage;