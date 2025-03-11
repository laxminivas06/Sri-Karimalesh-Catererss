import React, { useState } from "react";

const MealBox = () => {
  const [notification, setNotification] = useState(""); // State for notification message
  const [breakfastQuantities, setBreakfastQuantities] = useState({}); // Track quantities for breakfast items
  const [lunchQuantities, setLunchQuantities] = useState({}); // Track quantities for lunch items
  const [addedBreakfastItems, setAddedBreakfastItems] = useState({}); // Track added breakfast items
  const [addedLunchItems, setAddedLunchItems] = useState({}); // Track added lunch items
  const [lunchContainerSize, setLunchContainerSize] = useState({}); // Track selected container size for lunch items
  const [cart, setCart] = useState([]); // State for cart items
  const [totalAmount, setTotalAmount] = useState(0); // State for total amount

  const breakfastOptions = [
    { name: "Poha", img: "https://res.cloudinary.com/dt3effj06/image/upload/v1741683945/Poha_th9h0c.jpg", price: 5.99 },
    { name: "Idli", img: "https://res.cloudinary.com/dt3effj06/image/upload/v1741683945/Idli_w1uarq.jpg", price:  5.50 },
    { name: "Sabudana Khichdi", img: "https://res.cloudinary.com/dt3effj06/image/upload/v1741683945/Sabudhan_pyrly6.jpg", price:  5.99 },
    { name: "Godhuma rava Upma", img: "https://res.cloudinary.com/dt3effj06/image/upload/v1741683945/Godhuma_rava_nw8rl3.jpg", price:  5.99 },
    { name: "Pasta", img: "https://res.cloudinary.com/dt3effj06/image/upload/v1741683945/Pasta_kevysw.jpg", price:  6.99 },
    { name: "Tomato Bath", img: "https://res.cloudinary.com/dt3effj06/image/upload/v1741683945/Tomatao_unt7y3.jpg", price:  5.50 },
  ];

  const lunchOptions = [
    { name: "Mint Coriander Rice", img: "https://i0.wp.com/www.tomatoblues.com/wp-content/uploads/2012/02/DSC_0195.jpg?fit=1192%2C1800&ssl=1", price: { "500ml": 9.99, "750ml": 13.99 } },
    { name: "Lemon Rice", img: "https://res.cloudinary.com/dt3effj06/image/upload/v1741684265/Lemon_rice_sdzeca.jpg", price: { "500ml": 7.99, "750ml": 11.99 } },
    { name: "Pulihora (Tamarind Rice)", img: "https://res.cloudinary.com/dt3effj06/image/upload/v1741684265/Tamarind_rice_pipade.jpg", price: { "500ml": 6.99, "750ml": 10.99 } },
    { name: "Tomato Rice", img: "https://res.cloudinary.com/dt3effj06/image/upload/v1741684872/Tomato_Rice_wixx29.jpg", price: { "500ml": 7.99, "750ml": 11.99 } },
    { name: "Veg Pulao", img: "https://res.cloudinary.com/dt3effj06/image/upload/v1741684266/Veg_pulao_gr2bfl.jpg", price: { "500ml": 7.99, "750ml": 11.99 } },
    { name: "Veg Panner Pulao", img: "https://res.cloudinary.com/dt3effj06/image/upload/v1741684878/Veg_Panner_Pulao_a66ee2.jpg", price: { "500ml": 9.99, "750ml": 13.99 } },
    { name: "Mushroom Pulao", img: "https://res.cloudinary.com/dt3effj06/image/upload/v1741684265/Mushroom_rice_zxu7w0.jpg", price: { "500ml": 8.99, "750ml": 12.99 } },
    { name: "Curd Rice", img: "https://res.cloudinary.com/dt3effj06/image/upload/v1741684264/Curd_rice_ox8tfr.jpg", price: { "500ml": 7.99, "750ml": 11.99 } },
    { name: "Bisibelebath", img: "https://res.cloudinary.com/dt3effj06/image/upload/v1741698724/so9tvnlkudzgcjp06qbg.jpg", price: { "500ml": 9.99, "750ml": 13.99 } },
  ];

  const addToCart = (itemName, type) => {
    const item = type === "breakfast" ? breakfastOptions.find(option => option.name === itemName) : lunchOptions.find(option => option.name === itemName);
    const quantity = type === "breakfast" ? breakfastQuantities[itemName] : lunchQuantities[itemName];
    const containerSize = type === "lunch" ? lunchContainerSize[itemName] : null;

    if (item && quantity > 0) {
      const price = containerSize ? item.price[containerSize] : item.price;
      const cartItem = {
        name: item.name,
        price: price,
        img: item.img,
        quantity: quantity,
        pack: type === "breakfast" ? "Single Plate" : `${containerSize} Container`,
        option: "N/A",
        source: type
      };
      
      // Update cart and total amount
      setCart(prevCart => {
        const updatedCart = [...prevCart, cartItem];
        localStorage.setItem("shoppingCart", JSON.stringify(updatedCart));
        return updatedCart;
      });

      // Update total amount
      setTotalAmount(prevTotal => prevTotal + (price * quantity));

      if (type === "breakfast") {
        setAddedBreakfastItems(prev => ({ ...prev, [itemName]: true }));
        setBreakfastQuantities(prev => ({ ...prev, [itemName]: 0 }));
        setNotification(`Added ${item.name} from Breakfast!`);
      } else {
        setAddedLunchItems(prev => ({ ...prev, [itemName]: true }));
        setLunchQuantities(prev => ({ ...prev, [itemName]: 0 }));
        setNotification(`Added ${item.name} from Lunch!`);
      }

      // Clear notification after 2 seconds
      setTimeout(() => setNotification(""), 2000);
    } else {
      console.error("Item not found or quantity is zero:", itemName);
    }
  };

  const handleQuantityChange = (itemName, type, change) => {
    if (type === "breakfast") {
      setBreakfastQuantities(prev => {
        const newQuantity = (prev[itemName] || 0) + change;
        return { ...prev, [itemName]: Math.max(newQuantity, 0) }; // Prevent negative quantity
      });
    } else {
      setLunchQuantities(prev => {
        const newQuantity = (prev[itemName] || 0) + change;
        return { ...prev, [itemName]: Math.max(newQuantity, 0) }; // Prevent negative quantity
      });
    }
  };

  return (
    <section id="mealbox" className="py-20 px-4 bg-orange-50">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-orange-900">Daily Box</h2>

        {/* Notification Message */}
        {notification && (
          <div className="fixed top-16 right-4 bg-green-500 text-white text-sm px-4 py-2 rounded shadow-lg animate-fade">
            {notification}
          </div>
        )}

        {/* Total Amount Display */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold">Total Amount: ${totalAmount.toFixed(2)} AUD</h3>
        </div>

        {/* Breakfast Section */}
        <div className="max-w-7xl mx-auto rounded-2xl shadow-xl overflow-hidden p-12 bg-yellow-100 mb-12">
          <h3 className="text-3xl font-semibold text-center mb-6">Breakfast Options</h3>
          <p className="mb-4 text-center">Available Breakfast Items:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {breakfastOptions.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
                <img src={item.img} alt={item.name} className="w-full h-48 object-cover mb-4 rounded-lg" />
                <h4 className="text-lg font-semibold">{item.name}</h4>
                <span className="text-lg font-bold">Price: ${item.price} AUD</span>
                {/* Quantity Adjustment for Breakfast */}
                <div className="flex justify-center items-center mt-4">
                  <button
                    onClick={() => handleQuantityChange(item.name, "breakfast", -1)}
                    className="bg-red-500 text-white px-4 py-2 rounded-l-md hover:bg-red-600 transition duration-200"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="0"
                    value={breakfastQuantities[item.name] || 0}
                    readOnly
                    className="border border-gray-300 rounded-md p-2 w-20 text-center mx-2"
                  />
                  <button
                    onClick={() => handleQuantityChange(item.name, "breakfast", 1)}
                    className="bg-green-500 text-white px-4 py-2 rounded-r-md hover:bg-green-600 transition duration-200"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => addToCart(item.name, "breakfast")}
                  className={`mt-2 px-4 py-2 rounded-md ${addedBreakfastItems[item.name] ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                >
                  {addedBreakfastItems[item.name] ? "Added" : "Add to Cart"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Lunch Section */}
        <div className="max-w-7xl mx-auto rounded-2xl shadow-xl overflow-hidden p-12 bg-green-100">
          <h3 className="text-3xl font-semibold text-center mb-6">Lunch Options</h3>
          <p className="mb-4 text-center">Available Lunch Items:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lunchOptions.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
                <img src={item.img} alt={item.name} className="w-full h-48 object-cover mb-4 rounded-lg" />
                <h4 className="text-lg font-semibold">{item.name}</h4>
                {/* Display price based on selected container size */}
                <span className="text-lg font-bold">
                  Price: {lunchContainerSize[item.name] ? `${lunchContainerSize[item.name]} - $${item.price[lunchContainerSize[item.name]]} AUD` : "Select Size"}
                </span>
                {/* Container Size Selection for Lunch */}
                <div className="mt-4">
                  <label className="mr-2">Select Container Size:</label>
                  <select
                    value={lunchContainerSize[item.name] || "500ml"}
                    onChange={(e) => setLunchContainerSize(prev => ({ ...prev, [item.name]: e.target.value }))}
                    className="border border-gray-300 rounded-md p-2"
                  >
                    <option value="500ml">500ml</option>
                    <option value="750ml">750ml</option>
                  </select>
                </div>
                {/* Quantity Adjustment for Lunch */}
                <div className="flex justify-center items-center mt-4">
                  <button
                    onClick={() => handleQuantityChange(item.name, "lunch", -1)}
                    className="bg-red-500 text-white px-4 py-2 rounded-l-md hover:bg-red-600 transition duration-200"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="0"
                    value={lunchQuantities[item.name] || 0}
                    readOnly
                    className="border border-gray-300 rounded-md p-2 w-20 text-center mx-2"
                  />
                  <button
                    onClick={() => handleQuantityChange(item.name, "lunch", 1)}
                    className="bg-green-500 text-white px-4 py-2 rounded-r-md hover:bg-green-600 transition duration-200"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => addToCart(item.name, "lunch")}
                  className={`mt-2 p-2 rounded ${addedLunchItems[item.name] ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                >
                  {addedLunchItems[item.name] ? "Added" : "Add to Cart"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Section */}
        <div className="max-w-7xl mx-auto rounded-2xl shadow-xl overflow-hidden p-12 bg-gray-100 mb-12">
          <h3 className="text-3xl font-semibold text-center mb-6">Cart Items</h3>
          {cart.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {cart.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                    <div>
                      <h4 className="text-lg font-semibold">{item.name}</h4>
                      <p className="text-gray-700">Price: ${item.price.toFixed(2)} AUD</p>
                      <p className="text-gray-700">Quantity: {item.quantity}</p>
                      <p className="text-gray-700">Pack: {item.pack}</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold">Total: ${(item.price * item.quantity).toFixed(2)} AUD</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">Your cart is empty.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default MealBox;