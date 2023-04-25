import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    nickname: {
        type: String,
        unique: true,
    },
    proflie_img: {
        type: String,
        required: true,
        default: "https://via.placeholder.com/150x150",
    },
    state_message: {
        type: String,
    },
    first_login: {
        type: Boolean,
        default: false,
    },
    created_date: {
        type: Date,
        default: () => new Date(),
    },
    modified_date: {
        type: Date,
    },
    login_date: {
        type: Date,
    },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
