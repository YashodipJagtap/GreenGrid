import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            // Test server connection first
            try {
                const testResponse = await fetch("http://localhost:5000/");
                if (!testResponse.ok) {
                    throw new Error("Server is not responding");
                }
            } catch (testError) {
                throw new Error("Cannot connect to server. Please make sure the server is running on port 5000.");
            }

            const response = await fetch("http://localhost:5000/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response) {
                throw new Error("No response from server");
            }

            const result = await response.json();

            if (response.ok) {
                alert(result.message);
                setFormData({ name: "", email: "", message: "" });
            } else {
                setError(result.message || "Failed to send message. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            setError(error.message || "Network error. Please check your connection and try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="text-gray-600 body-font relative">
            <Navbar/>
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-12">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                        Contact Us
                    </h1>
                    <p className="text-xl mx-auto leading-relaxed">
                        Fill out the form and we will get back to you with a confirmation email.
                    </p>
                </div>
                <div className="lg:w-1/2 md:w-2/3 mx-auto">
                    {error && (
                        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
                            <strong>Error: </strong>{error}
                            <br />
                            <span className="text-sm">Make sure your server is running on port 5000</span>
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-wrap -m-2">
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                </div>
                            </div>
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label htmlFor="message" className="leading-7 text-sm text-gray-600">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                                    />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? "Sending..." : "Submit"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Footer/>
        </section>
    );
};

export default Contact;