import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = (props) => {
    const [isShown, setIsShown] = useState(false);
    const { text } = props;

    return (
        <div
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
            style={{
                position: "relative",
            }}
        >
            <img
                width="40"
                height="40"
                src="https://img.icons8.com/fluency/48/recycle-bin.png"
                alt="recycle-bin"
            />
            <div
                style={{
                    backgroundColor: "white",
                    borderRadius: "10px",
                    boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.2)",
                    position: "absolute",
                    top: "-60px",
                    left: "-60px",
                    display: isShown ? "inline-block" : "none",
                    text: "center",
                    padding: "8px",
                    width: "150px",
                    fontSize: "15px",
                    zIndex: "9999",
                }}
            >
                {text}
            </div>
        </div>
    );
};

const Edumpers = () => {
    const [edumpers, setEdumpers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState({});
    const [nearestEdumpers, setNearestEdumpers] = useState(false);
    const [size, setSize] = useState("Small Electronics");
    const [item, setItem] = useState("Smartphone");
    const [weight, setWeight] = useState(0);
    const [points, setPoints] = useState(0);
    const [couponCode, setCouponCode] = useState("");
    const [message, setMessage] = useState("");

    const [defaultProps, setDefaultProps] = useState({
        center: {
            lat: 28.7041,
            lng: 77.1025,
        },
        zoom: 5,
    });

    useEffect(() => {
        getEdumpers().then((data) => {
            setEdumpers(data);
            setLoading(false);
        });

        // Get user's current location
        navigator.geolocation.getCurrentPosition((position) => {
            setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        });

        return () => {
            setEdumpers([]);
            setLoading(true);
            setLocation({});
        };
    }, []);

    const getEdumpers = async () => {
        // Replace this with your actual data fetching logic
        return [
            { id: 1, name: "E-Dumper 1", latitude: 19.0760, longitude: 72.8777 }, // Mumbai
            { id: 2, name: "E-Dumper 2", latitude: 18.5204, longitude: 73.8567 }, // Pune
            { id: 3, name: "E-Dumper 3", latitude: 20.0110, longitude: 73.7903 }, // Nashik
            { id: 4, name: "E-Dumper 4", latitude: 19.2183, longitude: 73.1645 }, // Kalyan
            { id: 5, name: "E-Dumper 5", latitude: 19.2403, longitude: 73.1305 }, // Thane
            { id: 6, name: "E-Dumper 6", latitude: 19.9975, longitude: 73.7898 }, // Nashik Road
            { id: 7, name: "E-Dumper 7", latitude: 19.8762, longitude: 75.3433 }, // Aurangabad
            { id: 8, name: "E-Dumper 8", latitude: 17.6599, longitude: 75.9064 }, // Solapur
            { id: 9, name: "E-Dumper 9", latitude: 16.8524, longitude: 74.5815 }, // Kolhapur
            { id: 10, name: "E-Dumper 10", latitude: 21.1458, longitude: 79.0882 }, // Nagpur
            { id: 11, name: "E-Dumper 11", latitude: 19.8876, longitude: 75.3392 }, // Jalna
            { id: 12, name: "E-Dumper 12", latitude: 20.7463, longitude: 78.6022 }, // Akola
            { id: 13, name: "E-Dumper 13", latitude: 21.1702, longitude: 79.0882 }, // Nagpur (different area)
            { id: 14, name: "E-Dumper 14", latitude: 16.7050, longitude: 74.2433 }, // Sangli
            { id: 15, name: "E-Dumper 15", latitude: 18.4077, longitude: 76.5604 }, // Latur
            { id: 16, name: "E-Dumper 16", latitude: 21.4621, longitude: 80.1842 }, // Gondia
            { id: 17, name: "E-Dumper 17", latitude: 19.2660, longitude: 76.7786 }, // Parbhani
            { id: 18, name: "E-Dumper 18", latitude: 19.8465, longitude: 75.8868 }, // Beed
            { id: 19, name: "E-Dumper 19", latitude: 19.3303, longitude: 76.1373 }, // Nanded
            { id: 20, name: "E-Dumper 20", latitude: 19.9085, longitude: 75.5519 }, // Ahmednagar
            { id: 21, name: "E-Dumper 21", latitude: 20.3903, longitude: 78.1306 }, // Amravati
            { id: 22, name: "E-Dumper 22", latitude: 21.3255, longitude: 76.2311 }, // Jalgaon
            { id: 23, name: "E-Dumper 23", latitude: 19.5744, longitude: 74.9910 }, // Shirdi
            { id: 24, name: "E-Dumper 24", latitude: 18.9932, longitude: 73.1175 }, // Navi Mumbai
            { id: 25, name: "E-Dumper 25", latitude: 20.3204, longitude: 74.9803 }, // Malegaon
            { id: 26, name: "E-Dumper 26", latitude: 19.8194, longitude: 74.3213 },
            { id: 27, name: "E-Dumper 27", latitude: 20.6233, longitude: 74.4561 },
            { id: 28, name: "E-Dumper 28", latitude: 18.8752, longitude: 73.4567 },
            { id: 29, name: "E-Dumper 29", latitude: 21.0557, longitude: 80.2434 },
            { id: 30, name: "E-Dumper 30", latitude: 19.1274, longitude: 74.6723 },
            { id: 31, name: "E-Dumper 31", latitude: 18.2653, longitude: 73.6982 },
            { id: 32, name: "E-Dumper 32", latitude: 17.8765, longitude: 75.2368 },
            { id: 33, name: "E-Dumper 33", latitude: 19.2983, longitude: 73.1273 },
            { id: 34, name: "E-Dumper 34", latitude: 19.9782, longitude: 74.7313 },
            { id: 35, name: "E-Dumper 35", latitude: 21.1923, longitude: 80.2845 },
            { id: 36, name: "E-Dumper 36", latitude: 20.7624, longitude: 78.9023 },
            { id: 37, name: "E-Dumper 37", latitude: 19.8976, longitude: 75.9764 },
            { id: 38, name: "E-Dumper 38", latitude: 18.6723, longitude: 73.8294 },
            { id: 39, name: "E-Dumper 39", latitude: 19.7834, longitude: 73.1298 },
            { id: 40, name: "E-Dumper 40", latitude: 19.4432, longitude: 73.9724 },
            { id: 41, name: "E-Dumper 41", latitude: 18.2473, longitude: 73.4567 },
            { id: 42, name: "E-Dumper 42", latitude: 19.9284, longitude: 74.1342 },
            { id: 43, name: "E-Dumper 43", latitude: 17.7383, longitude: 73.4321 },
            { id: 44, name: "E-Dumper 44", latitude: 21.5673, longitude: 79.2345 },
            { id: 45, name: "E-Dumper 45", latitude: 19.3847, longitude: 74.9731 },
            { id: 46, name: "E-Dumper 46", latitude: 20.0034, longitude: 75.8745 },
            { id: 47, name: "E-Dumper 47", latitude: 18.7654, longitude: 73.2345 },
            { id: 48, name: "E-Dumper 48", latitude: 19.7654, longitude: 74.1234 },
            { id: 49, name: "E-Dumper 49", latitude: 20.3456, longitude: 75.6789 },
            { id: 50, name: "E-Dumper 50", latitude: 21.0987, longitude: 79.4567 },
            { id: 51, name: "E-Dumper 51", latitude: 19.3214, longitude: 75.4321 }, { id: 52, name: "E-Dumper 52", latitude: 18.5310, longitude: 73.8496 },
            { id: 53, name: "E-Dumper 53", latitude: 19.1442, longitude: 73.0314 },
            { id: 54, name: "E-Dumper 54", latitude: 19.9990, longitude: 75.7683 },
            { id: 55, name: "E-Dumper 55", latitude: 20.2234, longitude: 74.4532 },
            { id: 56, name: "E-Dumper 56", latitude: 19.5432, longitude: 73.1234 },
            { id: 57, name: "E-Dumper 57", latitude: 18.8765, longitude: 74.5643 },
            { id: 58, name: "E-Dumper 58", latitude: 19.2103, longitude: 75.1098 },
            { id: 59, name: "E-Dumper 59", latitude: 19.9084, longitude: 74.4567 },
            { id: 60, name: "E-Dumper 60", latitude: 20.1098, longitude: 75.3456 },
            { id: 61, name: "E-Dumper 61", latitude: 18.4321, longitude: 73.8976 },
            { id: 62, name: "E-Dumper 62", latitude: 19.5430, longitude: 74.2034 },
            { id: 63, name: "E-Dumper 63", latitude: 19.8765, longitude: 73.7654 },
            { id: 64, name: "E-Dumper 64", latitude: 20.1324, longitude: 74.8765 },
            { id: 65, name: "E-Dumper 65", latitude: 21.0342, longitude: 75.4321 },
            { id: 66, name: "E-Dumper 66", latitude: 19.2453, longitude: 74.9876 },
            { id: 67, name: "E-Dumper 67", latitude: 18.9543, longitude: 73.6754 },
            { id: 68, name: "E-Dumper 68", latitude: 19.7654, longitude: 75.4321 },
            { id: 69, name: "E-Dumper 69", latitude: 20.5432, longitude: 74.1234 },
            { id: 70, name: "E-Dumper 70", latitude: 19.8765, longitude: 74.5432 },
            { id: 71, name: "E-Dumper 71", latitude: 19.3214, longitude: 74.9876 },
            { id: 72, name: "E-Dumper 72", latitude: 20.8765, longitude: 75.3214 },
            { id: 73, name: "E-Dumper 73", latitude: 18.4321, longitude: 73.8765 },
            { id: 74, name: "E-Dumper 74", latitude: 19.5678, longitude: 74.1234 },
            { id: 75, name: "E-Dumper 75", latitude: 19.9876, longitude: 75.5432 },
            { id: 76, name: "E-Dumper 76", latitude: 19.1098, longitude: 73.4321 },
            { id: 77, name: "E-Dumper 77", latitude: 20.5432, longitude: 74.8765 },
            { id: 78, name: "E-Dumper 78", latitude: 19.6543, longitude: 74.1098 },
            { id: 79, name: "E-Dumper 79", latitude: 18.8765, longitude: 73.7654 },
            { id: 80, name: "E-Dumper 80", latitude: 19.7654, longitude: 75.4321 },
            { id: 81, name: "E-Dumper 81", latitude: 20.5432, longitude: 74.9876 },
            { id: 82, name: "E-Dumper 82", latitude: 19.3214, longitude: 74.5678 },
            { id: 83, name: "E-Dumper 83", latitude: 18.4321, longitude: 73.6543 },
            { id: 84, name: "E-Dumper 84", latitude: 19.5432, longitude: 74.3214 },
            { id: 85, name: "E-Dumper 85", latitude: 19.9876, longitude: 75.4321 },
            { id: 86, name: "E-Dumper 86", latitude: 19.4321, longitude: 74.7654 },
            { id: 87, name: "E-Dumper 87", latitude: 20.7654, longitude: 74.4321 },
            { id: 88, name: "E-Dumper 88", latitude: 19.5432, longitude: 73.8765 },
            { id: 89, name: "E-Dumper 89", latitude: 19.9876, longitude: 74.4321 },
            { id: 90, name: "E-Dumper 90", latitude: 18.6543, longitude: 73.9876 },
            { id: 91, name: "E-Dumper 91", latitude: 19.5432, longitude: 74.7654 },
            { id: 92, name: "E-Dumper 92", latitude: 20.4321, longitude: 74.8765 },
            { id: 93, name: "E-Dumper 93", latitude: 19.9876, longitude: 74.5432 },
            { id: 94, name: "E-Dumper 94", latitude: 18.5432, longitude: 73.8765 },
            { id: 95, name: "E-Dumper 95", latitude: 19.8765, longitude: 75.4321 },
            { id: 96, name: "E-Dumper 96", latitude: 19.4321, longitude: 74.9876 },
            { id: 97, name: "E-Dumper 97", latitude: 20.5432, longitude: 74.7654 },
            { id: 98, name: "E-Dumper 98", latitude: 19.8765, longitude: 74.3214 },
            { id: 99, name: "E-Dumper 99", latitude: 18.4321, longitude: 73.9876 },
            { id: 100, name: "E-Dumper 100", latitude: 19.9876, longitude: 74.5432 }, { id: 101, name: "E-Dumper 101", latitude: 18.6543, longitude: 73.4321 },
            { id: 102, name: "E-Dumper 102", latitude: 19.5432, longitude: 74.7654 },
            { id: 103, name: "E-Dumper 103", latitude: 20.8765, longitude: 75.4321 },
            { id: 104, name: "E-Dumper 104", latitude: 19.4321, longitude: 74.8765 },
            { id: 105, name: "E-Dumper 105", latitude: 18.7654, longitude: 73.6543 },
            { id: 106, name: "E-Dumper 106", latitude: 19.9876, longitude: 74.5432 },
            { id: 107, name: "E-Dumper 107", latitude: 20.5432, longitude: 74.9876 },
            { id: 108, name: "E-Dumper 108", latitude: 19.3214, longitude: 74.7654 },
            { id: 109, name: "E-Dumper 109", latitude: 18.8765, longitude: 73.8765 },
            { id: 110, name: "E-Dumper 110", latitude: 19.7654, longitude: 74.5432 },
            { id: 111, name: "E-Dumper 111", latitude: 20.4321, longitude: 75.8765 },
            { id: 112, name: "E-Dumper 112", latitude: 19.8765, longitude: 74.3214 },
            { id: 113, name: "E-Dumper 113", latitude: 18.6543, longitude: 73.9876 },
            { id: 114, name: "E-Dumper 114", latitude: 19.4321, longitude: 74.6543 },
            { id: 115, name: "E-Dumper 115", latitude: 19.9876, longitude: 75.4321 },
            { id: 116, name: "E-Dumper 116", latitude: 20.5432, longitude: 74.7654 },
            { id: 117, name: "E-Dumper 117", latitude: 19.8765, longitude: 74.5432 },
            { id: 118, name: "E-Dumper 118", latitude: 18.5432, longitude: 73.8765 },
            { id: 119, name: "E-Dumper 119", latitude: 19.6543, longitude: 74.3214 },
            { id: 120, name: "E-Dumper 120", latitude: 19.9876, longitude: 74.9876 },
            { id: 121, name: "E-Dumper 121", latitude: 20.7654, longitude: 75.4321 },
            { id: 122, name: "E-Dumper 122", latitude: 19.5432, longitude: 74.7654 },
            { id: 123, name: "E-Dumper 123", latitude: 19.3214, longitude: 74.8765 },
            { id: 124, name: "E-Dumper 124", latitude: 18.4321, longitude: 73.9876 },
            { id: 125, name: "E-Dumper 125", latitude: 19.5432, longitude: 74.6543 },
            { id: 126, name: "E-Dumper 126", latitude: 19.9876, longitude: 75.3214 },
            { id: 127, name: "E-Dumper 127", latitude: 20.6543, longitude: 74.4321 },
            { id: 128, name: "E-Dumper 128", latitude: 19.8765, longitude: 74.5432 },
            { id: 129, name: "E-Dumper 129", latitude: 18.5432, longitude: 73.7654 },
            { id: 130, name: "E-Dumper 130", latitude: 19.6543, longitude: 74.8765 },
            { id: 131, name: "E-Dumper 131", latitude: 19.9876, longitude: 75.6543 },
            { id: 132, name: "E-Dumper 132", latitude: 20.4321, longitude: 74.8765 },
            { id: 133, name: "E-Dumper 133", latitude: 19.8765, longitude: 74.4321 },
            { id: 134, name: "E-Dumper 134", latitude: 18.4321, longitude: 73.9876 },
            { id: 135, name: "E-Dumper 135", latitude: 19.5432, longitude: 74.8765 },
            { id: 136, name: "E-Dumper 136", latitude: 19.9876, longitude: 75.5432 },
            { id: 137, name: "E-Dumper 137", latitude: 20.7654, longitude: 74.4321 },
            { id: 138, name: "E-Dumper 138", latitude: 19.4321, longitude: 74.8765 },
            { id: 139, name: "E-Dumper 139", latitude: 18.5432, longitude: 73.9876 },
            { id: 140, name: "E-Dumper 140", latitude: 19.8765, longitude: 74.5432 },
            { id: 141, name: "E-Dumper 141", latitude: 19.3214, longitude: 74.6543 },
            { id: 142, name: "E-Dumper 142", latitude: 18.4321, longitude: 73.8765 },
            { id: 143, name: "E-Dumper 143", latitude: 19.9876, longitude: 75.4321 },
            { id: 144, name: "E-Dumper 144", latitude: 20.5432, longitude: 74.8765 },
            { id: 145, name: "E-Dumper 145", latitude: 19.8765, longitude: 74.4321 },
            { id: 146, name: "E-Dumper 146", latitude: 18.4321, longitude: 73.9876 },
            { id: 147, name: "E-Dumper 147", latitude: 19.5432, longitude: 74.7654 },
            { id: 148, name: "E-Dumper 148", latitude: 19.9876, longitude: 75.3214 },
            { id: 149, name: "E-Dumper 149", latitude: 20.6543, longitude: 74.4321 },
            { id: 150, name: "E-Dumper 150", latitude: 19.8765, longitude: 74.5432 } 
        ];
    };

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    };

    const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) *
            Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const getNearestEdumpers = () => {
        setNearestEdumpers(true);
        const nearLocation = edumpers.filter((edumper) => {
            const distance = getDistanceFromLatLonInKm(
                location.latitude,
                location.longitude,
                edumper.latitude,
                edumper.longitude
            );
            return distance <= 100;
        });

        setEdumpers(nearLocation);

        setDefaultProps({
            center: {
                lat: location.latitude,
                lng: location.longitude,
            },
            zoom: 8,
        });
    };

    const calculatePoints = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/calculate-points`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ size, weight }),
            });
            const data = await response.json();
            setPoints(data.points);
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/validate-coupon`, {
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

    const handleRedeem = (rewardPoints) => {
        if (points >= rewardPoints) {
            setPoints(points - rewardPoints);
            setMessage(`You have successfully redeemed ${rewardPoints} points!`);
        } else {
            setMessage("You do not have enough points to redeem this reward.");
        }
    };

    return (
        <>
            <Navbar />

            <section className="bg-white-900 text-black">
                <div className="mx-auto max-w-screen-xl mt-10">
                    <div className="mx-auto max-w-1xl text-left">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                            Find your nearest Edumpers
                        </h1>
                        <div className="relative text-green-400 rounded py-3 text-md leading-6">
                            Make sure your location is on.
                        </div>
                    </div>
                    <a
                        className="mb-4 cursor-pointer inline-flex items-left gap-2 rounded border border-indigo-600 bg-indigo-600 px-5 py-2 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                        onClick={getNearestEdumpers}
                    >
                        <span className="text-sm font-medium"> Click Here </span>
                        <svg
                            className="h-5 w-5 rtl:rotate-180"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </a>

                    <div style={{ height: "60vh", width: "100%" }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_API_KEY }}
                            defaultCenter={defaultProps.center}
                            defaultZoom={defaultProps.zoom}
                        >
                            {edumpers?.map((edumper) => (
                                <AnyReactComponent
                                    lat={edumper.latitude}
                                    lng={edumper.longitude}
                                    text={edumper.name}
                                    key={edumper.id}
                                />
                            ))}
                        </GoogleMapReact>
                    </div>
                </div>
            </section>



            {/* Rest of your frontend code remains the same */}
            <Footer />
        </>
    );
};

export default Edumpers;