import logo from "/logo.svg";
import profilePhoto from "../assets/images/profile.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [colorChange, setColorchange] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isTablet, setIsTablet] = useState(false);

    useEffect(() => {
        // Check if user is logged in
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        setIsLoggedIn(!!currentUser);
        setUser(currentUser);

        // Check screen size for tablet
        const checkScreenSize = () => {
            setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);

        return () => {
            window.removeEventListener("resize", checkScreenSize);
        };
    }, []);

    const changeNavbarColor = () => {
        if (window.scrollY >= 1) {
            setColorchange("bg-white shadow-md");
        } else {
            setColorchange("");
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", changeNavbarColor);
        return () => {
            window.removeEventListener("scroll", changeNavbarColor);
        };
    }, []);

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
            <div className="container mx-auto flex flex-wrap p-3 md:p-4 lg:p-5 flex-row items-center justify-between">
                {/* Logo */}
                <Link
                    to="/"
                    className="flex title-font font-semibold items-center text-gray-900"
                >
                    <img src={logo} alt="Green Grid Logo" className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10" />
                    <span className="ml-2 text-lg md:text-xl lg:text-2xl tracking-wide">Green Grid</span>
                </Link>

                {/* Desktop/Tablet Nav */}
                <nav className="hidden md:flex flex-wrap items-center space-x-3 lg:space-x-5 xl:space-x-8 text-sm lg:text-base font-medium">
                    <Link to="/" className="hover:text-green-600 transition-colors px-1.5 py-1 md:px-2 md:py-1.5">
                        Home
                    </Link>
                    <Link to="/about" className="hover:text-green-600 transition-colors px-1.5 py-1 md:px-2 md:py-1.5">
                        About
                    </Link>
                    <Link to="/blogs" className="hover:text-green-600 transition-colors px-1.5 py-1 md:px-2 md:py-1.5">
                        Insights
                    </Link>

                    {/* All links always visible */}
                    <Link to="/edumpers" className="hover:text-green-600 transition-colors px-1.5 py-1 md:px-2 md:py-1.5">
                        E-Dumpers
                    </Link>
                    <Link to="/points" className="hover:text-green-600 transition-colors px-1.5 py-1 md:px-2 md:py-1.5">
                        Green Rewards
                    </Link>
                    <Link to="/gemini" className="hover:text-green-600 transition-colors px-1.5 py-1 md:px-2 md:py-1.5">
                        Eco AI
                    </Link>

                    <Link to="/contact" className="hover:text-green-600 transition-colors px-1.5 py-1 md:px-2 md:py-1.5">
                        Contact
                    </Link>
                </nav>

                {/* Auth Buttons / Profile */}
                <div className="hidden md:flex items-center space-x-2 lg:space-x-3 xl:space-x-4">
                    {isLoggedIn ? (
                        <div className="flex items-center space-x-2 lg:space-x-3 xl:space-x-4">
                            <Link to="/profile" className="hover:text-green-600 transition-colors">
                                <div className="flex items-center space-x-1 lg:space-x-2">
                                    <img
                                        className="w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full border-2 border-green-500"
                                        src={profilePhoto}
                                        alt="Profile"
                                    />
                                    {!isTablet && (
                                        <span className="text-xs lg:text-sm font-medium">
                                            {user?.firstName || 'User'}
                                        </span>
                                    )}
                                </div>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-green-600 hover:bg-green-700 text-white px-2.5 py-1.5 md:px-3 md:py-1.5 lg:px-4 lg:py-2 rounded-lg transition-colors duration-200 text-xs md:text-sm lg:text-base"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-2 lg:space-x-3">
                            <Link
                                to="/login"
                                className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200 text-xs md:text-sm lg:text-base"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="bg-green-600 hover:bg-green-700 text-white px-2.5 py-1.5 md:px-3 md:py-1.5 lg:px-4 lg:py-2 rounded-lg transition-colors duration-200 text-xs md:text-sm lg:text-base"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden flex items-center text-gray-700 focus:outline-none p-1"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
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
                    <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden flex flex-col space-y-1 py-4 px-5 z-40 max-h-screen overflow-y-auto">
                        <Link to="/" className="hover:text-green-600 py-2.5 px-2 rounded-md hover:bg-green-50 transition-colors" onClick={() => setMenuOpen(false)}>
                            Home
                        </Link>
                        <Link to="/about" className="hover:text-green-600 py-2.5 px-2 rounded-md hover:bg-green-50 transition-colors" onClick={() => setMenuOpen(false)}>
                            About
                        </Link>
                        <Link to="/blogs" className="hover:text-green-600 py-2.5 px-2 rounded-md hover:bg-green-50 transition-colors" onClick={() => setMenuOpen(false)}>
                            Insights
                        </Link>

                        {/* All links always visible */}
                        <Link to="/edumpers" className="hover:text-green-600 py-2.5 px-2 rounded-md hover:bg-green-50 transition-colors" onClick={() => setMenuOpen(false)}>
                            E-Dumpers
                        </Link>
                        <Link to="/points" className="hover:text-green-600 py-2.5 px-2 rounded-md hover:bg-green-50 transition-colors" onClick={() => setMenuOpen(false)}>
                            Green Rewards
                        </Link>
                        <Link to="/gemini" className="hover:text-green-600 py-2.5 px-2 rounded-md hover:bg-green-50 transition-colors" onClick={() => setMenuOpen(false)}>
                            Eco AI
                        </Link>

                        <Link to="/contact" className="hover:text-green-600 py-2.5 px-2 rounded-md hover:bg-green-50 transition-colors" onClick={() => setMenuOpen(false)}>
                            Contact
                        </Link>

                        {/* Mobile Auth Buttons */}
                        <div className="border-t border-gray-200 pt-4 mt-2">
                            {isLoggedIn ? (
                                <div className="flex flex-col space-y-3">
                                    <Link
                                        to="/profile"
                                        className="flex items-center space-x-3 hover:text-green-600 py-2.5 px-2 rounded-md hover:bg-green-50 transition-colors"
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
                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg transition-colors duration-200 text-left"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col space-y-3">
                                    <Link
                                        to="/login"
                                        className="text-green-600 hover:text-green-700 font-medium text-center py-2.5 rounded-md hover:bg-green-50 transition-colors"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg transition-colors duration-200 text-center"
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