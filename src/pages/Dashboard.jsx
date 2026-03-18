import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";
import ItemForm from "../components/ItemForm";
import {
  deleteExistingItem,
  fetchItems,
} from "../utils/watchlistHandler";
import { useLoading } from "../context/loadingContext";
import useAuthStore, { selectIsLoggedIn } from "../store/useAuthStore";
import WatchlistTabs from "../components/WatchlistTabs";
import { useModal } from "../context/modalContext";

export default function Watchlist() {
  usePageTitle("Watchlist");

  const { openModal, closeModal } = useModal();
  const [items, setItems] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const { showLoading, hideLoading } = useLoading();
  const isLoggedIn = useAuthStore(selectIsLoggedIn);
  const navigate = useNavigate();
  const [categorized, setCategorized] = useState({
    ongoing: [],
    completed: [],
    watchlist: []
  })


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

  useEffect(() => {
    setCategorized(categorizeItems(items));
  }, [items]);

  function categorizeItems(items) {

    const ongoing = [];
    const completed = [];
    const watchlist = [];

    items.forEach((item) => {
      // Normalize status to lowercase or use "ongoing" if missing/invalid
      const status = (item.status || "ongoing").toLowerCase();

      if (status === "completed" || status === "completed") {
        completed.push(item);
      } else if (status === "watchlist" || status === "plan to watch") {
        watchlist.push(item);
      } else {
        // Default case: includes "ongoing", "watching", or undefined status
        ongoing.push(item);
      }
    });

    return { ongoing, completed, watchlist };
  };

  const reloadItemsFromCloud = async () => {
    try {
      showLoading();
      setIsInitialLoad(true);

      const fetchFromCloud = true;

      const cloudItems = await fetchItems(fetchFromCloud);

      setCategorized({ ...categorizeItems(cloudItems) });
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

  // ✅ Update existing item
  const handleItemUpdated = (updatedItem) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    closeModal();
  };

  // ✅ Open modal in update mode
  const handleUpdateItem = (item) => {
    openModal(
      <ItemForm
        existingItem={item}
        onItemAdded={handleItemAdded}
        onItemUpdated={handleItemUpdated}
      />
    );
  };

  // ✅ Delete item with confirmation popup
  const handleDeleteItem = (id) => {
    openModal(
      <div className="p-6 bg-white dark:bg-slate-900 rounded-lg shadow-xl max-w-md w-full text-center border border-transparent transition-all">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Confirm Deletion
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Are you sure you want to delete this item? This action cannot be
          undone.
        </p>

        <div className="flex justify-center gap-4">
          {/* Cancel Button */}
          <button
            className="bg-gray-200 dark:bg-slate-800 text-gray-800 dark:text-gray-200 px-5 py-2 rounded hover:bg-gray-300 dark:hover:bg-slate-700 transition-colors"
            onClick={closeModal}
          >
            Cancel
          </button>

          {/* Delete Button */}
          <button
            className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 dark:hover:bg-red-500 shadow-md shadow-red-500/20 transition-colors"
            onClick={async () => {
              try {
                await deleteExistingItem(id);
                setItems((prevItems) =>
                  prevItems.filter((item) => item.id !== id)
                );
                closeModal();
              } catch (error) {
                console.error("Failed to delete item:", error);
                closeModal();
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>,
      false
    );
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

      <WatchlistTabs
        categorized={categorized}
        handleItemUpdated={handleItemUpdated}
        handleUpdateItem={handleUpdateItem}
        handleDeleteItem={handleDeleteItem}
        isInitialLoad={isInitialLoad}
        reloadItemsFromCloud={reloadItemsFromCloud}
      />

    </div>
  );
}
