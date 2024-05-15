import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    seenBy: {
        type: [String],
        default: [],
    },
}, { timestamps: true });

const Announcement = mongoose.model("Announcemnt", announcementSchema);

export default Announcement;
