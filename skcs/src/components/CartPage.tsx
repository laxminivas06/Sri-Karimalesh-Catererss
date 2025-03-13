import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Cart: React.FC = () => {
  const [cart, setCart] = useState<{ name: string; price: number; img: string; quantity: number; pack: string; option: string; source: string }[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem("shoppingCart");
    console.log("Saved Cart:", savedCart); // Debug log
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        console.log("Parsed Cart:", parsedCart); // Debug log
        setCart(parsedCart);
      } catch (error) {
        console.error("Failed to parse shopping cart:", error);
        setCart([]); // Reset cart if parsing fails
      }
    }
  }, []);

  const removeFromCart = (index: number) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("shoppingCart", JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    const phoneNumber = "+61450056387";
    const orderDetails = cart.map(item => 
      `Name: ${item.name}, Price: $${item.price.toFixed(2)} AUD, Quantity: ${item.quantity}, Pack: ${item.pack}, Option: ${item.option}, Source: ${item.source}`
    ).join('\n');
    
    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const message = `I would like to proceed with my order. Here are the details:\n${orderDetails}\nTotal Amount: $${totalAmount.toFixed(2)} AUD`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    console.log("WhatsApp URL:", whatsappUrl); // Debug log
    window.open(whatsappUrl, "_blank");
  };

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-12 mt-8">
      <h2 className="text-3xl font-bold text-center text-orange-900 mb-16">Shopping Cart</h2>
      {cart.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {cart.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-between">
              <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
              <div className="flex-1 ml-4">
                <h3 className="text-xl font-semibold text-orange-900">{item.name}</h3>
                <p className="text-lg text-gray-700">Price: ${item.price.toFixed(2)} AUD</p>
                <p className="text-lg text-gray-700">Quantity: {item.quantity}</p>
                <p className="text-lg text-gray-700">Pack: {item.pack}</p>
                {item.option !== "N/A" && <p className="text-lg text-gray-700">Option: {item.option}</p>}
                <p className="text-lg font-bold text-gray-700">Total: ${(item.price * item.quantity).toFixed(2)} AUD</p>
              </div>
              <button
                onClick={() => removeFromCart(index)}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      )}

      {cart.length > 0 && (
        <div className="mt-4 text-lg font-bold text-right">
          Total Amount: ${totalAmount.toFixed(2)} AUD
        </div>
      )}

      <div className="mt-8 flex justify-between">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition"
        >
          Back to Meal Selection
        </button>
        <button
          onClick={handleCheckout}
          className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;