import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import blog1 from "../assets/images/blog1.jpg";
import blog2 from "../assets/images/blog2.jpg";
import blog3 from "../assets/images/test4.jpg";
import author1 from "../assets/images/author1.jpg";
import author2 from "../assets/images/author2.jpg";
import author3 from "../assets/images/author3.jpg";

const Blogs = () => {
    // Load initial state from localStorage or set defaults
    const loadFromLocalStorage = (key, defaultValue) => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error(`Error loading ${key} from localStorage:`, error);
            return defaultValue;
        }
    };

    // Save to localStorage
    const saveToLocalStorage = (key, value) => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Error saving ${key} to localStorage:`, error);
        }
    };

    // State with localStorage persistence
    const [comments, setComments] = useState(() =>
        loadFromLocalStorage('blogComments', {
            1: [{ author: "Eco Warrior", text: "Great post! I learned a lot about reducing laptop carbon footprint.", date: "2025-03-15" }],
            2: [],
            3: [],
            4: [],
            5: []
        })
    );

    const [likes, setLikes] = useState(() =>
        loadFromLocalStorage('blogLikes', { 1: 12, 2: 8, 3: 15, 4: 6, 5: 9 })
    );

    const [bookmarkedPosts, setBookmarkedPosts] = useState(() =>
        loadFromLocalStorage('blogBookmarks', [])
    );

    const [newComment, setNewComment] = useState("");
    const [activeBlog, setActiveBlog] = useState(null);
    const [readingProgress, setReadingProgress] = useState(0);
    const [shareOptionsVisible, setShareOptionsVisible] = useState(false);

    // Save to localStorage whenever state changes
    useEffect(() => {
        saveToLocalStorage('blogComments', comments);
    }, [comments]);

    useEffect(() => {
        saveToLocalStorage('blogLikes', likes);
    }, [likes]);

    useEffect(() => {
        saveToLocalStorage('blogBookmarks', bookmarkedPosts);
    }, [bookmarkedPosts]);

    // Simulated backend data
    const relatedPosts = [
        { id: 6, title: "How to Properly Recycle Smartphones", excerpt: "Learn the correct way to dispose of old smartphones.", image: blog1 },
        { id: 7, title: "The Future of E-Waste Management", excerpt: "New technologies are changing how we handle electronic waste.", image: blog2 },
        { id: 8, title: "Corporate Responsibility in E-Waste", excerpt: "How businesses can lead in sustainable electronics disposal.", image: blog3 }
    ];

    const tags = ["E-Waste", "Recycling", "Sustainability", "Green Tech", "ITAD", "Circular Economy"];

    const categories = [
        { name: "E-Waste Management", count: 12 },
        { name: "Green Technology", count: 8 },
        { name: "IT Asset Disposal", count: 5 },
        { name: "Corporate Sustainability", count: 7 }
    ];

    const archives = [
        { month: "March 2025", count: 5 },
        { month: "February 2025", count: 3 },
        { month: "January 2025", count: 4 },
        { month: "December 2024", count: 2 }
    ];

    // Handle scroll for reading progress
    useEffect(() => {
        const updateReadingProgress = () => {
            const currentProgress = window.scrollY;
            const scrollHeight = document.body.scrollHeight - window.innerHeight;
            if (scrollHeight) {
                setReadingProgress((currentProgress / scrollHeight) * 100);
            }
        };

        window.addEventListener("scroll", updateReadingProgress);
        return () => window.removeEventListener("scroll", updateReadingProgress);
    }, []);

    // Handle adding comments
    const handleAddComment = (blogId) => {
        if (newComment.trim()) {
            const updatedComments = { ...comments };
            if (!updatedComments[blogId]) {
                updatedComments[blogId] = [];
            }
            updatedComments[blogId].push({
                author: "Current User",
                text: newComment,
                date: new Date().toISOString().split('T')[0]
            });
            setComments(updatedComments);
            setNewComment("");
        }
    };

    // Handle liking posts
    const handleLikePost = (blogId) => {
        setLikes(prev => ({
            ...prev,
            [blogId]: (prev[blogId] || 0) + 1
        }));
    };

    // Handle sharing posts
    const handleSharePost = (platform, blogId) => {
        setShareOptionsVisible(false);
    };

    // Handle bookmarking posts
    const handleBookmarkPost = (blogId) => {
        if (bookmarkedPosts.includes(blogId)) {
            setBookmarkedPosts(bookmarkedPosts.filter(id => id !== blogId));
        } else {
            setBookmarkedPosts([...bookmarkedPosts, blogId]);
        }
    };

    // Safely get comments for a blog post
    const getComments = (blogId) => {
        return comments[blogId] || [];
    };

    // Safely get likes for a blog post
    const getLikes = (blogId) => {
        return likes[blogId] || 0;
    };

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <Navbar />

            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-1 z-50">
                <div
                    className="h-full bg-green-600"
                    style={{ width: `${readingProgress}%` }}
                ></div>
            </div>

            <section className="bg-white">
                <div className="py-6 md:py-8 px-4 md:px-6 lg:px-8 mx-auto max-w-screen-xl lg:py-10">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 md:p-8 lg:p-10 mb-6 md:mb-8">
                        <div className="flex justify-between items-start">
                            <h1 className="text-gray-900 text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-5">Reduce Laptops Carbon Footprint Through IT Asset Disposal?</h1>
                            <button
                                onClick={() => handleBookmarkPost(1)}
                                className="text-gray-500 hover:text-green-600 text-xl"
                                aria-label={bookmarkedPosts.includes(1) ? "Remove bookmark" : "Bookmark this post"}
                            >
                                {bookmarkedPosts.includes(1) ? '🔖' : '📑'}
                            </button>
                        </div>

                        {/* Author and Date Info */}
                        <div className="flex items-center mb-4">
                            <img className="w-8 h-8 md:w-10 md:h-10 rounded-full mr-3" src={author1} alt="Sarah Johnson" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">Sarah Johnson</p>
                                <p className="text-xs md:text-sm text-gray-500">Mar 15, 2025 · 8 min read</p>
                            </div>
                        </div>

                        <p className="text-base md:text-lg font-normal text-gray-500 mb-4">Laptops and computers have become a necessity in the digital age. On the other hand, laptop production, utilization, and disposal contribute to carbon emissions and environmental degradation.
                            To address this issue, IT asset disposal is one efficient approach to reduce the carbon footprint of computers. In this blog, we will look at various practical strategies to lower the carbon footprint of laptop computers.</p>
                        <br />
                        <p className="text-base md:text-lg font-normal text-gray-500">
                            <b>Increase Lifespan of Laptops:</b> <br />
                            Extending the lifespan of computers is one of the simplest and most efficient ways to lessen their carbon footprint. Organizations can maximize laptop utilization by ensuring maintenance and repair before considering an upgrade or disposal.
                            This method reduces the demand for new laptops, hence reducing carbon emissions associated with manufacturing and transportation.
                        </p> <br />
                        <p className="text-base md:text-lg font-normal text-gray-500">
                            <b>Energy-Efficient Laptops:</b> <br />
                            While purchasing consider models that have gained energy certifications such as ENERGY STAR. These laptops are designed to use less energy when operating, ensuing lower carbon emissions over their lifetime and assisting in reducing the environmental impact of laptop use.
                        </p>

                        {/* Social Sharing and Reactions */}
                        <div className="mt-6 flex flex-wrap items-center justify-between border-t border-gray-200 pt-4">
                            <div className="flex items-center space-x-3 md:space-x-4 mb-3 md:mb-0">
                                <button
                                    onClick={() => handleLikePost(1)}
                                    className="flex items-center text-gray-500 hover:text-green-600"
                                >
                                    <svg className="w-4 h-4 md:w-5 md:h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                                    </svg>
                                    <span className="text-sm">{getLikes(1)}</span>
                                </button>

                                <button
                                    onClick={() => setActiveBlog(activeBlog === 1 ? null : 1)}
                                    className="flex items-center text-gray-500 hover:text-green-600"
                                >
                                    <svg className="w-4 h-4 md:w-5 md:h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm">{getComments(1).length}</span>
                                </button>

                                <div className="relative">
                                    <button
                                        onClick={() => setShareOptionsVisible(!shareOptionsVisible)}
                                        className="flex items-center text-gray-500 hover:text-green-600"
                                    >
                                        <svg className="w-4 h-4 md:w-5 md:h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                                        </svg>
                                        <span className="text-sm">Share</span>
                                    </button>

                                    {shareOptionsVisible && (
                                        <div className="absolute z-10 left-0 mt-2 w-36 md:w-48 bg-white rounded-md shadow-lg py-1">
                                            <button onClick={() => handleSharePost('Twitter', 1)} className="block px-3 py-2 text-xs md:text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Twitter</button>
                                            <button onClick={() => handleSharePost('Facebook', 1)} className="block px-3 py-2 text-xs md:text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Facebook</button>
                                            <button onClick={() => handleSharePost('LinkedIn', 1)} className="block px-3 py-2 text-xs md:text-sm text-gray-700 hover:bg-gray-100 w-full text-left">LinkedIn</button>
                                            <button onClick={() => handleSharePost('Email', 1)} className="block px-3 py-2 text-xs md:text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Email</button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="text-xs md:text-sm text-gray-500">
                                <span>1,245 views</span>
                            </div>
                        </div>

                        {/* Comments Section */}
                        {activeBlog === 1 && (
                            <div className="mt-6 border-t border-gray-200 pt-4">
                                <h3 className="text-lg md:text-xl font-semibold mb-4">Comments ({getComments(1).length})</h3>

                                <div className="mb-4">
                                    {getComments(1).map((comment, index) => (
                                        <div key={index} className="mb-4 pb-4 border-b border-gray-100">
                                            <div className="flex items-start">
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-sm md:text-base">{comment.author}</h4>
                                                    <p className="text-xs text-gray-500">{comment.date}</p>
                                                    <p className="mt-2 text-sm md:text-base text-gray-700">{comment.text}</p>
                                                </div>
                                                <button className="text-gray-400 hover:text-green-600 text-sm">Reply</button>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="mt-6">
                                        <h4 className="text-base md:text-lg font-medium mb-2">Add a comment</h4>
                                        <textarea
                                            className="w-full px-3 py-2 text-sm md:text-base text-gray-700 border rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600"
                                            rows="3"
                                            placeholder="Write your comment here..."
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                        ></textarea>
                                        <button
                                            onClick={() => handleAddComment(1)}
                                            className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200 text-sm md:text-base"
                                        >
                                            Post Comment
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8 mb-6 md:mb-8">
                        {[1, 2, 3].map((blogId) => (
                            <div key={blogId} className="h-full bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                                <img className="h-40 md:h-48 w-full object-cover object-center" src={blogId === 1 ? blog1 : blogId === 2 ? blog3 : blog2} alt="blog" />
                                <div className="p-5 md:p-6 lg:p-8">
                                    <div className="flex justify-between items-start mb-2">
                                        <h2 className="text-gray-900 text-xl md:text-2xl font-bold">
                                            {blogId === 1 ? "Green Gadgets" : blogId === 2 ? "What Are Green Gadgets?" : "Impact of Green Gadgets"}
                                        </h2>
                                        <button
                                            onClick={() => handleBookmarkPost(blogId + 1)}
                                            className="text-gray-500 hover:text-green-600 text-lg"
                                            aria-label={bookmarkedPosts.includes(blogId + 1) ? "Remove bookmark" : "Bookmark this post"}
                                        >
                                            {bookmarkedPosts.includes(blogId + 1) ? '🔖' : '📑'}
                                        </button>
                                    </div>

                                    {/* Author and Date Info */}
                                    <div className="flex items-center mb-3">
                                        <img className="w-7 h-7 md:w-8 md:h-8 rounded-full mr-2" src={blogId === 1 ? author2 : blogId === 2 ? author3 : author1} alt="Author" />
                                        <div>
                                            <p className="text-xs font-medium text-gray-900">
                                                {blogId === 1 ? "Michael Chen" : blogId === 2 ? "Emma Rodriguez" : "Sarah Johnson"}
                                            </p>
                                            <p className="text-xs text-gray-500">Mar {10 + blogId}, 2025</p>
                                        </div>
                                    </div>

                                    <p className="text-sm md:text-base font-normal text-gray-500 mb-3">
                                        {blogId === 1
                                            ? "In a generation described by means of speedy technological advances, the demand for electronics is soaring. However, with this surge in innovation comes increasing challenges for the environmental effect of digital gadgets."
                                            : blogId === 2
                                                ? "Green gadgets, additionally known as green or sustainable electronics, are devices designed to limit their environmental effect during their entire lifecycle – from manufacturing and use to disposal or recycling."
                                                : "Choosing green devices will have a perceptible effect on the environment. By reducing energy consumption and waste, the devices help fight weather alternate and decrease e-waste."}
                                    </p>
                                    <p className="text-sm md:text-base font-normal text-gray-500">
                                        {blogId === 1
                                            ? "Fortunately, the wave of Eco-conscious purchasers and manufacturers has paved the way for green gadgets – electronic devices designed with sustainability in mind. In this blog post, we will discover the arena of green electronics and how they are reshaping the tech industry."
                                            : blogId === 2
                                                ? <>
                                                    Features of Green Gadgets: <br />
                                                    <b>1.</b> Energy Efficiency <br />
                                                    <b>2.</b> Sustainable Materials <br />
                                                    <b>3.</b> Longevity <br />
                                                    <b>4.</b> Recyclability <br />
                                                    <b>5.</b> Reduced Toxic Materials <br />
                                                    Solar-Powered Chargers: These chargers harness the energy of the solar to price your gadgets
                                                </>
                                                : <>
                                                    Additionally, they encourage manufacturers to adopt extra sustainable practices, fostering a shift in the direction of greener electronics enterprise-huge.
                                                    <br /><br />
                                                    In the end, the rise of green gadgets represents a promising shift in the direction of a greater sustainable tech enterprise.
                                                </>}
                                    </p>

                                    {/* Tags */}
                                    <div className="mt-3 flex flex-wrap">
                                        {[0, 1].map(i => (
                                            <span key={i} className="mr-2 mb-2 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                                {tags[i + blogId]}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Social Reactions */}
                                    <div className="mt-3 flex items-center space-x-3 md:space-x-4 text-xs md:text-sm">
                                        <button
                                            onClick={() => handleLikePost(blogId + 1)}
                                            className="flex items-center text-gray-500 hover:text-green-600"
                                        >
                                            <svg className="w-3 h-3 md:w-4 md:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v 5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                                            </svg>
                                            <span>{getLikes(blogId + 1)}</span>
                                        </button>

                                        <button
                                            onClick={() => setActiveBlog(activeBlog === blogId + 1 ? null : blogId + 1)}
                                            className="flex items-center text-gray-500 hover:text-green-600"
                                        >
                                            <svg className="w-3 h-3 md:w-4 md:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                            </svg>
                                            <span>{getComments(blogId + 1).length}</span>
                                        </button>

                                        <button
                                            onClick={() => handleSharePost('Share', blogId + 1)}
                                            className="flex items-center text-gray-500 hover:text-green-600"
                                        >
                                            <svg className="w-3 h-3 md:w-4 md:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                                            </svg>
                                            <span>Share</span>
                                        </button>
                                    </div>

                                    {/* Read More Link */}
                                    <div className="mt-3">
                                        <button onClick={scrollToTop} className="text-green-600 hover:text-green-800 font-medium text-sm md:text-base">
                                            Read more →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 lg:gap-8 mb-6 md:mb-8">
                        {[4, 5].map((blogId) => (
                            <div key={blogId} className="h-full bg-gray-50 border border-gray-200 rounded-lg p-5 md:p-6 lg:p-8">
                                <div className="flex justify-between items-start mb-2">
                                    <h2 className="text-gray-900 text-xl md:text-2xl lg:text-3xl font-bold">
                                        {blogId === 4 ? "Understanding Types of E-waste" : "Sources of e-waste"}
                                    </h2>
                                    <button
                                        onClick={() => handleBookmarkPost(blogId + 1)}
                                        className="text-gray-500 hover:text-green-600 text-lg"
                                        aria-label={bookmarkedPosts.includes(blogId + 1) ? "Remove bookmark" : "Bookmark this post"}
                                    >
                                        {bookmarkedPosts.includes(blogId + 1) ? '🔖' : '📑'}
                                    </button>
                                </div>

                                {/* Author and Date Info */}
                                <div className="flex items-center mb-3">
                                    <img className="w-7 h-7 md:w-8 md:h-8 rounded-full mr-2" src={blogId === 4 ? author3 : author2} alt="Author" />
                                    <div>
                                        <p className="text-xs font-medium text-gray-900">
                                            {blogId === 4 ? "Emma Rodriguez" : "Michael Chen"}
                                        </p>
                                        <p className="text-xs text-gray-500">Mar {8 + blogId}, 2025</p>
                                    </div>
                                </div>

                                <p className="text-sm md:text-base font-normal text-gray-500 mb-3">
                                    {blogId === 4
                                        ? "In the present scenario, technological advancements have become a part of our daily lives. As we refurbish our smartphones, laptops, and other electronic devices, we create a lot of electronic waste or e-waste. Understanding the types and sources of e-waste is the first step to responsible disposal and recycling."
                                        : "Understanding where e-waste comes from is crucial in addressing the growing problem. The source areas of e-waste can be broadly classified as follows."}
                                </p>
                                <p className="text-sm md:text-base font-normal text-gray-500">
                                    {blogId === 4
                                        ? <>
                                            <b>1.</b> Consumer electronic devices <br />
                                            <b>2.</b> Appliances <br />
                                            <b>3.</b> Office Equipment <br />
                                            <b>4.</b> IT Equipment <br />
                                            <b>5.</b> Medical devices
                                        </>
                                        : <>
                                            <b>1.</b> Industries <br />
                                            <b>2.</b> Health care facilities <br />
                                            <b>3.</b> Producers <br />
                                            <b>4.</b> Retailers <br />
                                            <b>5.</b> Government and educational institutions <br />
                                            It is important to note that not all e-waste is properly disposed of or recycled. Proper disposal can cause environmental pollution and health hazards due to lead, mercury, cadmium and other hazardous elements found in many electronic devices
                                        </>}
                                </p>

                                {/* Social Reactions */}
                                <div className="mt-3 flex items-center space-x-3 md:space-x-4 text-xs md:text-sm">
                                    <button
                                        onClick={() => handleLikePost(blogId + 1)}
                                        className="flex items-center text-gray-500 hover:text-green-600"
                                    >
                                        <svg className="w-3 h-3 md:w-4 md:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                                        </svg>
                                        <span>{getLikes(blogId + 1)}</span>
                                    </button>

                                    <button
                                        onClick={() => setActiveBlog(activeBlog === blogId + 1 ? null : blogId + 1)}
                                        className="flex items-center text-gray-500 hover:text-green-600"
                                    >
                                        <svg className="w-3 h-3 md:w-4 md:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                        </svg>
                                        <span>{getComments(blogId + 1).length}</span>
                                    </button>

                                    <button
                                        onClick={() => handleSharePost('Share', blogId + 1)}
                                        className="flex items-center text-gray-500 hover:text-green-600"
                                    >
                                        <svg className="w-3 h-3 md:w-4 md:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                                        </svg>
                                        <span>Share</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Sidebar Area with Additional Features */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
                        <div className="lg:col-span-3">
                            {/* Related Posts */}
                            <div className="mb-6 md:mb-8">
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Related Posts</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                                    {relatedPosts.map((post) => (
                                        <div key={post.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm border border-gray-200">
                                            <img className="h-32 md:h-40 w-full object-cover" src={post.image} alt={post.title} />
                                            <div className="p-3 md:p-4">
                                                <h4 className="font-semibold text-base md:text-lg mb-2 text-gray-900">{post.title}</h4>
                                                <p className="text-gray-600 text-xs md:text-sm">{post.excerpt}</p>
                                                <button onClick={scrollToTop} className="mt-2 inline-block text-green-600 hover:text-green-800 text-xs md:text-sm font-medium">
                                                    Read more →
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Popular Tags */}
                            <div className="mb-6 md:mb-8">
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Popular Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag, index) => (
                                        <button key={index} onClick={scrollToTop} className="px-2 py-1 md:px-3 md:py-1 bg-gray-100 text-gray-800 text-xs md:text-sm rounded-full hover:bg-green-100 hover:text-green-800">
                                            #{tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            {/* Categories */}
                            <div className="bg-gray-50 rounded-lg p-4 md:p-5 mb-5 md:mb-6 shadow-sm border border-gray-200">
                                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Categories</h3>
                                <ul className="space-y-2">
                                    {categories.map((category, index) => (
                                        <li key={index}>
                                            <button onClick={scrollToTop} className="flex justify-between text-gray-600 hover:text-green-600 w-full text-left text-sm md:text-base">
                                                <span>{category.name}</span>
                                                <span>({category.count})</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Archives */}
                            <div className="bg-gray-50 rounded-lg p-4 md:p-5 mb-5 md:mb-6 shadow-sm border border-gray-200">
                                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Archives</h3>
                                <ul className="space-y-2">
                                    {archives.map((archive, index) => (
                                        <li key={index}>
                                            <button onClick={scrollToTop} className="flex justify-between text-gray-600 hover:text-green-600 w-full text-left text-sm md:text-base">
                                                <span>{archive.month}</span>
                                                <span>({archive.count})</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
};

export default Blogs;