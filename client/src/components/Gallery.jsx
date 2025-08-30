import image1 from "../assets/images/test1.jpg";
import image2 from "../assets/images/test2.jpg";
import image3 from "../assets/images/test3.jpg";
import image4 from "../assets/images/test4.jpg";
import image5 from "../assets/images/test5.jpg";
import image6 from "../assets/images/test6.jpg";

const Gallery = () => {
    return (
        <>
            <section className="relative text-gray-600 body-font">
                <div className="container px-4 sm:px-5 py-16 md:py-20 lg:py-24 mx-auto">
                    {/* Title */}
                    <div className="flex w-full mb-8 md:mb-10 flex-wrap">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold title-font text-gray-900 mb-3 md:mb-4">
                            Examples of E-Waste
                        </h1>
                        <p className="w-full leading-relaxed text-gray-600 text-base md:text-lg">
                            From outdated computers and broken smartphones to discarded household appliances,
                            e-waste is a growing challenge worldwide. Proper recycling ensures that toxic
                            materials don't harm the environment and valuable resources are recovered responsibly.
                        </p>
                    </div>

                    {/* Gallery Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                        <div className="overflow-hidden rounded-xl shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                            <img
                                src={image1}
                                alt="Discarded computers and monitors"
                                className="w-full h-48 sm:h-56 md:h-64 object-cover"
                            />
                        </div>
                        <div className="overflow-hidden rounded-xl shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                            <img
                                src={image2}
                                alt="Old circuit boards and components"
                                className="w-full h-48 sm:h-56 md:h-64 object-cover"
                            />
                        </div>
                        <div className="overflow-hidden rounded-xl shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                            <img
                                src={image3}
                                alt="Piles of broken electronic devices"
                                className="w-full h-48 sm:h-56 md:h-64 object-cover"
                            />
                        </div>
                        <div className="overflow-hidden rounded-xl shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                            <img
                                src={image4}
                                alt="Discarded printers and appliances"
                                className="w-full h-48 sm:h-56 md:h-64 object-cover"
                            />
                        </div>
                        <div className="overflow-hidden rounded-xl shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                            <img
                                src={image5}
                                alt="Heap of old televisions"
                                className="w-full h-48 sm:h-56 md:h-64 object-cover"
                            />
                        </div>
                        <div className="overflow-hidden rounded-xl shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                            <img
                                src={image6}
                                alt="Electronic waste collection site"
                                className="w-full h-48 sm:h-56 md:h-64 object-cover"
                            />
                        </div>
                    </div>

                    {/* Extra Description */}
                    <div className="mt-16 md:mt-20">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 text-center">
                            Why Should We Care About E-Waste?
                        </h2>
                        <p className="text-gray-700 text-justify md:text-center leading-relaxed text-base md:text-lg">
                            E-waste contains toxic materials like lead, mercury, and cadmium that can seep into soil and water,
                            causing severe health risks and long-term environmental damage. At the same time, it holds valuable
                            resources such as gold, silver, and copper that can be recovered through proper recycling. By caring
                            about e-waste, we not only prevent pollution and protect ecosystems but also reduce the demand for
                            new raw materials, conserve energy, and support a cleaner, more sustainable future for generations to come.
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
};

export default Gallery;