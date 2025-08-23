import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

import img1 from "../assets/images/rewards/1.jpg";
import img2 from "../assets/images/rewards/2.jpg";
import img3 from "../assets/images/rewards/3.jpg";
import img4 from "../assets/images/rewards/4.jpg";
import img5 from "../assets/images/rewards/5.jpg";
import img6 from "../assets/images/rewards/6.jpg";
import img7 from "../assets/images/rewards/7.jpg";
import img8 from "../assets/images/rewards/8.jpg";
import img9 from "../assets/images/rewards/9.jpg";
import img10 from "../assets/images/rewards/10.jpg";
import img11 from "../assets/images/rewards/11.jpg";
import img12 from "../assets/images/rewards/12.jpeg";

const Points = () => {
    const [size, setSize] = useState("Small Electronics");
    const [item, setItem] = useState("Smartphone");
    const [weight, setWeight] = useState(1);
    const [points, setPoints] = useState(0);
    const [couponCode, setCouponCode] = useState("");
    const [message, setMessage] = useState("");
    const [showDeliveryForm, setShowDeliveryForm] = useState(false);
    const [userDetails, setUserDetails] = useState({
        name: "",
        address: "",
        phone: "",
        email: "",
        proof: null,
    });

    // Point values for different items
    const itemPoints = {
        "Smartphone": 5,
        "Charger": 1,
        "Cables": 1,
        "Earphones": 2,
        "Digital Camera": 4,
        "Gaming Console": 8,
        "DVD Player": 3,
        "Tablets": 6,
        "Laptops": 10,
        "Refrigerators": 15,
        "Desktop Computer": 12,
        "Printer": 7,
        "Washing Machine": 15,
        "Dishwasher": 12,
        "Microwave": 5,
        "Home Theatre": 10
    };

    // Size multipliers
    const sizeMultipliers = {
        "Small Electronics": 1,
        "Medium Electronics": 1.5,
        "Large Electronics": 2
    };

    // Valid coupon codes with their bonus points
    const validCoupons = {
        "GREENGRID10": 10,
        "GREENGRID20": 20,
        "GREENGRID15": 15,
        "GREENGRID25": 25,
        "GREENGRID30": 30
    };

    // Automatically clear the message after 5 seconds
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    // Calculate points based on item, size and quantity
    const calculatePoints = () => {
        try {
            const basePoints = itemPoints[item] || 1;
            const multiplier = sizeMultipliers[size] || 1;
            const calculatedPoints = Math.floor(basePoints * multiplier * weight);

            setPoints(calculatedPoints);
            setMessage(`Calculated ${calculatedPoints} points!`);
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        }
    };

    // Validate coupon code
    const validateCoupon = () => {
        try {
            const uppercaseCode = couponCode.toUpperCase().trim();

            if (validCoupons[uppercaseCode]) {
                const bonusPoints = validCoupons[uppercaseCode];
                setMessage(`Coupon applied! You earned ${bonusPoints} bonus points!`);
                setPoints(points + bonusPoints);
                setCouponCode(""); // Clear the coupon input after successful application
            } else {
                setMessage("Invalid coupon code. Please try again.");
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        }
    };

    // Handle reward redemption
    const handleRedeem = (rewardPoints, rewardName) => {
        if (points >= rewardPoints) {
            setPoints(points - rewardPoints);
            setMessage(`You have successfully redeemed ${rewardPoints} points for ${rewardName}!`);
            setShowDeliveryForm(true);
        } else {
            setMessage(`You need ${rewardPoints - points} more points to redeem ${rewardName}.`);
        }
    };

    // Handle delivery form submission with file upload
    const handleDeliverySubmit = async (e) => {
        e.preventDefault();

        if (!userDetails.proof) {
            setMessage("Please upload proof of disposal.");
            return;
        }

        try {
            // In a real application, you would send this data to your backend
            // For now, we'll just simulate a successful submission
            setMessage("Delivery request submitted successfully! You will receive your reward within 7-10 business days.");
            setShowDeliveryForm(false);
            setUserDetails({
                name: "",
                address: "",
                phone: "",
                email: "",
                proof: null,
            });

            // Reset the form after a delay
            setTimeout(() => {
                setMessage("");
            }, 5000);
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        }
    };

    // Handle input changes in the delivery form
    const handleUserDetailsChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    // Handle file upload for proof
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file size (max 10MB)
            if (file.size > 10 * 1024 * 1024) {
                setMessage("File size too large. Maximum size is 10MB.");
                return;
            }

            // Check file type
            const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
            if (!validTypes.includes(file.type)) {
                setMessage("Please upload an image file (JPEG, PNG, GIF) or PDF.");
                return;
            }

            setUserDetails({ ...userDetails, proof: file });
            setMessage("File uploaded successfully!");
        }
    };

    return (
        <>
            <Navbar />

            <section className="text-gray-600 body-font relative">
                <div className="container px-5 py-10 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                            Redeem Your Points
                        </h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                            Calculate points for your e-waste disposal and redeem exciting rewards.
                        </p>
                    </div>
                </div>
            </section>

            {/* Points Calculation Section */}
            <section className="text-gray-600 body-font">
                <div className="container px-5 mx-auto">
                    <div className="flex flex-col lg:flex-row justify-center items-start gap-8 mb-10">
                        <div className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-lg font-medium mb-4">Calculate Points</h2>
                            <div className="flex flex-col items-start mb-4">
                                <span className="mb-2 font-medium">Electronics Size</span>
                                <select
                                    value={size}
                                    onChange={(e) => setSize(e.target.value)}
                                    className="w-full rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 text-base pl-3 pr-10"
                                >
                                    <option value="Small Electronics">Small Electronics</option>
                                    <option value="Medium Electronics">Medium Electronics</option>
                                    <option value="Large Electronics">Large Electronics</option>
                                </select>
                            </div>
                            <div className="flex flex-col items-start mb-4">
                                <span className="mb-2 font-medium">Item Type</span>
                                <select
                                    value={item}
                                    onChange={(e) => setItem(e.target.value)}
                                    className="w-full rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 text-base pl-3 pr-10"
                                >
                                    <option value="Smartphone">Smartphone</option>
                                    <option value="Charger">Charger</option>
                                    <option value="Cables">Cables</option>
                                    <option value="Earphones">Earphones</option>
                                    <option value="Digital Camera">Digital Camera</option>
                                    <option value="Gaming Console">Gaming Console</option>
                                    <option value="DVD Player">DVD Player</option>
                                    <option value="Tablets">Tablets</option>
                                    <option value="Laptops">Laptops</option>
                                    <option value="Refrigerators">Refrigerators</option>
                                    <option value="Desktop Computer">Desktop Computer</option>
                                    <option value="Printer">Printer</option>
                                    <option value="Washing Machine">Washing Machine</option>
                                    <option value="Dishwasher">Dishwasher</option>
                                    <option value="Microwave">Microwave</option>
                                    <option value="Home Theatre">Home Theatre</option>
                                </select>
                            </div>
                            <div className="flex flex-col items-start mb-4">
                                <span className="mb-2 font-medium">Number of Items</span>
                                <input
                                    type="number"
                                    min="1"
                                    value={weight}
                                    onChange={(e) => setWeight(Number(e.target.value) || 1)}
                                    className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                            <div className="mt-5">
                                <button
                                    onClick={calculatePoints}
                                    className="w-full text-white bg-green-500 border-0 py-2 focus:outline-none hover:bg-green-600 rounded text-lg transition-colors duration-200"
                                >
                                    Calculate Points
                                </button>
                            </div>
                        </div>

                        <div className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-lg font-medium mb-4">Apply Coupon</h2>
                            <div className="flex flex-col">
                                <div className="mb-4">
                                    <label className="block text-md font-medium text-gray-600 mb-2">Enter Coupon Code</label>
                                    <input
                                        type="text"
                                        placeholder="e.g., WELCOME10"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                </div>
                                <div className="mt-3">
                                    <button
                                        onClick={validateCoupon}
                                        className="w-full text-white bg-green-500 border-0 py-2 focus:outline-none hover:bg-green-600 rounded text-lg transition-colors duration-200"
                                    >
                                        Apply Coupon
                                    </button>
                                </div>
                            </div>
                            <div className="mt-4 text-sm text-gray-500">
                                <p>Valid coupon codes:</p>
                                <ul className="list-disc pl-5 mt-1">
                                    <li>GREENGRID10 - 10 points</li>
                                    <li>GREENGRID20 - 20 points</li>
                                    <li>GREENGRID15 - 15 points</li>
                                </ul>
                            </div>
                        </div>

                        <div className="w-full lg:w-1/4 flex justify-center">
                            <div className="flex flex-col rounded-lg border border-gray-200 px-6 py-6 text-center shadow-md w-full bg-white">
                                <dt className="order-last text-lg font-medium text-gray-500">Total Points</dt>
                                <dd className="text-4xl font-extrabold text-green-600 md:text-5xl">{points}</dd>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Rewards Section */}
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Available Rewards</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Redeem your points for these exciting rewards.</p>
                    </div>
                    <div className="flex flex-wrap -m-4">
                        {[
                            { img: img1, title: "Certificate", points: 1 },
                            { img: img2, title: "T-Shirt", points: 3 },
                            { img: img3, title: "T-Shirt", points: 3 },
                            { img: img4, title: "Poster", points: 4 },
                            { img: img5, title: "Metal Badge", points: 5 },
                            { img: img6, title: "Diary", points: 6 },
                            { img: img7, title: "Cap", points: 4 },
                            { img: img8, title: "Water Bottle", points: 9 },
                            { img: img9, title: "T-Shirt", points: 8 },
                            { img: img10, title: "Hoodie", points: 12 },
                            { img: img11, title: "Cup", points: 10 },
                            { img: img12, title: "Dustbin", points: 15 },
                        ].map((reward, index) => (
                            <div key={index} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                                <div className="block relative h-48 rounded overflow-hidden shadow-md">
                                    <img
                                        alt={reward.title}
                                        className="object-cover object-center w-full h-full block"
                                        src={reward.img}
                                    />
                                </div>
                                <div className="mt-4">
                                    <div className="flex flex-row items-center justify-between">
                                        <h2 className="text-gray-900 title-font text-lg font-medium">{reward.title}</h2>
                                        <h3 className="text-gray-500 text-xs tracking-widest title-font">{reward.points} Points</h3>
                                    </div>
                                    <button
                                        onClick={() => handleRedeem(reward.points, reward.title)}
                                        className="mt-2 py-2 w-full flex rounded-lg justify-center bg-green-500 font-semibold text-white hover:bg-green-600 transition-colors duration-200"
                                        disabled={points < reward.points}
                                    >
                                        {points >= reward.points ? "Redeem" : "Insufficient Points"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Delivery Form */}
            {showDeliveryForm && (
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-col text-center w-full mb-12">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Home Delivery Form</h1>
                            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Provide your details for home delivery.</p>
                        </div>
                        <form onSubmit={handleDeliverySubmit} className="lg:w-1/2 md:w-2/3 mx-auto">
                            <div className="flex flex-wrap -m-2">
                                <div className="p-2 w-full">
                                    <div className="relative">
                                        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={userDetails.name}
                                            onChange={handleUserDetailsChange}
                                            required
                                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        />
                                    </div>
                                </div>
                                <div className="p-2 w-full">
                                    <div className="relative">
                                        <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address *</label>
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            value={userDetails.address}
                                            onChange={handleUserDetailsChange}
                                            required
                                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        />
                                    </div>
                                </div>
                                <div className="p-2 w-full">
                                    <div className="relative">
                                        <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone *</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={userDetails.phone}
                                            onChange={handleUserDetailsChange}
                                            required
                                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        />
                                    </div>
                                </div>
                                <div className="p-2 w-full">
                                    <div className="relative">
                                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={userDetails.email}
                                            onChange={handleUserDetailsChange}
                                            required
                                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        />
                                    </div>
                                </div>
                                <div className="p-2 w-full">
                                    <div className="relative">
                                        <label htmlFor="proof" className="leading-7 text-sm text-gray-600">Upload Proof (Image/PDF) *</label>
                                        <input
                                            type="file"
                                            id="proof"
                                            name="proof"
                                            onChange={handleFileUpload}
                                            accept="image/*,.pdf"
                                            required
                                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Max file size: 10MB (JPEG, PNG, GIF, PDF)</p>
                                    </div>
                                </div>
                                <div className="p-2 w-full">
                                    <button
                                        type="submit"
                                        className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg transition-colors duration-200"
                                    >
                                        Submit Delivery Request
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            )}

            {/* Message Pop-up */}
            {message && (
                <div className="fixed bottom-4 right-4 m-4 p-4 bg-green-500 text-white rounded-lg shadow-lg z-50 transition-opacity duration-300">
                    {message}
                </div>
            )}

            <Footer />
        </>
    );
};

export default Points;