import React, { useState } from "react";
import WhatsAppButton from "./WhatsAppButton";
import { motion } from "framer-motion"; // Import Framer Motion for animations

const deals = [
  {
    image: "https://res.cloudinary.com/dt3effj06/image/upload/v1741767746/Sri_Karimalesh_Catering_Comming_Soon_om4gri.png",
    title: "Ugadhi Special Offer",
    description: "Get  Special Discount on our  Catering package!",
  },
  {
    image: "https://res.cloudinary.com/dt3effj06/image/upload/v1741797005/sk_catering_available_fzkhio.png",
    title: "Catering Services Available",
    description: "Delicious Catering, Memorable Moments! 🍽️🎉",
  },
  {
    video: "https://res.cloudinary.com/dt3effj06/video/upload/v1741797387/SK_13_march_2025_New_a5ivkf.mp4",
    title: "13 March 2025",
    description: "Get  Mint Coriander rice with compliment of Delicious Semiya Payasam at Just $9.99 AUD!",
  },
  {
    image: "https://res.cloudinary.com/dt3effj06/image/upload/v1741766213/1_xopbvs.png",
    title: "Breakfast (Meal Box)",
    description: " A wholesome morning meal packed with traditional flavors to start your day right. 🍽️🌅",
  },
  {
    image: "https://res.cloudinary.com/dt3effj06/image/upload/v1741766159/SK_Daily_Box_hpsxzz.png",
    title: "Lunch (Meal Box)",
    description: "A satisfying and balanced meal with a variety of delicious dishes for a perfect midday feast. 🍛🌞",
  },
];

const TodaysDeals = () => {
  const [selectedMedia, setSelectedMedia] = useState(null); // State for the selected media (image or video)

  const openMediaModal = (media) => {
    setSelectedMedia(media);
  };

  const closeMediaModal = () => {
    setSelectedMedia(null);
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
            {deal.video ? (
              <video
                controls
                className="w-full h-48 object-cover rounded mb-4 cursor-pointer"
                onClick={() => openMediaModal(deal.video)} // Open modal on video click
              >
                <source src={deal.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={deal.image}
                alt={deal.title}
                className="w-full h-48 object-cover rounded mb-4 cursor-pointer"
                onClick={() => openMediaModal(deal.image)} // Open modal on image click
              />
            )}
            <h3 className="text-xl font-bold mb-2">{deal.title}</h3>
            <p className="mb-2">{deal.description}</p>
            <WhatsAppButton text={`Order ${deal.title}`} />
          </motion.div>
        ))}
      </div>

      {/* Modal for viewing full media (image or video) */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative max-w-3xl max-h-full overflow-auto">
            {selectedMedia.endsWith('.mp4') ? (
              <video controls className="max-w-full max-h-screen">
                <source src={selectedMedia} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img src={selectedMedia} alt="Full view" className="max-w-full max-h-screen" />
            )}
            <button
              onClick={closeMediaModal}
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