import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
    itemCode: {
        type: String,
        required: true,
        unique: true,
    },
    itemName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    itemStatus: {
        type: String,
        required: true,
    },
    itemPicture: {
        type: Array,
        required: true

    },

}, { timestamps: true });

const Inventory = mongoose.model("Inventory", inventorySchema);
export default Inventory;