import mongoose from "mongoose";
import Coupon from "../models/Coupon.js";
import dotenv from "dotenv";

dotenv.config();

const coupons = [
    { code: "CODE123", bonusPoints: 10 },
    { code: "DISCOUNT50", bonusPoints: 20 },
    { code: "FREESHIP", bonusPoints: 15 },
];

const seedCoupons = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await Coupon.deleteMany(); // Clear existing coupons
        await Coupon.insertMany(coupons); // Insert new coupons
        console.log("Coupons seeded successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding coupons:", error);
        process.exit(1);
    }
};

seedCoupons();