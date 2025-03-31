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

const Edumpers = () => {
    const [size, setSize] = useState("Small Electronics");
    const [item, setItem] = useState("Smartphone");
    const [weight, setWeight] = useState(0);
    const [points, setPoints] = useState(0);
    const [couponCode, setCouponCode] = useState("");
    const [message, setMessage] = useState("");
    const [showDeliveryForm, setShowDeliveryForm] = useState(false);
    const [userDetails, setUserDetails] = useState({
        name: "",
        address: "",
        phone: "",
        email: "",
        proof: null, // For file upload
    });

    // Automatically clear the message after 5 seconds
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
            }, 4000); // 4000 milliseconds = 5 seconds

            return () => clearTimeout(timer); // Cleanup the timer
        }
    }, [message]);

    // Calculate points based on size and weight
    const calculatePoints = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/calculate-points", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ size, weight }),
            });
            const data = await response.json();
            setPoints(data.points);
            setMessage(`Calculated ${data.points} points!`);
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        }
    };

    // Validate coupon code
    const handleSubmit = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/validate-coupon", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ couponCode }),
            });
            const data = await response.json();

            if (data.valid) {
                setMessage(data.message);
                setPoints(points + data.bonusPoints);
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        }
    };

    // Handle reward redemption
    const handleRedeem = (rewardPoints) => {
        if (points >= rewardPoints) {
            setPoints(points - rewardPoints);
            setMessage(`You have successfully redeemed ${rewardPoints} points!`);
            setShowDeliveryForm(true); // Redirect to delivery form
        } else {
            setMessage("You do not have enough points to redeem this reward.");
        }
    };

    // Handle user details form submission
    const handleDeliverySubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", userDetails.name);
            formData.append("address", userDetails.address);
            formData.append("phone", userDetails.phone);
            formData.append("email", userDetails.email);
            formData.append("proof", userDetails.proof);

            const response = await fetch("http://localhost:5000/api/submit-delivery", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            setMessage(data.message);
            setShowDeliveryForm(false); // Hide form after submission
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
        setUserDetails({ ...userDetails, proof: file });
    };

    return (
        <>
            <Navbar />

            <section className="text-gray-600 body-font relative">
                <div className="container px-5 py-10 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                            Redeem Your Code
                        </h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                            Choose the type of your disposal to check the points.
                        </p>
                    </div>
                </div>
            </section>

            {/* Points Calculation Section */}
            <section className="text-gray-600 flex justify-center w-auto mb-5 body-font">
                <div className="flex flex-row w-1/3 justify-around items-start">
                    <div className="mr-20">
                        <div className="flex justify-start flex-col items-start">
                            <span className="mr-3">Electronics Size</span>
                            <div className="relative">
                                <select
                                    onChange={(e) => setSize(e.target.value)}
                                    className="w-64 mb-3 rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                                >
                                    <option value="Small Electronics">Small Electronics</option>
                                    <option value="Medium Electronics">Medium Electronics</option>
                                    <option value="Large Electronics">Large Electronics</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="mr-3">Item</span>
                            <div className="relative">
                                <select
                                    onChange={(e) => setItem(e.target.value)}
                                    className="w-64 mb-3 rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
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
                        </div>
                        <div className="flex justify-start items-start flex-col">
                            <span className="mr-3">Number of Items</span>
                            <input
                                onChange={(e) => setWeight(e.target.value)}
                                type="number"
                                value={weight}
                                className="w-64 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                        <div className="mt-5">
                            <button
                                onClick={calculatePoints}
                                className="w-64 flex justify-center mx-auto text-white bg-green-500 border-0 py-2 focus:outline-none hover:bg-green-600 rounded text-lg"
                            >
                                Calculate Points
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-center items-center w-64 mr-20 mx-auto">
                        <div className="flex flex-wrap">
                            <div className="relative">
                                <label className="leading-7 text-md text-gray-600">Enter Coupon Code to verify.</label>
                                <input
                                    type="text"
                                    placeholder="xxx-xxx"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                    className="w-full mt-3 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                            <div className="mt-5 w-64">
                                <button
                                    onClick={handleSubmit}
                                    className="flex mx-auto justify-center text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-auto">
                        <div className="flex w-60 flex-col rounded-lg border border-gray-100 px-4 py-4 text-center">
                            <dt className="order-last text-lg font-medium text-gray-500">Total Points</dt>
                            <dd className="text-4xl font-extrabold text-green-600 md:text-5xl">{points}</dd>
                        </div>
                    </div>
                </div>
            </section>

            {/* Rewards Section */}
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
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
                            <div key={index} className="lg:w-1/6 md:w-1/2 p-4 w-full">
                                <div className="block relative h-48 rounded overflow-hidden">
                                    <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={reward.img} />
                                </div>
                                <div className="mt-4">
                                    <div className="flex flex-row items-center justify-between">
                                        <h2 className="text-gray-900 title-font text-lg font-medium">{reward.title}</h2>
                                        <h3 className="text-gray-500 text-xs tracking-widest title-font">{reward.points} Points</h3>
                                    </div>
                                    <button
                                        onClick={() => handleRedeem(reward.points)}
                                        className="mt-2 py-2 w-full flex rounded-lg justify-center bg-green-500 font-semibold text-white hover:bg-green-600"
                                    >
                                        Redeem
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
                                        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={userDetails.name}
                                            onChange={handleUserDetailsChange}
                                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        />
                                    </div>
                                </div>
                                <div className="p-2 w-full">
                                    <div className="relative">
                                        <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            value={userDetails.address}
                                            onChange={handleUserDetailsChange}
                                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        />
                                    </div>
                                </div>
                                <div className="p-2 w-full">
                                    <div className="relative">
                                        <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                                        <input
                                            type="text"
                                            id="phone"
                                            name="phone"
                                            value={userDetails.phone}
                                            onChange={handleUserDetailsChange}
                                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        />
                                    </div>
                                </div>
                                <div className="p-2 w-full">
                                    <div className="relative">
                                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={userDetails.email}
                                            onChange={handleUserDetailsChange}
                                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        />
                                    </div>
                                </div>
                                <div className="p-2 w-full">
                                    <div className="relative">
                                        <label htmlFor="proof" className="leading-7 text-sm text-gray-600">Upload Proof (Image)</label>
                                        <input
                                            type="file"
                                            id="proof"
                                            name="proof"
                                            onChange={handleFileUpload}
                                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        />
                                    </div>
                                </div>
                                <div className="p-2 w-full">
                                    <button
                                        type="submit"
                                        className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            )}

            {/* Message Pop-up */}
            {message && (
                <div className="fixed bottom-0 right-0 m-4 p-4 bg-green-500 text-white rounded-lg shadow-lg">
                    {message}
                </div>
            )}

            <Footer />
        </>
    );
};

export default Edumpers;