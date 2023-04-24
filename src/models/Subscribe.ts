import mongoose from "mongoose";

/* PetSchema will correspond to a collection in your MongoDB database. */
const SubscribeSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true,
    },
    sub: {
        type: String,
        required: true,
    },
});

export default mongoose.models.Subscribe || mongoose.model("Subscribe", SubscribeSchema);
