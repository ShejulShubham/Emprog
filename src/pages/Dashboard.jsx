import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";
import ItemForm from "../components/ItemForm";
import {
  fetchItems,
} from "../utils/watchlistHandler";
import { useLoading } from "../context/loadingContext";
import useAuthStore, { selectIsLoggedIn } from "../store/useAuthStore";
import WatchlistTabs from "../components/WatchlistTabs";

export default function Watchlist() {
  usePageTitle("Watchlist");

  const [items, setItems] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const { showLoading, hideLoading } = useLoading();
  const isLoggedIn = useAuthStore(selectIsLoggedIn);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (!isLoggedIn) navigate("/login");
  };

  // ✅ Fetch items on mount
  useEffect(() => {
    handleGetStarted();
    const loadItems = async () => {
      try {
        showLoading();

        const allItems = await fetchItems();
        setItems(allItems);
      } catch (error) {
        console.log(error.message);
      } finally {
        hideLoading();
        setIsInitialLoad(false);
      }
    };
    loadItems();

  }, []);


  const reloadItemsFromCloud = async () => {
    try {
      showLoading();
      setIsInitialLoad(true);

      const fetchFromCloud = true;

      const cloudItems = await fetchItems(fetchFromCloud);

      setItems(cloudItems);
    } catch (error) {
      console.log(error.message);
    } finally {
      hideLoading();
      setIsInitialLoad(false);
    }
  };

  // ✅ Add new item
  const handleItemAdded = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
    closeModal();
  };


  return (
    <div className="min-h-screen p-4 bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Header Section */}
      <div className="bg-gray-100 dark:bg-slate-900 text-gray-800 dark:text-white p-6 shadow-sm flex justify-between items-center rounded-xl transition-colors duration-300">
        <div>
          <h1 className="text-2xl font-bold">Your Watchlist</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your shows, movies, and more.
          </p>
        </div>
        <button
          className="bg-gray-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-lg font-medium shadow-md hover:bg-gray-800 dark:hover:bg-gray-100 transform transition-all duration-300 ease-in hover:scale-105"
          onClick={() => openModal(<ItemForm onItemAdded={handleItemAdded} />)}
        >
          Add New Entry
        </button>
      </div>

        <WatchlistTabs items={items} handleItemAdded={handleItemAdded} isInitialLoad={isInitialLoad} reloadItemsFromCloud={reloadItemsFromCloud}  />

    </div>
  );
}
