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
        type: String,
        default: "https://i.pngimg.me/thumb/f/720/m2H7G6b1A0A0G6Z5.jpg",
    },
}, { timestamps: true });

const Inventory = mongoose.model("Inventory", inventorySchema);
export default Inventory;