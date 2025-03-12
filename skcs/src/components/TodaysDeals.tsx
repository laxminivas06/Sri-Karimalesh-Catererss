import React, { useState } from "react";
import WhatsAppButton from "./WhatsAppButton";
import { motion } from "framer-motion"; // Import Framer Motion for animations

const deals = [
  {
    image: "https://res.cloudinary.com/dt3effj06/image/upload/v1741767746/Sri_Karimalesh_Catering_Comming_Soon_om4gri.png",
    title: "Special Lunch Offer",
    description: "Get 20% off on our special lunch package!",
    price: "$15",
    originalPrice: "$18",
    discount: "20%",
    items: ["Rice", "Dal", "Vegetable Curry", "Salad"],
  },
  {
    image: "https://res.cloudinary.com/dt3effj06/image/upload/v1741766159/SK_Daily_Box_hpsxzz.png",
    title: "Lunch",
    description: "Enjoy a healthy breakfast combo at a discounted price.",
    price: "",
    originalPrice: "",
    discount: "",
    items: ["Idli", "Sambar", "Chutney", "Coffee"],
  },
  {
    image: "https://res.cloudinary.com/dt3effj06/image/upload/v1741766213/1_xopbvs.png",
    title: "Breakfast",
    description: "Buy one get one free on selected snacks.",
    price: "",
    originalPrice: "",
    discount: "",
    items: ["Samosa", "Pakora"],
  },
  
];

const TodaysDeals = () => {
  const [expandedDealIndex, setExpandedDealIndex] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // State for the selected image

  const toggleDetails = (index) => {
    setExpandedDealIndex(expandedDealIndex === index ? null : index);
  };

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="container mx-auto p-4 mt-20">
      <h1 className="text-3xl font-bold mb-4 text-center">Today's Deals</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {deals.map((deal, index) => (
          <motion.div
            key={index}
            className="border p-4 rounded shadow"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={deal.image}
              alt={deal.title}
              className="w-full h-48 object-cover rounded mb-4 cursor-pointer"
              onClick={() => openImageModal(deal.image)} // Open modal on image click
            />
            <h3 className="text-xl font-bold mb-2">{deal.title}</h3>
            <p className="mb-2">{deal.description}</p>
            <p className="text-lg font-semibold mb-4">{deal.price}</p>
            <motion.button
              onClick={() => toggleDetails(index)}
              className="bg-blue-600 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {expandedDealIndex === index ? "Hide Details" : "View Details"}
            </motion.button>
            {expandedDealIndex === index && (
              <div className="border-t mt-4 pt-4">
                <h4 className="font-semibold">Offer Details:</h4>
                <p>Original Price: <span className="line-through">{deal.originalPrice}</span></p>
                <p>Discount: {deal.discount}</p>
                <p>Items Included: {deal.items.join(", ")}</p>
              </div>
            )}
            <WhatsAppButton text={`Order ${deal.title}`} />
          </motion.div>
        ))}
      </div>

      {/* Modal for viewing full image */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative max-w-3xl max-h-full overflow-auto">
            <img src={selectedImage} alt="Full view" className="max-w-full max-h-screen" />
            <button
              onClick={closeImageModal}
 className="absolute top-2 right-2 bg-white text-black rounded-full p-2"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodaysDeals;