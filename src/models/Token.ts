import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    created_date: {
        type: Date,
        default: () => new Date(),
    },
});

export default mongoose.models.Token || mongoose.model("Token", TokenSchema);
