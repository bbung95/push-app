import mongoose from "mongoose";

const FriendSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    target_id: {
        type: String,
        required: true,
    },
    created_date: {
        type: Date,
        default: () => new Date(),
    },
});

export default mongoose.models.Friend || mongoose.model("Friend", FriendSchema);
