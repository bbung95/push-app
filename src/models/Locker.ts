import mongoose from "mongoose";

const LockerSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    push_id: {
        type: String,
        required: true,
    },
    created_date: {
        type: Date,
        default: () => new Date(),
    },
});

export default mongoose.models.Locker || mongoose.model("Locker", LockerSchema);
