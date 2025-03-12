import React from "react";
import WhatsAppButton from "./WhatsAppButton";
import { motion } from "framer-motion"; // Import Framer Motion for animations
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faClock, faCalendarAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons'; // Import the icons you want to use

const Subscription = () => {
  const handleWhatsAppMessage = (packageType) => {
    switch (packageType) {
      case "Weekly":
        return "I'd like to subscribe to the Weekly Package for $50, which includes 1 Lunch, 1 Snack, and 1 Tiffin, 4 times a week.";
      case "Monthly":
        return "I'd like to subscribe to the Monthly Package for $180, which includes 1 Lunch, 1 Snack, and 1 Tiffin, 22 times a month.";
      case "6 Months":
        return "I'd like to subscribe to the 6 Months Package for $1000, which includes 1 Lunch, 1 Snack, and 1 Tiffin, 6 times a week.";
      case "Yearly":
        return "I'd like to subscribe to the Yearly Package for $1800, which includes 1 Lunch, 1 Snack, and 1 Tiffin, 52 times a year.";
      default:
        return "";
    }
  };

  return (
    <div className="container mx-auto p-4 mt-20 ">
      <h1 className="text-3xl font-bold mb-4 text-center">Subscription Packages</h1>
      <div className="grid grid-cols-1 p-4 mt-20 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
        {/* Weekly Package */}
        <motion.div
          className="border p-6 rounded shadow-lg bg-blue-100 hover:bg-blue-200 transition duration-300 h-96"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl font-bold mb-2">Weekly Package</h2>
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faUtensils} className="w-10 h-10 mr-2 text-blue-600" />
            <p className="text-gray-700">Perfect for those who want to enjoy fresh meals throughout the week.</p>
          </div>
          <ul className="list-none mb-4">
            <li className="flex items-center mb-2">
              <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 mr-2" />
              <span>1 Lunch</span>
            </li>
            <li className="flex items-center mb-2">
              <FontAwesomeIcon icon={faCheckCircle} className="text-orange-600 mr-2" />
              <span>1 Snack</span>
            </li>
            <li className="flex items-center mb-2">
              <FontAwesomeIcon icon={faCheckCircle} className="text-purple-600 mr-2" />
              <span>1 Tiffin</span>
            </li>
          </ul>
          <p>Includes: 4 times a week</p>
          <p className="font-semibold">Price: $50</p>
          <div className="mt-4"> {/* Adjust the margin as needed */}
  <WhatsAppButton 
    text="Checkout Weekly Package" 
    message={handleWhatsAppMessage("Weekly")} 
  />
</div>
        </motion.div>

        {/* Monthly Package */}
        <motion.div
          className="border p-6 rounded shadow-lg bg-green-100 hover:bg-green-200 transition duration-300 h-96"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl font-bold mb-2">Monthly Package</h2>
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faCalendarAlt} className="w-10 h-10 mr-2 text-green-600" />
            <p className="text-gray-700">Ideal for those who want a consistent meal plan every month.</p>
          </div>
          <ul className="list-none mb-4">
            <li className="flex items-center mb-2">
              <FontAwesomeIcon icon={faCheckCircle} className="text-blue-600 mr-2" />
              <span>1 Lunch</span>
            </li>
            <li className="flex items-center mb-2">
              <FontAwesomeIcon icon={faCheckCircle} className="text-red-600 mr-2" />
              <span>1 Snack</span>
            </li>
            <li className="flex items-center mb-2">
              <FontAwesomeIcon icon={faCheckCircle} className="text-yellow-600 mr-2" />
              <span>1 Tiffin</span>
            </li>
          </ul>
          <p>Includes: 22 times a month</p>
          <p className="font-semibold">Price: $180</p>
          <div className="mt-4"> {/* Adjust the margin as needed */}
  <WhatsAppButton 
    text="Checkout Monthly Package" 
    message={handleWhatsAppMessage("Monthly")} 
  />
</div>
        </motion.div>

        {/* 6 Months Package */}
        <motion.div
          className="border p-6 rounded shadow-lg bg-yellow-100 hover:bg-yellow-200 transition duration-300 h-96"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl font-bold mb-2">6 Months Package</h2>
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faClock} className="w-10 h-10 mr-2 text-yellow-600" />
            <p className="text-gray-700">Great for long-term meal planning and savings.</p>
          </div>
          <ul className="list-none mb-4">
            <li className="flex items-center mb-2">
              <FontAwesomeIcon icon={faCheckCircle} className="text-purple-600 mr-2" />
              <span>1 Lunch</span>
            </li>
            <li className="flex items-center mb-2">
              <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 mr-2" />
              <span>1 Snack</span>
            </li>
            <li className="flex items-center mb-2">
              <FontAwesomeIcon icon={faCheckCircle} className="text-orange-600 mr-2" />
              <span>1 Tiffin</span>
            </li>
          </ul>
          <p>Includes: 6 times a week</p>
          <p className="font-semibold">Price: $1000</p>
          <div className="mt-4"> {/* Adjust the margin as needed */}
  <WhatsAppButton 
    text="Checkout6 Months Package" 
    message={handleWhatsAppMessage("6 Months")} 
  />
</div>
        </motion.div>

        {/* Yearly Package */}
        <motion.div
          className="border p-6 rounded shadow-lg bg-red-100 hover:bg-red-200 transition duration-300 h-96"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl font-bold mb-2">Yearly Package</h2>
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faCalendarAlt} className="w-10 h-10 mr-2 text-red-600" />
            <p className="text-gray-700">The best value for those committed to healthy eating all year round.</p>
          </div>
          <ul className="list-none mb-4">
            <li className="flex items-center mb-2">
              <FontAwesomeIcon icon={faCheckCircle} className="text-blue-600 mr-2" />
              <span>1 Lunch</span>
            </li>
            <li className="flex items-center mb-2">
              <FontAwesomeIcon icon={faCheckCircle} className="text-orange-600 mr-2" />
              <span>1 Snack</span>
            </li>
            <li className="flex items-center mb-2">
              <FontAwesomeIcon icon={faCheckCircle} className="text-purple-600 mr-2" />
              <span>1 Tiffin</span>
            </li>
          </ul>
          <p>Includes: 52 times a year</p>
          <p className="font-semibold">Price: $1800</p>
          <div className="mt-4"> {/* Adjust the margin as needed */}
  <WhatsAppButton 
    text="Checkout Yearly Package" 
    message={handleWhatsAppMessage("Yearly")} 
  />
</div>
        </motion.div>
      </div>
    </div>
  );
};

export default Subscription;