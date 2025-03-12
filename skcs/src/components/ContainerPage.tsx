import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const ContainerPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts
  }, []);

  return (
    <div className="relative bg-white py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our FoodCategories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Catering Services Container */}
          <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Catering Services</h3>
            <p className="text-sm text-gray-600 mb-4">We provide a variety of catering services for all occasions.</p>
            <Link
              to="/menu"
              aria-label="View Catering Services"
              className="bg-orange-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-orange-700 transition duration-300"
            >
              View Services
            </Link>
          </div>

          {/* Daily Box Container */}
          <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Daily Box</h3>
            <p className="text-sm text-gray-600 mb-4">Enjoy our daily meal boxes for breakfast and lunch.</p>
            <div className="space-y-2">
              <Link
                to="/meal-box?tab=lunch" // Add query parameter for Lunch
                aria-label="View Lunch Options"
                className="bg-green-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-700 transition duration-300"
              >
                Lunch
              </Link>
              <Link
                to="/meal-box?tab=breakfast" // Add query parameter for Breakfast
                aria-label="View Breakfast Options"
                className="bg-green-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-700 transition duration-300"
              >
                Breakfast
              </Link>
            </div>
          </div>

          {/* Today's Deals Container */}
          <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Today's Deals</h3>
            <p className="text-sm text-gray-600 mb-4">Check out our special deals available today!</p>
            <Link
              to="/todays-deals"
              aria-label="View Today's Deals"
              className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
            >
              View Deals
            </Link>
          </div>

          {/* Trip Packages Container */}
          <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Trip Packages</h3>
            <p className="text-sm text-gray-600 mb-4">Explore our exciting trip packages for a memorable experience.</p>
            <Link
              to="/trip-packages"
              aria-label="Explore Trip Packages"
              className="bg-purple-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-purple-700 transition duration-300"
            >
              Explore Packages
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContainerPage;