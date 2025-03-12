import React, { useState, useEffect } from "react";

interface CartItem {
  name: string;
  price: number | { "500ml": number; "750ml": number };
  img: string;
  quantity: number;
  pack: string;
  option: string;
  source: "breakfast" | "lunch";
}


const MealBox: React.FC = () => {
  const [notification, setNotification] = useState<string>("");
  const [breakfastQuantities, setBreakfastQuantities] = useState<{ [key: string]: number }>({});
  const [lunchQuantities, setLunchQuantities] = useState<{ [key: string]: number }>({});
  const [cart, setCart] = useState<CartItem[]>([]);
  const [addedBreakfastItems, setAddedBreakfastItems] = useState<{ [key: string]: boolean }>({});
  const [addedLunchItems, setAddedLunchItems] = useState<{ [key: string]: boolean }>({});
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [lunchContainerSize, setLunchContainerSize] = useState<{ [key: string]: "500ml" | "750ml" }>({});
  const [selectedMealType, setSelectedMealType] = useState<"breakfast" | "lunch" | null>(null); // State to track selected meal type

  const breakfastOptions = [
    { name: "Poha", img: "https://res.cloudinary.com/dt3effj06/image/upload/v1741683945/Poha_th9h0c.jpg", price: 5.99 },
    { name: "Idli", img: "https://res.cloudinary.com/dt3effj06/image/upload/v1741683945/Idli_w1uarq.jpg", price: 5.50 },
    { name: "Sabudana Khichdi", img: "https://res.cloudinary.com/dt3effj06/image/upload/v1741683945/Sabudhan_pyrly6.jpg", price: 5.99 },
    { name: "Godhuma rava Upma", img: "https://res.cloudinary.com/dt3effj06/image/upload/v1741683945/Godhuma_rava_nw8rl3.jpg", price: 5.99 },
    { name: "Pasta", img: "https://res.cloudinary.com/dt3effj06/image/upload/v1741683945/Pasta_kevysw.jpg", price: 6.99 },
    { name: "Tomato Bath", img: "https://res.cloudinary.com/dt3effj06/image/upload/v1741683945/Tomatao_unt7y3.jpg", price: 5.50 },
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

  useEffect(() => {
    const savedCart = localStorage.getItem("shoppingCart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart) as CartItem[];
        setCart(parsedCart);
        const total = parsedCart.reduce((acc, item) => acc + (typeof item.price === 'number' ? item.price : item.price[lunchContainerSize[item.name] || "500ml"]) * item.quantity, 0);
        setTotalAmount(total);
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
      }
    }
  }, []);

  const addToCart = (itemName: string, type: "breakfast" | "lunch") => {
    const item = type === "breakfast" ? breakfastOptions.find(option => option.name === itemName) : lunchOptions.find(option => option.name === itemName);
    const quantity = type === "breakfast" ? breakfastQuantities[itemName] : lunchQuantities[itemName];
    const containerSize = type === "lunch" ? lunchContainerSize[itemName] : null;

    if (item && quantity > 0) {
      const price = containerSize ? (item.price as { [key: string]: number })[containerSize] : item.price as number;
      const existingItemIndex = cart.findIndex(cartItem => cartItem.name === item.name && cartItem.pack === (type === "breakfast" ? "Single Plate" : `${containerSize} Container`));

      if (existingItemIndex > -1) {
        const updatedCart = [...cart];
        updatedCart[existingItemIndex].quantity += quantity;
        setCart(updatedCart);
        localStorage.setItem("shoppingCart", JSON.stringify(updatedCart));
      } else {
        const cartItem: CartItem = {
          name: item.name,
          price: price,
          img: item.img,
          quantity: quantity,
          pack: type === "breakfast" ? "Single Plate" : `${containerSize} Container`,
          option: "N/A",
          source: type
        };
        const updatedCart = [...cart, cartItem];
        setCart(updatedCart);
        localStorage.setItem("shoppingCart", JSON.stringify(updatedCart));
      }

      setTotalAmount(prevTotal => prevTotal + price * quantity);

      if (type === "breakfast") {
        setAddedBreakfastItems(prev => ({ ...prev, [itemName]: true }));
        setBreakfastQuantities(prev => ({ ...prev, [itemName]: 0 }));
        setNotification(`Added ${item.name} from Breakfast!`);
      } else {
        setAddedLunchItems(prev => ({ ...prev, [itemName]: true }));
        setLunchQuantities(prev => ({ ...prev, [itemName]: 0 }));
        setNotification(`Added ${item.name} from Lunch!`);
      }

      setTimeout(() => setNotification(""), 2000);
    } else {
      console.error("Item not found or quantity is zero:", itemName);
    }
  };

  const handleQuantityChange = (itemName: string, type: "breakfast" | "lunch", change: number) => {
    if (type === "breakfast") {
      setBreakfastQuantities(prev => {
        const newQuantity = (prev[itemName] || 0) + change;
        return { ...prev, [itemName]: Math.max(newQuantity, 0) };
      });
    } else {
      setLunchQuantities(prev => {
        const newQuantity = (prev[itemName] || 0) + change;
        return { ...prev, [itemName]: Math.max(newQuantity, 0) };
      });
    }
  };

  const toggleMealType = (type: "breakfast" | "lunch") => {
    setSelectedMealType(prev => (prev === type ? null : type)); // Toggle the selected meal type
  };

  return (
    <section id="mealbox" className="py-20 px-4 bg-orange-50">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-orange-900">Daily Box</h2>

        {notification && (
          <div className="fixed top-16 right-4 bg-green-500 text-white text-sm px-4 py-2 rounded shadow-lg animate-fade">
            {notification}
          </div>
        )}

        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold">Total Amount: ${totalAmount.toFixed(2)} AUD</h3>
        </div>

        {/* Meal Type Toggle Buttons */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => toggleMealType("breakfast")}
            className={`px-4 py-2 rounded-md ${selectedMealType === "breakfast" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Breakfast
          </button>
          <button
            onClick={() => toggleMealType("lunch")}
            className={`ml-4 px-4 py-2 rounded-md ${selectedMealType === "lunch" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Lunch
          </button>
        </div>

        {/* Message to View Options */}
        {!selectedMealType && (
          <p className="text-center text-sm text-gray-600 mb-4">
            Please select a meal type to view options.
          </p>
        )}

        {/* Breakfast Section */}
        {selectedMealType === "breakfast" && (
          <div className="max-w-7xl mx-auto rounded-2xl shadow-xl overflow-hidden p-12 bg-yellow-100 mb-12">
            <h3 className="text-3xl font-semibold text-center mb-6">Breakfast Options</h3>
            <p className ="mb-4 text-center">Available Breakfast Items:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {breakfastOptions.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p- 4 flex flex-col items-center">
                  <img src={item.img} alt={item.name} className="w-full h-48 object-cover mb-4 rounded-lg" />
                  <h4 className="text-lg font-semibold">{item.name}</h4>
                  <span className="text-lg font-bold">Price: ${item.price} AUD</span>
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
        )}

        {/* Lunch Section */}
        {selectedMealType === "lunch" && (
          <div className="max-w-7xl mx-auto rounded-2xl shadow-xl overflow-hidden p-12 bg-yellow-100 mb-12">
            <h3 className="text-3xl font-semibold text-center mb-6">Lunch Options</h3>
            <p className="mb-4 text-center">Available Lunch Items:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lunchOptions.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
                  <img src={item.img} alt={item.name} className="w-full h-48 object-cover mb-4 rounded-lg" />
                  <h4 className="text-lg font-semibold">{item.name}</h4>
                  <span className="text-lg font-bold">Price: 500ml - ${item.price["500ml"]} AUD, 750ml - ${item.price["750ml"]} AUD</span>
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
                  <div className="mt-2">
                    <label className="mr-2">Container Size:</label>
                    <select
                      value={lunchContainerSize[item.name] || "500ml"}
                      onChange={(e) => setLunchContainerSize(prev => ({ ...prev, [item.name]: e.target.value as "500ml" | "750ml" }))}
                      className="border border-gray-300 rounded-md p-2"
                    >
                      <option value="500ml">500ml</option>
                      <option value="750ml">750ml</option>
                    </select>
                  </div>
                  <button
                    onClick={() => addToCart(item.name, "lunch")}
                    className={`mt-2 px-4 py-2 rounded-md ${addedLunchItems[item.name] ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                  >
                    {addedLunchItems[item.name] ? "Added" : "Add to Cart"}
                  </button>
                 </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MealBox;