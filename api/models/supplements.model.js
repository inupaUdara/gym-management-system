import mongoose from "mongoose";

const supplementsSchema = new mongoose.Schema(
    {
        productName:{
            type: String,
            required: true,
        },

        brandName:{
            type: String,
            required: true,
        },

        description:{
            type: String,
            required: true,
        },

        category:{
            type: String,
            required: true,
        },

        price:{
                type: Number,
                required: true,
        },

        sellingPrice:{
            type: Number,
            required: true,
        },

        
        imageUrls:{
            type: Array,
            required: true,
        },
        userRef:{
            type: String,
            required: true,
        },
    }, {timestamps: true
}
);



const Supplements = mongoose.model('Supplements', supplementsSchema);

export default Supplements;