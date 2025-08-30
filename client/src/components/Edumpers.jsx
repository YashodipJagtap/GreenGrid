import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = (props) => {
    const [isShown, setIsShown] = useState(false);
    const { text, status, capacity, hours, phone, materials, address } = props;

    return (
        <div
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
            onClick={() => setIsShown(!isShown)}
            style={{
                position: "relative",
                cursor: "pointer",
                transform: isShown ? "scale(1.2)" : "scale(1)",
                transition: "transform 0.3s ease"
            }}
        >
            <img
                width="40"
                height="40"
                src="https://img.icons8.com/fluency/48/recycle-bin.png"
                alt="recycle-bin"
                style={{
                    filter: status === "Full" ? "grayscale(100%)" : "none",
                    opacity: status === "Closed" ? 0.5 : 1
                }}
            />
            <div
                className="map-tooltip"
                style={{
                    backgroundColor: "white",
                    borderRadius: "10px",
                    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.3)",
                    position: "absolute",
                    top: window.innerWidth < 768 ? "-10px" : "-220px",
                    left: window.innerWidth < 768 ? "50px" : "-100px",
                    display: isShown ? "block" : "none",
                    padding: "12px",
                    width: window.innerWidth < 768 ? "200px" : "250px",
                    fontSize: "14px",
                    zIndex: "9999",
                    lineHeight: "1.5"
                }}
            >
                <h4 className="font-bold text-green-700 mb-2">{text}</h4>
                <p className="mb-1"><span className="font-semibold">Status:</span>
                    <span className={status === "Available" ? "text-green-600" : status === "Full" ? "text-red-600" : "text-gray-600"}>
                        {" " + status}
                    </span>
                </p>
                <p className="mb-1"><span className="font-semibold">Capacity:</span> {capacity}</p>
                <p className="mb-1"><span className="font-semibold">Hours:</span> {hours}</p>
                <p className="mb-1"><span className="font-semibold">Phone:</span> {phone}</p>
                <p className="mb-1"><span className="font-semibold">Address:</span> {address}</p>
                <p className="mb-1"><span className="font-semibold">Materials:</span> {materials.join(", ")}</p>
            </div>
        </div>
    );
};

const Edumpers = () => {
    const [edumpers, setEdumpers] = useState([]);
    const [filteredEdumpers, setFilteredEdumpers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState(null);
    const [nearestEdumpers, setNearestEdumpers] = useState(false);
    const [defaultProps, setDefaultProps] = useState({
        center: { lat: 20.5937, lng: 78.9629 }, // Center of India
        zoom: 5,
    });
    const [filters, setFilters] = useState({
        status: "All",
        capacity: "All",
        search: ""
    });
    const [selectedEdumper, setSelectedEdumper] = useState(null);
    const [routeInfo, setRouteInfo] = useState(null);
    const [userLocationName, setUserLocationName] = useState("");
    const [stats, setStats] = useState({ total: 0, available: 0, full: 0, closed: 0 });
    const [map, setMap] = useState(null);
    const [maps, setMaps] = useState(null);
    const [directionsRenderer, setDirectionsRenderer] = useState(null);
    const [showTutorial, setShowTutorial] = useState(false);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [scheduleForm, setScheduleForm] = useState({
        name: "",
        address: "",
        phone: "",
        date: "",
        time: "",
        items: ""
    });
    const [currentFactIndex, setCurrentFactIndex] = useState(0);
    const [locationError, setLocationError] = useState("");
    const [showFilters] = useState(true); // Always show filters
    const [impactData, setImpactData] = useState({
        smartphones: 0,
        laptops: 0,
        monitors: 0,
        tablets: 0,
        printers: 0
    });
    const [impactResult, setImpactResult] = useState(null);

    // Sample schedule data for pickup services
    const pickupSchedule = [
        { id: 1, area: "South Zone", days: "Mon, Wed, Fri", time: "9:00 AM - 12:00 PM" },
        { id: 2, area: "North Zone", days: "Tue, Thu, Sat", time: "10:00 AM - 1:00 PM" },
        { id: 3, area: "East Zone", days: "Mon, Thu, Sat", time: "2:00 PM - 5:00 PM" },
        { id: 4, area: "West Zone", days: "Wed, Fri, Sun", time: "11:00 AM - 2:00 PM" },
        { id: 5, area: "Central Zone", days: "Tue, Fri, Sun", time: "1:00 PM - 4:00 PM" }
    ];

    // E-waste facts for the carousel
    const ewasteFacts = [
        "Only 17.4% of e-waste is properly recycled worldwide",
        "A million cell phones contain 35,000 lbs of copper and 772 lbs of silver",
        "Recycling 1 million laptops saves energy equivalent to electricity for 3,500 US homes",
        "E-waste represents 2% of America's trash in landfills but 70% of overall toxic waste",
        "Electronic devices contain valuable materials like gold, silver, and platinum",
        "It takes 530 lbs of fossil fuel, 48 lbs of chemicals, and 1.5 tons of water to manufacture one computer",
        "Recycling circuit boards can be more valuable than mining for ore",
        "Over 40 million metric tons of e-waste is generated globally each year",
        "Only 12.5% of e-waste is currently recycled",
        "The average household has 24 electronic products",
        "E-waste is the fastest-growing waste stream in the world",
        "Recycling one million laptops saves the energy equivalent to the electricity used by 3,500 US homes in a year",
        "A single CRT computer monitor can contain up to 3.5 kg of lead",
        "Only 10% of smartphones are recycled properly",
        "The gold recovered from 1 ton of circuit boards is equivalent to the amount recovered from 17 tons of gold ore",
        "Over 100,000 mobile phones are discarded every day in India alone",
        "E-waste contains over 1,000 different substances, many of which are toxic",
        "Proper recycling of e-waste creates jobs - 15 times more than landfilling or incineration",
        "The value of raw materials in e-waste is estimated at $62.5 billion annually",
        "If all e-waste was properly recycled, we could recover enough gold to make 2.5 million wedding rings"
    ];

    // Impact calculation data
    const impactCalculations = {
        smartphones: {
            energy: 40, // hours of laptop usage
            water: 100, // liters saved
            co2: 5, // kg of CO2 prevented
            gold: 0.034, // grams of gold recovered
            silver: 0.35, // grams of silver recovered
            copper: 15 // grams of copper recovered
        },
        laptops: {
            energy: 48, // hours of home electricity
            water: 500, // liters saved
            co2: 30, // kg of CO2 prevented
            gold: 0.2, // grams of gold recovered
            silver: 1.0, // grams of silver recovered
            copper: 200 // grams of copper recovered
        },
        monitors: {
            energy: 24, // hours of home electricity
            water: 300, // liters saved
            co2: 20, // kg of CO2 prevented
            lead: 4, // kg of lead prevented from environment
            glass: 7 // kg of glass recycled
        },
        tablets: {
            energy: 25, // hours of laptop usage
            water: 150, // liters saved
            co2: 8, // kg of CO2 prevented
            gold: 0.02, // grams of gold recovered
            silver: 0.2, // grams of silver recovered
            copper: 10 // grams of copper recovered
        },
        printers: {
            energy: 15, // hours of home electricity
            water: 200, // liters saved
            co2: 12, // kg of CO2 prevented
            plastic: 2.5, // kg of plastic recycled
            steel: 1.8 // kg of steel recycled
        }
    };

    useEffect(() => {
        getEdumpers().then((data) => {
            setEdumpers(data);
            setFilteredEdumpers(data);
            setLoading(false);

            // Calculate stats
            const available = data.filter(e => e.status === "Available").length;
            const full = data.filter(e => e.status === "Full").length;
            const closed = data.filter(e => e.status === "Closed").length;
            setStats({ total: data.length, available, full, closed });
        });

        // Get user's current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const userLoc = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    };
                    setLocation(userLoc);
                    setLocationError("");

                    // Update map center to user location
                    setDefaultProps(prev => ({
                        ...prev,
                        center: { lat: userLoc.latitude, lng: userLoc.longitude },
                        zoom: 12
                    }));

                    // Get location name using reverse geocoding
                    try {
                        const response = await fetch(
                            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${userLoc.latitude},${userLoc.longitude}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`
                        );
                        const data = await response.json();
                        if (data.results && data.results[0]) {
                            setUserLocationName(data.results[0].formatted_address);
                        }
                    } catch (error) {
                        console.error("Error getting location name:", error);
                    }
                },
                (error) => {
                    console.error("Error getting location:", error);
                    setLocationError("Location access denied. Please enable location services to use all features.");
                    setUserLocationName("Location access denied - using default location");
                }
            );
        } else {
            setLocationError("Geolocation is not supported by this browser.");
            setUserLocationName("Geolocation not supported");
        }

        // Set up fact carousel rotation
        const factInterval = setInterval(() => {
            setCurrentFactIndex((prev) => (prev + 1) % ewasteFacts.length);
        }, 7000);

        return () => {
            clearInterval(factInterval);
        };
    }, []);

    const getEdumpers = async () => {
        // Enhanced data with more properties for each e-dumper
        return [
            {
                id: 1, name: "E-Dumper Mumbai Central", latitude: 19.0760, longitude: 72.8777,
                status: "Available", capacity: "75%", hours: "8AM-8PM", phone: "+91-22-12345678",
                address: "Mumbai Central, Mumbai", materials: ["Phones", "Laptops", "Batteries"]
            },
            {
                id: 2, name: "E-Dumper Pune Station", latitude: 18.5204, longitude: 73.8567,
                status: "Full", capacity: "100%", hours: "9AM-7PM", phone: "+91-20-87654321",
                address: "Pune Railway Station, Pune", materials: ["Monitors", "Printers", "Cables"]
            },
            {
                id: 3, name: "E-Dumper Nashik City", latitude: 20.0110, longitude: 73.7903,
                status: "Available", capacity: "60%", hours: "8:30AM-7:30PM", phone: "+91-253-1234567",
                address: "City Center, Nashik", materials: ["Phones", "Tablets", "Accessories"]
            },
            {
                id: 4, name: "E-Dumper Kalyan West", latitude: 19.2183, longitude: 73.1645,
                status: "Closed", capacity: "N/A", hours: "9AM-6PM", phone: "+91-251-2345678",
                address: "West Kalyan, Kalyan", materials: ["All Types"]
            },
            {
                id: 5, name: "E-Dumper Thane East", latitude: 19.2403, longitude: 73.1305,
                status: "Available", capacity: "45%", hours: "8AM-8PM", phone: "+91-22-34567890",
                address: "East Thane, Thane", materials: ["Laptops", "Monitors", "Batteries"]
            },
            {
                id: 6, name: "E-Dumper Nagpur Central", latitude: 21.1458, longitude: 79.0882,
                status: "Available", capacity: "30%", hours: "8:30AM-7:30PM", phone: "+91-712-4567890",
                address: "Central Nagpur, Nagpur", materials: ["Phones", "Tablets", "Accessories"]
            },
            {
                id: 7, name: "E-Dumper Aurangabad", latitude: 19.8762, longitude: 75.3433,
                status: "Available", capacity: "50%", hours: "9AM-6PM", phone: "+91-240-5678901",
                address: "Aurangabad City", materials: ["All Types"]
            },
            {
                id: 8, name: "E-Dumper Solapur", latitude: 17.6599, longitude: 75.9064,
                status: "Full", capacity: "100%", hours: "8AM-7PM", phone: "+91-217-6789012",
                address: "Solapur Main Road", materials: ["Monitors", "Printers"]
            },
            {
                id: 9, name: "E-Dumper Kolhapur", latitude: 16.8524, longitude: 74.5815,
                status: "Available", capacity: "25%", hours: "8:30AM-7PM", phone: "+91-231-7890123",
                address: "Kolhapur City Center", materials: ["Phones", "Laptops", "Batteries"]
            },
            {
                id: 10, name: "E-Dumper Jalna", latitude: 19.8876, longitude: 75.3392,
                status: "Available", capacity: "65%", hours: "9AM-6:30PM", phone: "+91-248-8901234",
                address: "Jalna Market Area", materials: ["All Types"]
            },
            {
                id: 11, name: "E-Dumper Delhi Central", latitude: 28.6139, longitude: 77.2090,
                status: "Available", capacity: "80%", hours: "8AM-8PM", phone: "+91-11-12345678",
                address: "Connaught Place, Delhi", materials: ["All Types"]
            },
            {
                id: 12, name: "E-Dumper Bangalore Tech", latitude: 12.9716, longitude: 77.5946,
                status: "Available", capacity: "40%", hours: "9AM-7PM", phone: "+91-80-87654321",
                address: "Electronic City, Bangalore", materials: ["Computers", "Servers", "Networking"]
            }
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
        if (!location) {
            setLocationError("Please enable location services to find nearest E-Dumpers.");
            return;
        }

        setNearestEdumpers(true);

        // Add distance to each edumper and sort by distance
        const edumpersWithDistance = edumpers.map(edumper => {
            const distance = getDistanceFromLatLonInKm(
                location.latitude,
                location.longitude,
                edumper.latitude,
                edumper.longitude
            );
            return { ...edumper, distance };
        });

        // Sort by distance and take top 5
        const nearest = edumpersWithDistance
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 5);

        setFilteredEdumpers(nearest);

        setDefaultProps({
            center: {
                lat: location.latitude,
                lng: location.longitude,
            },
            zoom: 11,
        });
    };

    const handleApiLoaded = (map, maps) => {
        setMap(map);
        setMaps(maps);

        // Initialize directions renderer
        const renderer = new maps.DirectionsRenderer({
            suppressMarkers: true,
            preserveViewport: true,
            polylineOptions: {
                strokeColor: "#10B981",
                strokeWeight: 5
            }
        });
        setDirectionsRenderer(renderer);
        renderer.setMap(map);
    };

    const getDirections = (edumper) => {
        if (!map || !maps || !location) {
            setLocationError("Please enable location services to get directions.");
            return;
        }

        const directionsService = new maps.DirectionsService();

        directionsService.route(
            {
                origin: { lat: location.latitude, lng: location.longitude },
                destination: { lat: edumper.latitude, lng: edumper.longitude },
                travelMode: maps.TravelMode.DRIVING
            },
            (result, status) => {
                if (status === "OK") {   // ✅ Fix: check string "OK"
                    directionsRenderer.setDirections(result);

                    setRouteInfo({
                        distance: result.routes[0].legs[0].distance.text,
                        duration: result.routes[0].legs[0].duration.text
                    });
                    setSelectedEdumper(edumper);

                    // Zoom to fit both locations
                    const bounds = new maps.LatLngBounds();
                    bounds.extend(new maps.LatLng(location.latitude, location.longitude));
                    bounds.extend(new maps.LatLng(edumper.latitude, edumper.longitude));
                    map.fitBounds(bounds);
                } else {
                    console.error(`Error fetching directions: ${status}`);
                    setLocationError("Could not get directions. Please try again.");
                }
            }
        );
    };

    const clearDirections = () => {
        if (directionsRenderer) {
            directionsRenderer.setDirections({ routes: [] });
            setRouteInfo(null);
            setSelectedEdumper(null);
        }
    };

    const handleFilterChange = (filterType, value) => {
        const newFilters = { ...filters, [filterType]: value };
        setFilters(newFilters);

        let filtered = [...edumpers];

        // Apply status filter
        if (newFilters.status !== "All") {
            filtered = filtered.filter(e => e.status === newFilters.status);
        }

        // Apply capacity filter (simplified example)
        if (newFilters.capacity !== "All") {
            if (newFilters.capacity === "High") {
                filtered = filtered.filter(e => e.status === "Available" && parseInt(e.capacity) >= 70);
            } else if (newFilters.capacity === "Medium") {
                filtered = filtered.filter(e => e.status === "Available" &&
                    parseInt(e.capacity) >= 30 && parseInt(e.capacity) < 70);
            } else if (newFilters.capacity === "Low") {
                filtered = filtered.filter(e => e.status === "Available" && parseInt(e.capacity) < 30);
            }
        }

        // Apply search filter
        if (newFilters.search) {
            const searchLower = newFilters.search.toLowerCase();
            filtered = filtered.filter(e =>
                e.name.toLowerCase().includes(searchLower) ||
                e.address.toLowerCase().includes(searchLower) ||
                e.materials.some(m => m.toLowerCase().includes(searchLower))
            );
        }

        setFilteredEdumpers(filtered);
    };

    const resetFilters = () => {
        setFilters({ status: "All", capacity: "All", search: "" });
        setFilteredEdumpers(edumpers);
        setNearestEdumpers(false);
    };

    const shareLocation = (edumper) => {
        if (navigator.share) {
            navigator.share({
                title: `E-Dumper: ${edumper.name}`,
                text: `Check out this E-Dumper location at ${edumper.address}. Status: ${edumper.status}, Capacity: ${edumper.capacity}`,
                url: window.location.href
            }).catch(error => {
                console.log('Error sharing:', error);
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            const shareText = `E-Dumper Location: ${edumper.name}\nAddress: ${edumper.address}\nStatus: ${edumper.status}\nCapacity: ${edumper.capacity}\nHours: ${edumper.hours}\nPhone: ${edumper.phone}`;
            navigator.clipboard.writeText(shareText).then(() => {
                alert("E-Dumper information copied to clipboard!");
            });
        }
    };

    const handleScheduleSubmit = (e) => {
        e.preventDefault();
        alert(`Thank you, ${scheduleForm.name}! Your pickup has been scheduled for ${scheduleForm.date} at ${scheduleForm.time}. We'll contact you at ${scheduleForm.phone} to confirm.`);
        setShowScheduleModal(false);
        setScheduleForm({
            name: "",
            address: "",
            phone: "",
            date: "",
            time: "",
            items: ""
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setScheduleForm({
            ...scheduleForm,
            [name]: value
        });
    };

    const requestLocationAccess = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLoc = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    };
                    setLocation(userLoc);
                    setLocationError("");

                    // Update map center to user location
                    setDefaultProps(prev => ({
                        ...prev,
                        center: { lat: userLoc.latitude, lng: userLoc.longitude },
                        zoom: 12
                    }));
                },
                (error) => {
                    console.error("Error getting location:", error);
                    setLocationError("Location access denied. Please enable location services in your browser settings.");
                }
            );
        } else {
            setLocationError("Geolocation is not supported by this browser.");
        }
    };

    const handleImpactChange = (device, value) => {
        setImpactData({
            ...impactData,
            [device]: parseInt(value) || 0
        });
    };

    const calculateImpact = () => {
        let totalEnergy = 0;
        let totalWater = 0;
        let totalCO2 = 0;
        let totalGold = 0;
        let totalSilver = 0;
        let totalCopper = 0;
        let totalLead = 0;
        let totalGlass = 0;
        let totalPlastic = 0;
        let totalSteel = 0;

        // Calculate impact for each device type
        Object.keys(impactData).forEach(device => {
            const count = impactData[device];
            const impact = impactCalculations[device];

            if (impact) {
                totalEnergy += (impact.energy || 0) * count;
                totalWater += (impact.water || 0) * count;
                totalCO2 += (impact.co2 || 0) * count;
                totalGold += (impact.gold || 0) * count;
                totalSilver += (impact.silver || 0) * count;
                totalCopper += (impact.copper || 0) * count;
                totalLead += (impact.lead || 0) * count;
                totalGlass += (impact.glass || 0) * count;
                totalPlastic += (impact.plastic || 0) * count;
                totalSteel += (impact.steel || 0) * count;
            }
        });

        setImpactResult({
            energy: totalEnergy,
            water: totalWater,
            co2: totalCO2,
            gold: totalGold,
            silver: totalSilver,
            copper: totalCopper,
            lead: totalLead,
            glass: totalGlass,
            plastic: totalPlastic,
            steel: totalSteel
        });
    };

    return (
        <>
            <Navbar />

            {/* Tutorial Overlay */}
            {showTutorial && (
                <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
                    <div className="bg-white p-6 rounded-lg max-w-md max-h-[80vh] overflow-y-auto">
                        <h3 className="text-xl font-bold mb-4">How to Use E-Dumper Locator</h3>
                        <ol className="list-decimal pl-5 space-y-2 mb-4">
                            <li><strong>Enable location services</strong> for accurate results when prompted</li>
                            <li>Click <strong>"Find Nearest"</strong> to locate E-Dumpers near you</li>
                            <li>Use <strong>filters</strong> to find E-Dumpers by status or capacity</li>
                            <li><strong>Hover over markers</strong> to see detailed information</li>
                            <li>Click <strong>"Get Directions"</strong> for navigation assistance</li>
                            <li>Use <strong>"Schedule Pickup"</strong> if you can't visit an E-Dumper</li>
                        </ol>
                        <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                            <h4 className="font-semibold mb-2">What can you recycle?</h4>
                            <ul className="list-disc pl-5">
                                <li>Smartphones, tablets, and laptops</li>
                                <li>Computer monitors and TVs</li>
                                <li>Batteries and charging cables</li>
                                <li>Printers and scanners</li>
                                <li>Small household appliances</li>
                            </ul>
                        </div>
                        <button
                            className="w-full bg-green-600 text-white px-4 py-2 rounded font-semibold"
                            onClick={() => setShowTutorial(false)}
                        >
                            Got It!
                        </button>
                    </div>
                </div>
            )}

            {/* Schedule Modal */}
            {showScheduleModal && (
                <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full">
                        <h3 className="text-xl font-bold mb-4">Schedule a Pickup</h3>
                        <form onSubmit={handleScheduleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="w-full p-2 border border-gray-300 rounded"
                                        value={scheduleForm.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                    <textarea
                                        name="address"
                                        rows="2"
                                        className="w-full p-2 border border-gray-300 rounded"
                                        value={scheduleForm.address}
                                        onChange={handleInputChange}
                                        required
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        className="w-full p-2 border border-gray-300 rounded"
                                        value={scheduleForm.phone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                                        <input
                                            type="date"
                                            name="date"
                                            className="w-full p-2 border border-gray-300 rounded"
                                            value={scheduleForm.date}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                                        <input
                                            type="time"
                                            name="time"
                                            className="w-full p-2 border border-gray-300 rounded"
                                            value={scheduleForm.time}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Items to Recycle</label>
                                    <textarea
                                        name="items"
                                        rows="2"
                                        className="w-full p-2 border border-gray-300 rounded"
                                        value={scheduleForm.items}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 2 laptops, 5 phones, 1 monitor"
                                        required
                                    ></textarea>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 mt-6">
                                <button
                                    type="submit"
                                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded font-semibold"
                                >
                                    Schedule Pickup
                                </button>
                                <button
                                    type="button"
                                    className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded"
                                    onClick={() => setShowScheduleModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <section className="bg-white text-black py-8">
                <div className="mx-auto max-w-screen-xl px-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                                Find your nearest E-Dumpers
                            </h1>
                            <p className="text-green-600 mt-2">
                                {userLocationName || "Make sure your location is on."}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                            <button
                                className="flex items-center gap-2 rounded border border-indigo-600 bg-indigo-600 px-3 sm:px-4 py-2 text-white hover:bg-indigo-700 transition-colors text-sm sm:text-base"
                                onClick={getNearestEdumpers}
                            >
                                <span className="text-sm font-medium">Find Nearest</span>
                                <svg className="h-4 w-4 sm:h-5 sm:w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>

                            <button
                                className="flex items-center gap-2 rounded border border-gray-300 bg-white px-3 sm:px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors text-sm sm:text-base"
                                onClick={() => setShowTutorial(true)}
                            >
                                <span className="text-sm font-medium">Help</span>
                                <svg className="h-4 w-4 sm:h-5 sm:w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 01118 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {locationError && (
                        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                                </svg>
                                <span>{locationError}</span>
                            </div>
                            <button
                                className="mt-2 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                                onClick={requestLocationAccess}
                            >
                                Enable Location Services
                            </button>
                        </div>
                    )}

                    {/* Stats Overview */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
                        <div className="bg-green-50 p-3 sm:p-4 rounded-lg border border-green-200">
                            <h3 className="text-sm sm:text-lg font-semibold text-green-800">Total E-Dumpers</h3>
                            <p className="text-2xl sm:text-3xl font-bold text-green-600">{stats.total}</p>
                        </div>
                        <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
                            <h3 className="text-sm sm:text-lg font-semibold text-blue-800">Available</h3>
                            <p className="text-2xl sm:text-3xl font-bold text-blue-600">{stats.available}</p>
                        </div>
                        <div className="bg-red-50 p-3 sm:p-4 rounded-lg border border-red-200">
                            <h3 className="text-sm sm:text-lg font-semibold text-red-800">Full</h3>
                            <p className="text-2xl sm:text-3xl font-bold text-red-600">{stats.full}</p>
                        </div>
                        <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
                            <h3 className="text-sm sm:text-lg font-semibold text-gray-800">Closed</h3>
                            <p className="text-2xl sm:text-3xl font-bold text-gray-600">{stats.closed}</p>
                        </div>
                    </div>

                    {/* Filters Panel - Always Visible */}
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded"
                                    value={filters.status}
                                    onChange={(e) => handleFilterChange("status", e.target.value)}
                                >
                                    <option value="All">All Statuses</option>
                                    <option value="Available">Available</option>
                                    <option value="Full">Full</option>
                                    <option value="Closed">Closed</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded"
                                    value={filters.capacity}
                                    onChange={(e) => handleFilterChange("capacity", e.target.value)}
                                >
                                    <option value="All">All Capacities</option>
                                    <option value="High">High (70%+)</option>
                                    <option value="Medium">Medium (30-70%)</option>
                                    <option value="Low">Low (&lt;30%)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                                <input
                                    type="text"
                                    placeholder="Search by name, address, materials..."
                                    className="w-full p-2 border border-gray-300 rounded"
                                    value={filters.search}
                                    onChange={(e) => handleFilterChange("search", e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 mt-4">
                            <button
                                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
                                onClick={resetFilters}
                            >
                                Reset Filters
                            </button>
                            <button
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                                onClick={() => setShowScheduleModal(true)}
                            >
                                Schedule Pickup
                            </button>
                        </div>
                    </div>

                    {/* Map and List View */}
                    <div className="flex flex-col lg:flex-row gap-6 mb-12">
                        {/* Map Container */}
                        <div className="w-full lg:w-2/3" style={{ height: "50vh", minHeight: "400px" }}>
                            <GoogleMapReact
                                bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_API_KEY }}
                                defaultCenter={defaultProps.center}
                                defaultZoom={defaultProps.zoom}
                                yesIWantToUseGoogleMapApiInternals
                                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                            >
                                {filteredEdumpers.map((edumper) => (
                                    <AnyReactComponent
                                        key={edumper.id}
                                        lat={edumper.latitude}
                                        lng={edumper.longitude}
                                        text={edumper.name}
                                        status={edumper.status}
                                        capacity={edumper.capacity}
                                        hours={edumper.hours}
                                        phone={edumper.phone}
                                        address={edumper.address}
                                        materials={edumper.materials}
                                    />
                                ))}
                            </GoogleMapReact>

                            {routeInfo && selectedEdumper && (
                                <div className="bg-white p-4 mt-4 rounded-lg shadow-md">
                                    <h3 className="font-semibold mb-2">Route to {selectedEdumper.name}</h3>
                                    <p>Distance: {routeInfo.distance} | Time: {routeInfo.duration}</p>
                                    <button
                                        className="text-red-600 text-sm mt-2 hover:text-red-800 transition-colors"
                                        onClick={clearDirections}
                                    >
                                        Clear Route
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* List View */}
                        <div className="w-full lg:w-1/3 bg-gray-50 p-4 rounded-lg" style={{ maxHeight: "60vh", overflowY: "auto" }}>
                            <h3 className="font-bold text-lg mb-4">E-Dumpers ({filteredEdumpers.length})</h3>

                            {filteredEdumpers.length === 0 ? (
                                <p className="text-gray-500">No E-Dumpers match your filters.</p>
                            ) : (
                                <div className="space-y-4">
                                    {filteredEdumpers.map(edumper => (
                                        <div key={edumper.id} className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                                            <h4 className="font-semibold">{edumper.name}</h4>
                                            <p className="text-sm text-gray-600">{edumper.address}</p>

                                            <div className="flex items-center mt-2">
                                                <span className={`inline-block w-3 h-3 rounded-full mr-2 ${edumper.status === "Available" ? "bg-green-500" :
                                                        edumper.status === "Full" ? "bg-red-500" : "bg-gray-500"
                                                    }`}></span>
                                                <span className="text-sm">
                                                    {edumper.status} • {edumper.capacity}
                                                </span>
                                            </div>

                                            <div className="mt-3 flex flex-wrap gap-2">
                                                <button
                                                    className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                                                    onClick={() => getDirections(edumper)}
                                                >
                                                    Get Directions
                                                </button>
                                                <button
                                                    className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 transition-colors"
                                                    onClick={() => shareLocation(edumper)}
                                                >
                                                    Share
                                                </button>
                                            </div>

                                            <div className="mt-2">
                                                <p className="text-xs text-gray-500">
                                                    Accepts: {edumper.materials.join(", ")}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Hours: {edumper.hours} | Phone: {edumper.phone}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Additional Features Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
                        {/* Pickup Schedule */}
                        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                            <h2 className="text-xl sm:text-2xl font-bold mb-4">Scheduled Pickup Services</h2>
                            <p className="text-gray-600 mb-4">Can't reach an E-Dumper? We offer scheduled pickup services in these areas:</p>

                            <div className="space-y-4 mb-6">
                                {pickupSchedule.map(item => (
                                    <div key={item.id} className="border-l-4 border-green-500 pl-4 py-2">
                                        <h3 className="font-semibold">{item.area}</h3>
                                        <p className="text-sm text-gray-600">{item.days} | {item.time}</p>
                                    </div>
                                ))}
                            </div>

                            <button
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                                onClick={() => setShowScheduleModal(true)}
                            >
                                Schedule a Pickup
                            </button>
                        </div>

                        {/* E-Waste Facts Carousel */}
                        <div className="bg-green-50 p-4 sm:p-6 rounded-lg shadow-md">
                            <h2 className="text-xl sm:text-2xl font-bold mb-4">Did You Know?</h2>
                            <div className="bg-white p-4 rounded-lg h-32 flex items-center justify-center">
                                <p className="text-gray-800 italic text-center">"{ewasteFacts[currentFactIndex]}"</p>
                            </div>
                            <div className="flex justify-center mt-4">
                                {ewasteFacts.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`w-2 h-2 rounded-full mx-1 ${index === currentFactIndex ? 'bg-green-600' : 'bg-green-300'}`}
                                        onClick={() => setCurrentFactIndex(index)}
                                    ></button>
                                ))}
                            </div>
                            <p className="mt-4 text-sm text-gray-600">
                                Proper e-waste disposal helps protect our environment and conserve valuable resources.
                            </p>
                        </div>
                    </div>

                    {/* Recycling Impact Calculator */}
                    <div className="bg-green-50 p-4 sm:p-6 rounded-lg shadow-md mb-12">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4">Recycling Impact Calculator</h2>
                        <p className="text-gray-600 mb-4">See how much you can help the environment by recycling your e-waste:</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
                            <div className="bg-white p-3 sm:p-4 rounded-lg text-center">
                                <h3 className="font-semibold mb-2 text-sm sm:text-base">Smartphones</h3>
                                <input
                                    type="number"
                                    min="0"
                                    className="w-full p-2 border border-gray-300 rounded text-center"
                                    value={impactData.smartphones}
                                    onChange={(e) => handleImpactChange("smartphones", e.target.value)}
                                />
                                <p className="text-xs sm:text-sm text-gray-600 mt-2">Saves enough energy to power a laptop for 40 hours each</p>
                            </div>
                            <div className="bg-white p-3 sm:p-4 rounded-lg text-center">
                                <h3 className="font-semibold mb-2 text-sm sm:text-base">Laptops</h3>
                                <input
                                    type="number"
                                    min="0"
                                    className="w-full p-2 border border-gray-300 rounded text-center"
                                    value={impactData.laptops}
                                    onChange={(e) => handleImpactChange("laptops", e.target.value)}
                                />
                                <p className="text-xs sm:text-sm text-gray-600 mt-2">Saves enough energy to power a home for 2 days each</p>
                            </div>
                            <div className="bg-white p-3 sm:p-4 rounded-lg text-center">
                                <h3 className="font-semibold mb-2 text-sm sm:text-base">Monitors</h3>
                                <input
                                    type="number"
                                    min="0"
                                    className="w-full p-2 border border-gray-300 rounded text-center"
                                    value={impactData.monitors}
                                    onChange={(e) => handleImpactChange("monitors", e.target.value)}
                                />
                                <p className="text-xs sm:text-sm text-gray-600 mt-2">Prevents 4 kg of lead from entering the environment each</p>
                            </div>
                            <div className="bg-white p-3 sm:p-4 rounded-lg text-center">
                                <h3 className="font-semibold mb-2 text-sm sm:text-base">Tablets</h3>
                                <input
                                    type="number"
                                    min="0"
                                    className="w-full p-2 border border-gray-300 rounded text-center"
                                    value={impactData.tablets}
                                    onChange={(e) => handleImpactChange("tablets", e.target.value)}
                                />
                                <p className="text-xs sm:text-sm text-gray-600 mt-2">Saves 150 liters of water and prevents 8 kg of CO2 each</p>
                            </div>
                            <div className="bg-white p-3 sm:p-4 rounded-lg text-center">
                                <h3 className="font-semibold mb-2 text-sm sm:text-base">Printers</h3>
                                <input
                                    type="number"
                                    min="0"
                                    className="w-full p-2 border border-gray-300 rounded text-center"
                                    value={impactData.printers}
                                    onChange={(e) => handleImpactChange("printers", e.target.value)}
                                />
                                <p className="text-xs sm:text-sm text-gray-600 mt-2">Recycles 2.5 kg of plastic and 1.8 kg of steel each</p>
                            </div>
                        </div>

                        <button
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                            onClick={calculateImpact}
                        >
                            Calculate Impact
                        </button>

                        {impactResult && (
                            <div className="mt-6 bg-white p-4 rounded-lg">
                                <h3 className="font-semibold text-lg mb-3">Your Recycling Impact</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="font-medium mb-2">Environmental Impact</h4>
                                        <ul className="space-y-1">
                                            <li>Energy saved: <span className="font-semibold">{impactResult.energy} hours</span> of laptop usage</li>
                                            <li>Water conserved: <span className="font-semibold">{impactResult.water} liters</span></li>
                                            <li>CO2 emissions prevented: <span className="font-semibold">{impactResult.co2} kg</span></li>
                                            <li>Lead prevented: <span className="font-semibold">{impactResult.lead} kg</span> from environment</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-medium mb-2">Materials Recovered</h4>
                                        <ul className="space-y-1">
                                            <li>Gold recovered: <span className="font-semibold">{impactResult.gold.toFixed(3)} grams</span></li>
                                            <li>Silver recovered: <span className="font-semibold">{impactResult.silver.toFixed(3)} grams</span></li>
                                            <li>Copper recovered: <span className="font-semibold">{impactResult.copper} grams</span></li>
                                            <li>Glass recycled: <span className="font-semibold">{impactResult.glass} kg</span></li>
                                            <li>Plastic recycled: <span className="font-semibold">{impactResult.plastic} kg</span></li>
                                            <li>Steel recycled: <span className="font-semibold">{impactResult.steel} kg</span></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mt-4 p-3 bg-green-100 rounded-lg">
                                    <p className="text-green-800 font-medium">Thank you for your contribution to a cleaner environment!</p>
                                    <p className="text-green-700 text-sm mt-1">Your recycling efforts make a significant difference in conserving resources and reducing pollution.</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Educational Resources */}
                    <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-md">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4">E-Waste Educational Resources</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold mb-2">Why Recycle E-Waste?</h3>
                                <ul className="list-disc pl-5 text-gray-600">
                                    <li>Prevents toxic materials from entering landfills</li>
                                    <li>Conserves natural resources by recovering valuable materials</li>
                                    <li>Reduces energy consumption compared to mining new materials</li>
                                    <li>Creates jobs in the recycling industry</li>
                                    <li>Protects the environment and human health</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">How to Prepare Your E-Waste</h3>
                                <ul className="list-disc pl-5 text-gray-600">
                                    <li>Back up and wipe all personal data from devices</li>
                                    <li>Remove batteries from devices if possible</li>
                                    <li>Keep different types of e-waste separated</li>
                                    <li>Place small items in bags to prevent loss</li>
                                    <li>Label devices with any known issues</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="font-semibold mb-2">What Happens to Your E-Waste?</h3>
                            <div className="bg-white p-4 rounded-lg">
                                <p className="text-gray-600">
                                    Once collected, your e-waste goes through a careful process: sorting, dismantling,
                                    separation of materials, and proper recycling. Valuable materials like gold, silver,
                                    copper, and palladium are recovered and used to make new products.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Edumpers;