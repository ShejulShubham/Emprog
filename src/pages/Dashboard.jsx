import ItemCard from "../components/ItemCard";
import { useEffect, useState } from "react";
import { usePageTitle } from "../hooks/usePageTitle";
import { useModal } from "../context/modalContext";
import { fetchItems } from "../utils/itemHandlers";
import { useLoading } from "../context/loadingContext";
import { useNavigate } from "react-router-dom";
import useAuthStore, { selectIsLoggedIn } from "../store/useAuthStore";
import ItemForm from "../components/ItemForm";
import { deleteExistingItem } from "../utils/itemHandlers";

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
    }, 1000);
  };

  // ✅ Fetch items on mount
  useEffect(() => {
    const loadItems = async () => {
      const allItems = await fetchItems();
      setItems(allItems);
    };
    loadItems();
    handleGetStarted();
  }, []);

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
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
        <p className="text-gray-600 mb-6">Are you sure you want to delete this item?</p>
        <div className="flex justify-center gap-4">
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={async () => {
              try {
                await deleteExistingItem(id);
                setItems((prevItems) => prevItems.filter((item) => item.id !== id));
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
      </div>
    );
  };

  return (
    <div className="min-h-screen px-4 bg-gray-50">
      <div className="bg-gray-100 text-gray-800 p-6 shadow-sm flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Your Watchlist</h1>
          <p className="text-gray-600">Track your shows, movies, and more.</p>
        </div>
        <button
          className="bg-gray-600 text-white p-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          onClick={() =>
            openModal(<ItemForm onItemAdded={handleItemAdded} />)
          }
        >
          Add New Entry
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
        {items.length > 0 ? (
          items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onUpdateItem={handleUpdateItem}
              onDeleteItem={handleDeleteItem} // ✅ pass delete handler
            />
          ))
        ) : (
          <p className="text-gray-500 text-center mt-10">
            No items yet. Add your first entry!
          </p>
        )}
      </div>
    </div>
  );
}
