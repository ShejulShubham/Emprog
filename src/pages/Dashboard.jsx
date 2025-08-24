import "../styles/Home.css";
import ItemCard from "../components/ItemCard";
import { useEffect, useState } from "react";
import { usePageTitle } from "../hooks/usePageTitle";
import { useModal } from "../context/modalContext";
import AddItemForm from "../components/AddItem";
import { fetchItems } from "../utils/itemHandlers";
import { useLoading } from "../context/loadingContext";
import { useNavigate } from "react-router-dom";
import useAuthStore, { selectIsLoggedIn } from "../store/useAuthStore";

export default function Dashboard() {
  usePageTitle("Dashboard");

  const { openModal, closeModal } = useModal();
  const [items, setItems] = useState([]);
  const { showLoading, hideLoading } = useLoading();
  const isLoggedIn = useAuthStore(selectIsLoggedIn);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    showLoading();

    setTimeout(() => {
      hideLoading();
      if (!isLoggedIn) navigate("/login");
    }, 1000); // simulate loading for UX
  };

  // Fetch items on component mount
  useEffect(() => {
    const loadItems = async () => {
      const allItems = await fetchItems();
      setItems(allItems);
    };
    loadItems();
    handleGetStarted();
  }, []);

  // Handle adding new item dynamically
  const handleItemAdded = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
    closeModal(); // Close modal after adding
  };

  return (
    <div className="home-container">
      <div className="bg-gray-100 text-gray-800 p-6 shadow-sm flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Your Watchlist</h1>
          <p className="text-gray-600">Track your shows, movies, and more.</p>
        </div>
        <button
          className="bg-gray-600 text-white p-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          onClick={() =>
            openModal(<AddItemForm onItemAdded={handleItemAdded} />)
          }
        >
          Add New Entry
        </button>
      </div>

      <div className="items-grid">
        {items.length > 0 ? (
          items.map((item) => <ItemCard key={item.id} item={item} />)
        ) : (
          <p className="text-gray-500 text-center mt-10">
            No items yet. Add your first entry!
          </p>
        )}
      </div>
    </div>
  );
}
