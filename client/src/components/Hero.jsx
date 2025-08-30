import { Link } from 'react-router-dom';
import hero1 from "../assets/images/hero1.png";
import MOE_Logo from "../assets/images/MOE_Logo.png";
import blog1 from "../assets/images/blog1.jpg";
import blog2 from "../assets/images/blog2.jpg";
import blog3 from "../assets/images/test4.jpg";

const Hero = () => {
    return (
        <div className="relative">
            {/* Background decoration */}
            <div className="absolute inset-x-0 top-0 transform-gpu overflow-hidden" aria-hidden="true">
                <div
                    className="relative left-0 aspect-[1155/678] w-[36.125rem] -translate-x-0 rotate-[30deg] bg-gradient-to-tr from-[#3ba138] to-[#00ff73] opacity-30 sm:left-[calc(60%)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>

            {/* Hero Section */}
            <div className="container mx-auto flex px-4 sm:px-6 md:px-7 py-12 md:py-16 lg:py-20 md:flex-row flex-col items-center">
                <div className="lg:flex-grow md:w-1/2 lg:pr-16 xl:pr-24 md:pr-10 flex flex-col md:items-start md:text-left mb-12 md:mb-0 items-center text-center">
                    <div className="hidden sm:mb-6 md:mb-8 sm:flex sm:justify-center md:justify-start">
                        <div className="relative rounded-full px-3 py-1 text-sm md:text-base lg:text-lg leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                            Find out how your E-Waste can be recycled today. &nbsp;
                            <Link to="/blogs" className="font-semibold text-green-600">
                                <span className="absolute inset-0" aria-hidden="true" />
                                Read more <span aria-hidden="true">&rarr;</span>
                            </Link>
                        </div>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                        Welcome to Green Grid.
                    </h1>
                    <p className="mt-4 md:mt-6 text-lg md:text-xl leading-8 text-gray-800">
                        Your Solution for Responsible E-Waste Disposal
                    </p>
                    <p className="mt-4 md:mt-6 text-base md:text-lg leading-7 md:leading-8 text-gray-600">
                        Are you looking for a convenient and responsible way to dispose of your electronic waste (e-waste)? E-Waste Dumper Locator is here to assist you in finding the nearest e-waste disposal facilities, ensuring that your e-waste is handled in an environmentally friendly and ethical manner.
                    </p>
                    <div className="mt-8 md:mt-10 z-50 flex items-center justify-center md:justify-start">
                        <Link
                            className="cursor-pointer rounded-md bg-green-600 px-4 py-2.5 md:px-3.5 md:py-2.5 text-sm md:text-base font-semibold text-white shadow-sm hover:bg-green-700 transition-colors"
                            to="/edumpers"
                        >
                            Find your nearest E-Dumper
                        </Link>
                    </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-2/5 flex justify-center mt-8 md:mt-0">
                    <img
                        className="drop-shadow-2xl object-cover object-center rounded max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
                        alt="hero"
                        src={hero1}
                    />
                </div>
            </div>

            {/* Stats Section */}
            <section className="text-gray-600 body-font py-12 md:py-16">
                <div className="container px-4 sm:px-5 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12 md:mb-16">
                        <h1 className="text-2xl md:text-3xl font-medium title-font mb-4 text-gray-900">E-Waste Caused by Humans</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">By disposing of your e-waste at certified recycling centers, you contribute to reducing environmental pollution, conserving resources through proper recycling, and supporting a sustainable future.</p>
                    </div>
                    <div className="flex flex-wrap -m-2 md:-m-4 text-center">
                        <div className="p-2 md:p-4 w-1/2 md:w-1/4">
                            <div className="border-2 border-gray-200 px-2 py-4 md:px-4 md:py-6 rounded-lg">
                                <img className="text-green-500 w-12 h-12 md:w-15 md:h-15 mb-3 inline-block" width="80" height="80" src="https://img.icons8.com/dotty/80/person-male.png" alt="person-male" />
                                <h2 className="title-font font-medium text-xl md:text-2xl lg:text-3xl text-green-600">7.6kg</h2>
                                <p className="mt-2 md:mt-4 text-xs md:text-sm leading-relaxed">E-Waste generated by a single person.</p>
                            </div>
                        </div>
                        <div className="p-2 md:p-4 w-1/2 md:w-1/4">
                            <div className="border-2 border-gray-200 px-2 py-4 md:px-4 md:py-6 rounded-lg">
                                <img className="text-green-500 w-12 h-12 md:w-15 md:h-15 mb-3 inline-block" width="80" height="80" src="https://img.icons8.com/dotty/80/appliances.png" alt="appliances" />
                                <h2 className="title-font font-medium text-xl md:text-2xl lg:text-3xl text-green-600">57.4M Tons</h2>
                                <p className="mt-2 md:mt-4 text-xs md:text-sm leading-relaxed">E-waste generated World Wide</p>
                            </div>
                        </div>
                        <div className="p-2 md:p-4 w-1/2 md:w-1/4">
                            <div className="border-2 border-gray-200 px-2 py-4 md:px-4 md:py-6 rounded-lg">
                                <img className="text-green-500 w-12 h-12 md:w-15 md:h-15 mb-3 inline-block" width="80" height="80" src="https://img.icons8.com/dotty/80/factory.png" alt="factory" />
                                <h2 className="title-font font-medium text-xl md:text-2xl lg:text-3xl text-green-600">468</h2>
                                <p className="mt-2 md:mt-4 text-xs md:text-sm leading-relaxed">E-Recycler in India</p>
                            </div>
                        </div>
                        <div className="p-2 md:p-4 w-1/2 md:w-1/4">
                            <div className="border-2 border-gray-200 px-2 py-4 md:px-4 md:py-6 rounded-lg">
                                <img className="text-green-500 w-12 h-12 md:w-15 md:h-15 mb-3 inline-block" width="80" height="80" src="https://img.icons8.com/dotty/80/recycle-bin.png" alt="recycle-bin" />
                                <h2 className="title-font font-medium text-xl md:text-2xl lg:text-3xl text-green-600">75.4%</h2>
                                <p className="mt-2 md:mt-4 text-xs md:text-sm leading-relaxed">of E-Waste is collected only.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="text-gray-600 body-font py-12 md:py-16">
                <div className="container px-4 sm:px-5 mx-auto flex flex-col">
                    <div className="lg:w-4/6 mx-auto">
                        <div className="flex flex-col text-center w-full mb-8">
                            <h1 className="text-3xl md:text-4xl font-medium title-font text-gray-900">About Us</h1>
                        </div>
                        <div className="flex flex-col sm:flex-row mt-8 md:mt-10">
                            <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                                    <img src={MOE_Logo} alt="MOE_Logo" className="w-full h-full object-contain p-2" />
                                </div>
                                <div className="flex flex-col items-center text-center justify-center">
                                    <h2 className="font-medium title-font mt-4 text-gray-900 text-base md:text-lg">Ministry of Environment</h2>
                                </div>
                            </div>
                            <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                                <p className="leading-relaxed text-base md:text-lg mb-4">At Green Grid, our mission is to encourage responsible e-waste disposal by making it easy and convenient for individuals and businesses to find appropriate recycling facilities. We aim to raise awareness about the importance of recycling e-waste and its positive impact on the environment.</p>
                                <Link to="/about" className="text-green-500 inline-flex items-center hover:text-green-700 transition-colors">
                                    Learn More
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Blogs Section */}
            <section className="text-gray-600 body-font py-12 md:py-16">
                <div className="container px-4 sm:px-5 mx-auto">
                    <div className="flex flex-wrap -mx-2 md:-mx-4">
                        <div className="w-full px-2 md:px-4">
                            <div className="mx-auto mb-12 md:mb-16 max-w-[510px] text-center">
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                                    Our Blogs
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-2 md:-mx-4">
                        <div className="w-full px-2 md:px-4 md:w-1/2 lg:w-1/3 mb-8 md:mb-10">
                            <div className="mx-auto max-w-[370px]">
                                <div className="mb-6 md:mb-8 overflow-hidden rounded">
                                    <img src={blog1} alt="Blog about reducing carbon footprint" className="w-full h-40 sm:h-48 object-cover" />
                                </div>
                                <div>
                                    <h3>
                                        <Link
                                            to="/blogs"
                                            className="inline-block mb-3 text-lg md:text-xl font-semibold text-gray-900 hover:text-green-600 transition-colors"
                                        >
                                            Reduce Laptops Carbon Footprint Through IT Asset Disposal
                                        </Link>
                                    </h3>
                                    <p className="text-sm md:text-base text-gray-600">Laptops and computers have become a necessity in the digital age. On the other hand, laptop production, utilization, and disposal contribute to carbon emissions and environmental degradation.</p>
                                    <Link to="/blogs" className="mt-4 text-green-500 inline-flex items-center hover:text-green-700 transition-colors">
                                        Learn More
                                        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14"></path>
                                            <path d="M12 5l7 7-7 7"></path>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-2 md:px-4 md:w-1/2 lg:w-1/3 mb-8 md:mb-10">
                            <div className="mx-auto max-w-[370px]">
                                <div className="mb-6 md:mb-8 overflow-hidden rounded">
                                    <img src={blog2} alt="Blog about green gadgets" className="w-full h-40 sm:h-48 object-cover" />
                                </div>
                                <div>
                                    <h3>
                                        <Link
                                            to="/blogs"
                                            className="inline-block mb-3 text-lg md:text-xl font-semibold text-gray-900 hover:text-green-600 transition-colors"
                                        >
                                            Green Gadgets: Exploring Eco-Friendly Electronics Options
                                        </Link>
                                    </h3>
                                    <p className="text-sm md:text-base text-gray-600">In a generation described by means of speedy technological advances, the demand for electronics is soaring. However, with this surge in innovation comes increasing challenges for the environmental impact of digital devices.</p>
                                    <Link to="/blogs" className="mt-4 text-green-500 inline-flex items-center hover:text-green-700 transition-colors">
                                        Learn More
                                        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14"></path>
                                            <path d="M12 5l7 7-7 7"></path>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-2 md:px-4 md:w-1/2 lg:w-1/3 mb-8 md:mb-10">
                            <div className="mx-auto max-w-[370px]">
                                <div className="mb-6 md:mb-8 overflow-hidden rounded">
                                    <img src={blog3} alt="Blog about e-waste types" className="w-full h-40 sm:h-48 object-cover" />
                                </div>
                                <div>
                                    <h3>
                                        <Link
                                            to="/blogs"
                                            className="inline-block mb-3 text-lg md:text-xl font-semibold text-gray-900 hover:text-green-600 transition-colors"
                                        >
                                            Understanding e-waste: Types and consequences
                                        </Link>
                                    </h3>
                                    <p className="text-sm md:text-base text-gray-600">In the present scenario, technological advancements have become a part of our daily lives. As we refurbish our smartphones, laptops, and other electronic devices, we create a lot of electronic waste or e-waste.</p>
                                    <Link to="/blogs" className="mt-4 text-green-500 inline-flex items-center hover:text-green-700 transition-colors">
                                        Learn More
                                        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14"></path>
                                            <path d="M12 5l7 7-7 7"></path>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Hero;