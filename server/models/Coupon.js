import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    bonusPoints: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
});

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;