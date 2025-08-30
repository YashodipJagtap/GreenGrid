import logo from "/logo.svg";

const Footer = () => {
    return (
        <footer className="text-gray-600 body-font border-t border-gray-200">
            <div className="container px-4 sm:px-6 py-6 mx-auto flex flex-col sm:flex-row items-center justify-between">

                {/* Logo Section */}
                <div className="flex items-center mb-4 sm:mb-0">
                    <a className="flex title-font font-medium items-center text-gray-900">
                        <img src={logo} alt="logo" className="w-8 h-8" />
                        <span className="ml-2 text-lg font-semibold">Green Grid</span>
                    </a>
                </div>

                {/* Copyright Section - Now centered on mobile */}
                <p className="text-sm sm:text-base text-gray-700 text-center my-4 sm:my-0 flex-1 px-2">
                    © 2025 <span className="font-medium">Green Grid </span> | All Rights Reserved
                </p>

                {/* Social Icons Section */}
                <div className="flex justify-center sm:justify-end">
                    <span className="inline-flex">
                        <a
                            href="https://twitter.com/"
                            className="ml-0 sm:ml-3 hover:text-green-700"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Twitter"
                        >
                            <svg
                                fill="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                            >
                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 8v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                            </svg>
                        </a>
                        <a
                            href="https://instagram.com/"
                            className="ml-3 hover:text-green-700"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                        >
                            <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                            >
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                            </svg>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/yashodipjagtap/"
                            className="ml-3 hover:text-green-700"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                        >
                            <svg
                                fill="currentColor"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="0"
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="none"
                                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                                ></path>
                                <circle cx="4" cy="4" r="2" stroke="none"></circle>
                            </svg>
                        </a>
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;