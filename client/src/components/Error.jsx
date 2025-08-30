import Navbar from "./Navbar";
import Footer from "./Footer";

const Error = () => {
    return (
        <>
            <Navbar />
            <section className="text-gray-600 body-font mt-24 md:mt-32 lg:mt-36">
                <div className="container py-6 md:py-8 px-4 mx-auto max-w-screen-xl">
                    <div className="flex -mx-2 md:-mx-4">
                        <div className="w-full px-2 md:px-4">
                            <div className="mx-auto max-w-[300px] sm:max-w-[350px] md:max-w-[400px] text-center">
                                <h2 className="mb-2 text-[40px] sm:text-[50px] md:text-[60px] lg:text-[80px] xl:text-[100px] font-bold leading-none text-green-400">
                                    404
                                </h2>
                                <h4 className="mb-3 text-[18px] sm:text-[20px] md:text-[22px] font-semibold leading-tight text-green-400">
                                    Oops! This page is not found.
                                </h4>
                                <p className="mb-6 md:mb-8 text-base md:text-lg text-green-400">
                                    The page you are looking for it maybe deleted
                                </p>
                                <a
                                    href="/"
                                    className="inline-block px-6 py-2 md:px-8 md:py-3 text-sm md:text-base font-semibold text-center text-green-400 transition border border-green-400 rounded-lg hover:bg-green-400 hover:text-white"
                                >
                                    Go to Home
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 left-0 flex items-center justify-between w-full h-full space-x-2 md:space-x-5 lg:space-x-8 xl:space-x-14 -z-10">
                    <div className="h-full w-1/3 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]" />
                    <div className="flex w-1/3 h-full">
                        <div className="h-full w-1/2 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]" />
                        <div className="h-full w-1/2 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]" />
                    </div>
                    <div className="h-full w-1/3 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]" />
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Error;