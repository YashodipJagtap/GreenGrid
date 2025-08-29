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

// Load environment variables first
dotenv.config();

// Middleware - CORS should be at the top with proper configuration
app.use(cors({
    origin: ["http://localhost:5173", "https://green-grid-frontend-c7eu.onrender.com"],
    credentials: true,
}));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// MongoDB Connection with better error handling
const connectDB = async () => {
    try {
        console.log("Attempting to connect to MongoDB...".yellow);

        if (!process.env.MONGO_URI) {
            console.log("MONGO_URI not set, using fallback MongoDB".yellow);
            process.env.MONGO_URI = "mongodb+srv://GreenGrid:GreenGrid%402005@cluster0.symqa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
        }

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000, // Increased timeout to 10 seconds
        });
        console.log("MongoDB connected successfully!".green);
    } catch (error) {
        console.error("MongoDB connection error:".red, error.message);
        console.log("Continuing without MongoDB...".yellow);
    }
};

connectDB();

// Contact Schema
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model("Contact", contactSchema);

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
    proof: { type: String, required: true },
});

const Delivery = mongoose.model("Delivery", deliverySchema);

// Create the uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log("Created uploads directory:".green, uploadsDir);
}

// Multer setup for file uploads - FIXED
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        // Create a safe filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const originalname = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_');
        cb(null, uniqueSuffix + '-' + originalname);
    },
});

// File filter to only allow certain file types
const fileFilter = (req, file, cb) => {
    // Allow images and documents
    if (file.mimetype.startsWith('image/') ||
        file.mimetype === 'application/pdf' ||
        file.mimetype === 'application/msword' ||
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        cb(null, true);
    } else {
        cb(new Error('Only images and documents are allowed'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    }
});

// Serve uploaded files statically - FIXED path
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

// API to Submit Delivery Details and Proof - FIXED
app.post("/api/submit-delivery", upload.single("proof"), async (req, res) => {
    try {
        const { name, address, phone, email } = req.body;
        const proofFile = req.file;

        console.log("Delivery submission received:", { name, email });
        console.log("Uploaded file:", proofFile);

        if (!proofFile) {
            return res.status(400).json({
                status: "failure",
                message: "Proof file is required.",
            });
        }

        // Create delivery record
        const delivery = new Delivery({
            name,
            address,
            phone,
            email,
            proof: proofFile.filename,
        });

        // Try to save to database if MongoDB is connected
        if (mongoose.connection.readyState === 1) {
            await delivery.save();
            console.log("Delivery saved to database");
        } else {
            console.log("MongoDB not connected, skipping database save");
        }

        res.status(200).json({
            status: "success",
            message: "Your rewards will be delivered to your home. However, we will first verify your proof to ensure its accuracy and confirm whether you have correctly disposed of the waste in the e-dumper.",
            delivery: {
                name: delivery.name,
                email: delivery.email,
                proof: delivery.proof
            },
        });
    } catch (error) {
        console.error("Delivery submission error:", error);
        res.status(500).json({
            status: "error",
            message: error.message || "An error occurred. Please try again.",
        });
    }
});

// API to Handle Contact Form Submission
app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;

    console.log("Contact form submission received:", { name, email });

    // Input validation
    if (!name || !email || !message) {
        return res.status(400).json({
            status: "error",
            message: "All fields are required.",
        });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            status: "error",
            message: "Please provide a valid email address.",
        });
    }

    try {
        // Try to save to database if MongoDB is connected
        if (mongoose.connection.readyState === 1) {
            try {
                const newContact = new Contact({ name, email, message });
                await newContact.save();
                console.log("Contact saved to database");
            } catch (dbError) {
                console.error("Database save error:", dbError.message);
                // Continue even if database save fails
            }
        } else {
            console.log("MongoDB not connected, skipping database save");
        }

        // Check if Resend API key is configured
        if (!process.env.RESEND_API_KEY) {
            console.error("Resend API key is not configured");
            console.log("Please add RESEND_API_KEY to your .env file".yellow);

            // Simulate success for development without Resend
            return res.status(200).json({
                status: "success",
                message: "Message received! A confirmation email would be sent to: " + email,
            });
        }

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
            from: "Green Grid <onboarding@resend.dev>",
            to: email,
            subject: "Thank You for Contacting Green Grid",
            html: emailContent,
        };

        console.log("Attempting to send email to:", email);

        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
            },
            body: JSON.stringify(emailData),
        });

        const responseData = await response.json();
        console.log("Resend API Response:", responseData);

        if (response.ok) {
            console.log("Email sent successfully to:", email);
            res.status(200).json({
                status: "success",
                message: "Message sent successfully! A confirmation email has been sent to: " + email,
            });
        } else {
            console.error("Resend API error:", responseData);
            res.status(200).json({
                status: "success",
                message: "Message received! However, we couldn't send a confirmation email at this time.",
            });
        }
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({
            status: "error",
            message: "An internal server error occurred. Please try again later.",
        });
    }
});

// Route to get uploaded files
app.get("/api/files/:filename", (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(uploadsDir, filename);

    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).json({
            status: "error",
            message: "File not found",
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

// Error handling middleware
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                status: "error",
                message: "File too large. Maximum size is 10MB.",
            });
        }
    }
    res.status(500).json({
        status: "error",
        message: error.message || "Internal server error",
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
    if (err) {
        console.log(`Error: ${err}`.red);
    }
    console.log(`Server running on PORT ${PORT}`.blue.underline);
    console.log(`CORS enabled for: http://localhost:5173 and https://green-grid-frontend-c7eu.onrender.com`.cyan);
    console.log(`Uploads directory: ${uploadsDir}`.cyan);

    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
        console.log("RESEND_API_KEY not configured. Emails will not be sent.".yellow);
        console.log("Add RESEND_API_KEY to your .env file to enable email functionality".yellow);
    } else {
        console.log("Resend email service is configured".green);
    }

    // Check if uploads directory exists and is writable
    try {
        fs.accessSync(uploadsDir, fs.constants.R_OK | fs.constants.W_OK);
        console.log("Uploads directory is accessible".green);
    } catch (err) {
        console.log("Uploads directory is not accessible".red);
        console.log("Please check permissions for:", uploadsDir);
    }

    
});