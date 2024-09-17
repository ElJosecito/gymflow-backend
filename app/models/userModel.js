import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    memberShip: { type: mongoose.Schema.Types.ObjectId, ref: 'Membership' },
    active: {
        type: Boolean,
        default: false,
    },
    gymEntries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GymEntry' }],
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

export default User;