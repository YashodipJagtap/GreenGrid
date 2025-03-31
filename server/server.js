const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const fetch = require("node-fetch");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173", // Allow requests from your frontend
    credentials: true,
}));
dotenv.config();

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully!".green);
    } catch (error) {
        console.error("MongoDB connection error:".red, error);
        process.exit(1);
    }
};

connectDB();

// Coupon Schema
const couponSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    bonusPoints: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
});

const Coupon = mongoose.model("Coupon", couponSchema);

// Delivery Schema
const deliverySchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    proof: { type: String, required: true }, // Path to the uploaded file
});

const Delivery = mongoose.model("Delivery", deliverySchema);

// Create the uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // Unique filename
    },
});
const upload = multer({ storage });

// Serve uploaded files statically
app.use("/uploads", express.static(uploadsDir));

// API to Validate Coupon Code
app.post("/api/validate-coupon", async (req, res) => {
    const { couponCode } = req.body;

    try {
        const coupon = await Coupon.findOne({ code: couponCode, isActive: true });

        if (coupon) {
            res.status(200).json({
                status: "success",
                message: "Coupon code is valid!",
                bonusPoints: coupon.bonusPoints,
            });
        } else {
            res.status(400).json({
                status: "failure",
                message: "Invalid coupon code.",
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "An error occurred. Please try again.",
        });
    }
});

// API to Calculate Points
app.post("/api/calculate-points", (req, res) => {
    const { size, weight } = req.body;

    let calculatedPoints = 0;
    if (size === "Small Electronics") {
        calculatedPoints = 1 * weight;
    } else if (size === "Medium Electronics") {
        calculatedPoints = 2 * weight;
    } else if (size === "Large Electronics") {
        calculatedPoints = 3 * weight;
    }

    res.status(200).json({
        status: "success",
        message: "Points calculated successfully!",
        points: calculatedPoints,
    });
});

// API to Submit Delivery Details and Proof
app.post("/api/submit-delivery", upload.single("proof"), async (req, res) => {
    const { name, address, phone, email } = req.body;
    const proofFile = req.file;

    if (!proofFile) {
        return res.status(400).json({
            status: "failure",
            message: "Proof file is required.",
        });
    }

    try {
        const delivery = new Delivery({
            name,
            address,
            phone,
            email,
            proof: proofFile.filename,
        });

        await delivery.save();

        res.status(200).json({
            status: "success",
            message: "Your rewards will be delivered to your home. However, we will first verify your proof to ensure its accuracy and confirm whether you have correctly disposed of the waste in the e-dumper.",
            delivery,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "An error occurred. Please try again.",
        });
    }
});

// API to Handle Contact Form Submission
app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;

    const emailContent = `
        <p>Dear ${name},</p>
        <p>Thank you for reaching out to <strong>Green Grid</strong>. We appreciate your initiative in ensuring responsible e-waste disposal. Your message has been successfully received, and our team will review your inquiry and respond as soon as possible.</p>
        <p><strong>Here are the details of your submission:</strong></p>
        <p>📧 <strong>Email:</strong> ${email}</p>
        <p>📝 <strong>Message:</strong> ${message}</p>
        <p>At <strong>Green Grid</strong>, we strive to make e-waste disposal easy, responsible, and environmentally friendly. By properly recycling electronic waste, we can reduce pollution, recover valuable materials, and contribute to a more sustainable future.</p>
        <p>If you would like to learn more about our e-waste disposal solutions and how you can contribute to a cleaner environment, please visit our website.</p>
        <p>Thank you for taking the time to contact us. We will get back to you shortly.</p>
        <p><strong>Best regards,</strong></p>
        <p><strong>Green Grid Support Team</strong></p>
    `;

    const emailData = {
        from: "onboarding@resend.dev",
        to: email,
        subject: "Thank You for Contacting Green Grid – We Appreciate Your Efforts in Recycling",
        html: emailContent,
    };

    try {
        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
            },
            body: JSON.stringify(emailData),
        });

        const responseData = await response.json(); // Log the response data
        console.log("Resend API Response:", responseData);

        if (response.ok) {
            res.status(200).json({
                status: "success",
                message: "Email sent successfully!",
            });
        } else {
            res.status(400).json({
                status: "failure",
                message: "Failed to send email.",
            });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            status: "error",
            message: "An error occurred. Please try again.",
        });
    }
});

// Default Route
app.get("/", async (req, res) => {
    try {
        return res.status(200).json({
            status: "success",
            message: "API running successfully",
            data: null,
        });
    } catch (err) {
        return res.status(401).json({
            status: "failure",
            message: "API not running successfully",
            data: null,
        });
    }
});

// Start Server
app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(`Error: ${err}`.red);
    }
    console.log(`Server running on PORT ${process.env.PORT}`.blue.underline);
});