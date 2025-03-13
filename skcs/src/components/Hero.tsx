import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // ✅ Import useNavigate
import WhatsAppButton from "./WhatsAppButton"; // ✅ Import WhatsAppButton
import { FaArrowDown } from "react-icons/fa"; // Import an icon for the button

const quotes = [
  {
    telugu: "అన్నం పరబ్రహ్మ స్వరూపం",
    hindi: "अन्न ही परमब्रह्म का स्वरूप है",
    english: "Food is the embodiment of the divine",
  },
  {
    telugu: "స్వచ్ఛమైన ఆహారం - ఆరోగ్యకరమైన జీవితం!",
    hindi: "शुद्ध भोजन - स्वस्थ जीवन!",
    english: "Pure food leads to a healthy life!",
  },
  {
    telugu: "ఆత్మీయతతో వడ్డించే విందు",
    hindi: "प्रेम से परोसा गया भोजन",
    english: "A feast served with love",
  },
];

const backgroundImages = [
  "https://www.shutterstock.com/image-photo/andhra-special-vegetarian-tasty-meals-600nw-1811725393.jpg",
  "https://b.zmtcdn.com/data/pictures/1/20149871/c51138261fc0d0627f03a5cd27e3ac25.jpg?fit=around%7C960:500&crop=960:500;*,*",
  "https://cdn0.weddingwire.in/article/4333/3_2/960/jpg/123334-maharaja-bhog-2.jpeg",
  "https://savithrammas.com/site/image/cache/catalog/A-Guide-to-Savithrammas-Exotic-Pickles-and-Spices-1080x540.jpg",
  "https://www.shutterstock.com/image-photo/andhra-pradesh-traditional-thali-india-600nw-2172140155.jpg",
];

const Hero = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [currentBackground, setCurrentBackground] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null); // Create a ref for the container

  useEffect(() => {
    const quoteTimer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);

    const backgroundTimer = setInterval(() => {
      setCurrentBackground((prev) => (prev + 1) % backgroundImages.length);
    }, 7000); // Change background every 7 seconds

    return () => {
      clearInterval(quoteTimer);
      clearInterval(backgroundTimer);
    };
  }, []);

  const handleViewMoreClick = () => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the container
    }
  };

  return (
    <div className="relative h-screen flex flex-col items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${backgroundImages[currentBackground]})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div> {/* Adjust opacity for transparency */}
      </div>

      {/* Text Content */}
      <div className="relative z-10 text-center text-white px-6 flex flex-col items-center justify-center h-full">
        {/* Logo */}
        <img
          src="https://res.cloudinary.com/dt3effj06/image/upload/v1741682845/hv_vcp39h.svg"
          alt="Sri Karimalesh Caterings Logo"
          className="w-400 h-400 mx-auto mb-6" // Adjust size as needed
        />

        {/* Quotes */}
        <div className="space-y-4"> {/* Increased gap between quotes */}
          <p className="text-2xl md:text-3xl font-semibold text-orange-300 font-serif shadow-lg">
            {quotes[currentQuote].telugu}
          </p>
          <p className="text-lg md:text-2xl italic text-yellow-300 font-sans shadow-lg">
            {quotes[currentQuote].english}
          </p>
          <p className="text-2xl md:text-4xl text-orange-300 font-serif shadow-lg">
            {quotes[currentQuote].hindi}
          </p>
        </div>

        {/* View More Button */}
        <div className="mt-10"> {/* Increased margin top */}
          <button
            onClick={handleViewMoreClick}
            className="flex items-center bg-white text-orange-600 px-8 py-4 rounded-full font-semibold hover:bg-orange-200 transition duration-300 mb-6 transform hover:scale-105" // Increased size and added hover effect
          >
            <span>View More</span>
            <FaArrowDown className="ml-2" /> {/* Add an icon to the button */}
          </button>
        </div>
      </div>

      {/* Container Page Section */}
      <div ref={containerRef} className="bg-white py-10">
      </div>
      

      {/* Flash News Ticker */}
      <div className="absolute bottom-0 left-0 right-0 bg-orange-900 text-white py-3 mt-overflow-hidden">
        <div className="whitespace-nowrap animate-slide">
          <p className="text-lg font-medium">
            For your catering services, please inform us at least 3 days in advance!     Today's Deal! 🌿 Mint Coriander Rice with complimentary Semiya Payasam for just $9.99 AUD! 🍛✨ Order now and enjoy the meal! 😋🚀
          </p>
         
        </div>
      </div>
    </div>
  );
};

export default Hero;