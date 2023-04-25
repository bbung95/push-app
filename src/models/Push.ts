import mongoose from "mongoose";

const PushSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    target_id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    created_date: {
        type: Date,
        default: () => new Date(),
    },
});

export default mongoose.models.Push || mongoose.model("Push", PushSchema);
