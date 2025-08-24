import logo from "/logo.svg";
import profilePhoto from "../assets/images/profile.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [colorChange, setColorchange] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if user is logged in
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        setIsLoggedIn(!!currentUser);
        setUser(currentUser);
    }, []);

    const changeNavbarColor = () => {
        if (window.scrollY >= 1) {
            setColorchange("bg-white shadow-md");
        } else {
            setColorchange("");
        }
    };

    window.addEventListener("scroll", changeNavbarColor);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        setIsLoggedIn(false);
        setUser(null);
        setMenuOpen(false);
    };

    return (
        <header
            className={
                "sticky top-0 z-50 text-gray-600 body-font transition-colors duration-300 " +
                colorChange
            }
        >
            <div className="container mx-auto flex flex-wrap p-4 md:p-5 flex-row items-center justify-between">
                {/* Logo */}
                <Link
                    to="/"
                    className="flex title-font font-semibold items-center text-gray-900"
                >
                    <img src={logo} alt="logo" className="w-10 h-10" />
                    <span className="ml-2 text-2xl tracking-wide">Green Grid</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-8 text-base font-medium">
                    <Link to="/" className="hover:text-green-600 transition-colors">
                        Home
                    </Link>
                    <Link to="/about" className="hover:text-green-600 transition-colors">
                        About
                    </Link>
                    <Link to="/blogs" className="hover:text-green-600 transition-colors">
                        Insights
                    </Link>

                    {/* Show these links only when logged in */}
                    {isLoggedIn && (
                        <>
                            <Link to="/edumpers" className="hover:text-green-600 transition-colors">
                                E-Dumpers
                            </Link>
                            <Link to="/points" className="hover:text-green-600 transition-colors">
                                Green Rewards
                            </Link>
                            <Link to="/gemini" className="hover:text-green-600 transition-colors">
                                Eco AI
                            </Link>
                        </>
                    )}

                    <Link to="/contact" className="hover:text-green-600 transition-colors">
                        Contact
                    </Link>
                </nav>

                {/* Auth Buttons / Profile */}
                <div className="hidden md:flex items-center space-x-4">
                    {isLoggedIn ? (
                        <div className="flex items-center space-x-4">
                            <Link to="/profile" className="hover:text-green-600 transition-colors">
                                <div className="flex items-center space-x-2">
                                    <img
                                        className="w-10 h-10 rounded-full border-2 border-green-500"
                                        src={profilePhoto}
                                        alt="Profile"
                                    />
                                    <span className="text-sm font-medium">
                                        {user?.firstName || 'User'}
                                    </span>
                                </div>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-3">
                            <Link
                                to="/login"
                                className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden flex items-center text-gray-700 focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {menuOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden flex flex-col space-y-4 py-6 px-6 z-40">
                        <Link to="/" className="hover:text-green-600" onClick={() => setMenuOpen(false)}>
                            Home
                        </Link>
                        <Link to="/about" className="hover:text-green-600" onClick={() => setMenuOpen(false)}>
                            About
                        </Link>
                        <Link to="/blogs" className="hover:text-green-600" onClick={() => setMenuOpen(false)}>
                            Insights
                        </Link>

                        {/* Show these links only when logged in */}
                        {isLoggedIn && (
                            <>
                                <Link to="/edumpers" className="hover:text-green-600" onClick={() => setMenuOpen(false)}>
                                    E-Dumpers
                                </Link>
                                <Link to="/points" className="hover:text-green-600" onClick={() => setMenuOpen(false)}>
                                    Green Rewards
                                </Link>
                                <Link to="/gemini" className="hover:text-green-600" onClick={() => setMenuOpen(false)}>
                                    Eco AI
                                </Link>
                            </>
                        )}

                        <Link to="/contact" className="hover:text-green-600" onClick={() => setMenuOpen(false)}>
                            Contact
                        </Link>

                        {/* Mobile Auth Buttons */}
                        <div className="border-t pt-4 mt-4">
                            {isLoggedIn ? (
                                <div className="flex flex-col space-y-3">
                                    <Link
                                        to="/profile"
                                        className="flex items-center space-x-2 hover:text-green-600"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <img
                                            className="w-8 h-8 rounded-full border-2 border-green-500"
                                            src={profilePhoto}
                                            alt="Profile"
                                        />
                                        <span>{user?.firstName || 'User'}</span>
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-left"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col space-y-3">
                                    <Link
                                        to="/login"
                                        className="text-green-600 hover:text-green-700 font-medium text-center"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-center"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;