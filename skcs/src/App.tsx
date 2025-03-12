import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CategoryPage from "./components/ CategoryPage";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import MealBox from "./components/MealBox";
import TripPackages from "./components/TripPackages";
import MenuSection from "./components/MenuSection";
import CartPage from "./components/CartPage";
import WhatsAppButton from "./components/WhatsAppButton";
import Footer from "./components/Footer";
import About from "./components/About";
import Subscription from "./components/Subscription";
import TodaysDeals from "./components/TodaysDeals"; // ✅ Import the TodaysDeals component

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-amber-50">
        {/* 📌 Navbar */}
        <Navbar />

        {/* 🏠 Main Content */}
        <main className="flex-grow">
          <Routes>
            {/* 🏠 Home Page */}
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Services />
                  <Testimonials />
                  <WhatsAppButton floating />
                </>
              }
            />

            {/* 📌 Category Page (Dynamic) */}
            <Route path="/category/:categoryName" element={<CategoryPage />} />

            {/* 📦 Meal Box Page */}
            <Route path="/mealbox" element={<><MealBox /><Contact /></>} />

            {/* ✈️ Trip Packages Page */}
            <Route path="/trip-packages" element={<><TripPackages /><Contact /></>} />

            {/* 🍽️ Menu Page */}
            <Route path="/menu" element={<><MenuSection /><Contact /></>} />

            {/* 🛒 Cart Page */}
            <Route path="/cart" element={<><CartPage /><Contact /></>} />

            {/* 📞 Contact Page */}
            <Route path="/contact" element={<Contact />} />

            {/* ℹ️ About Page */}
            <Route path="/about" element={<><About /><Contact /></>} />

            {/* 📅 Subscription Page */}
            <Route path="/subscription" element={<Subscription />} />

            {/* 🎉 Today's Deals Page */}
            <Route path="/todays-deals" element={<TodaysDeals />} />
          </Routes>
        </main>

        {/* 📌 Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;