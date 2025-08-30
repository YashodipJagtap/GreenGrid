import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        if (!currentUser) {
            navigate("/login");
            return;
        }

        setUser(currentUser);
        setFormData({
            firstName: currentUser.firstName || "",
            lastName: currentUser.lastName || "",
            email: currentUser.email || "",
            phone: currentUser.phone || "",
            address: currentUser.address || ""
        });

        // Load profile image if exists
        if (currentUser.profileImage) {
            setImagePreview(currentUser.profileImage);
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError("");
        setSuccess("");
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check if file is an image
            if (!file.type.match('image.*')) {
                setError("Please select an image file");
                return;
            }

            // Check file size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                setError("Image size should be less than 2MB");
                return;
            }

            setProfileImage(file);

            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Update user data
            const updatedUser = {
                ...user,
                ...formData,
                updatedAt: new Date().toISOString()
            };

            // If a new image was selected, store it
            if (profileImage) {
                updatedUser.profileImage = imagePreview;
            }

            // Update localStorage
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));

            // Update users list
            const users = JSON.parse(localStorage.getItem('greenGridUsers') || '[]');
            const updatedUsers = users.map(u =>
                u.email === user.email ? updatedUser : u
            );
            localStorage.setItem('greenGridUsers', JSON.stringify(updatedUsers));

            setUser(updatedUser);
            setProfileImage(null); // Reset profile image state
            setSuccess("Profile updated successfully!");
            setIsEditing(false);

        } catch (error) {
            setError("Failed to update profile. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancelEdit = () => {
        setFormData({
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            phone: user.phone || "",
            address: user.address || ""
        });
        setIsEditing(false);
        setError("");
        setSuccess("");
        setProfileImage(null);

        // Reset to original profile image
        if (user.profileImage) {
            setImagePreview(user.profileImage);
        } else {
            setImagePreview("");
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const removeProfileImage = () => {
        setProfileImage(null);
        setImagePreview("");

        // Also remove from user data if saved
        if (user.profileImage) {
            const updatedUser = { ...user, profileImage: null };
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));

            // Update users list
            const users = JSON.parse(localStorage.getItem('greenGridUsers') || '[]');
            const updatedUsers = users.map(u =>
                u.email === user.email ? updatedUser : u
            );
            localStorage.setItem('greenGridUsers', JSON.stringify(updatedUsers));

            setUser(updatedUser);
        }
    };

    const getMemberSince = () => {
        if (!user?.createdAt) return "Member";
        const joinDate = new Date(user.createdAt);
        return `Member since ${joinDate.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
        })}`;
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center text-green-600 hover:text-green-700 mb-4 sm:mb-6 transition-colors duration-200 text-sm sm:text-base"
                    >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back
                    </button>

                    {/* Header */}
                    <div className="text-center mb-6 sm:mb-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Your Profile</h1>
                        <p className="text-base sm:text-lg text-gray-600 mt-2">
                            Manage your Green Grid account information
                        </p>
                    </div>

                    {success && (
                        <div className="mb-5 sm:mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                </svg>
                                <span className="text-green-700 font-medium text-sm sm:text-base">{success}</span>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="mb-5 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex items-center">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mr-2 sm:mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                                </svg>
                                <span className="text-red-700 font-medium text-sm sm:text-base">{error}</span>
                            </div>
                        </div>
                    )}

                    <div className="bg-white shadow rounded-lg overflow-hidden">
                        {/* Profile Header */}
                        <div className="px-4 sm:px-6 py-6 sm:py-8 bg-green-600 text-white">
                            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                                <div className="relative">
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-500 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold overflow-hidden">
                                        {imagePreview ? (
                                            <img
                                                src={imagePreview}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span>{user.firstName?.[0]}{user.lastName?.[0]}</span>
                                        )}
                                    </div>
                                    {isEditing && (
                                        <div className="absolute bottom-0 right-0 flex space-x-2">
                                            <button
                                                type="button"
                                                onClick={triggerFileInput}
                                                className="bg-white text-green-600 p-1 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
                                                title="Change photo"
                                            >
                                                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                            </button>
                                            {(imagePreview || user.profileImage) && (
                                                <button
                                                    type="button"
                                                    onClick={removeProfileImage}
                                                    className="bg-white text-red-600 p-1 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
                                                    title="Remove photo"
                                                >
                                                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        className="hidden"
                                    />
                                </div>
                                <div className="text-center sm:text-left">
                                    <h2 className="text-xl sm:text-2xl font-bold">
                                        {user.firstName} {user.lastName}
                                    </h2>
                                    <p className="text-green-100 text-sm sm:text-base">{getMemberSince()}</p>
                                </div>
                            </div>
                        </div>

                        {/* Profile Content */}
                        <div className="px-4 sm:px-6 py-6 sm:py-8">
                            {isEditing ? (
                                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                        <div>
                                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                                                First Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 text-sm sm:text-base"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                                                Last Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 text-sm sm:text-base"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 text-sm sm:text-base"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 text-sm sm:text-base"
                                            placeholder="Enter your phone number"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                                            Address
                                        </label>
                                        <textarea
                                            id="address"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            rows="3"
                                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 resize-none text-sm sm:text-base"
                                            placeholder="Enter your address"
                                        />
                                    </div>

                                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors duration-200 disabled:opacity-70 text-sm sm:text-base"
                                        >
                                            {isSubmitting ? "Saving..." : "Save Changes"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleCancelEdit}
                                            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="space-y-5 sm:space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 mb-1">
                                                First Name
                                            </label>
                                            <p className="text-base sm:text-lg font-medium text-gray-900">{user.firstName}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 mb-1">
                                                Last Name
                                            </label>
                                            <p className="text-base sm:text-lg font-medium text-gray-900">{user.lastName}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">
                                            Email Address
                                        </label>
                                        <p className="text-base sm:text-lg font-medium text-gray-900">{user.email}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">
                                            Phone Number
                                        </label>
                                        <p className="text-base sm:text-lg font-medium text-gray-900">
                                            {user.phone || "Not provided"}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">
                                            Address
                                        </label>
                                        <p className="text-base sm:text-lg font-medium text-gray-900">
                                            {user.address || "Not provided"}
                                        </p>
                                    </div>

                                    <div className="pt-4 sm:pt-6">
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base"
                                        >
                                            Edit Profile
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Profile;