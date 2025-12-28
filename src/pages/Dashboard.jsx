import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";
import ItemCard from "../components/ItemCard";
import ItemForm from "../components/ItemForm";
import ItemSkeleton from "../components/skeletons/ItemSkeleton";
import ActionMenu from "../components/ActionMenu";
import { useModal } from "../context/modalContext";
import { downloadItemsAsJSON, fetchItems, deleteExistingItem } from "../utils/watchlistHandler";
import { useLoading } from "../context/loadingContext";
import useAuthStore, { selectIsLoggedIn } from "../store/useAuthStore";
import {
  Film,
  Tv,
  BookOpen,
  Book,
  Headphones,
  Mic,
  GraduationCap,
  Layers,
  FileText,
  PlayCircle,
  RotateCcw,
  FileDown,
} from "lucide-react";

const typeIcons = {
  Movie: <Film className="w-4 h-4 inline mr-1 text-gray-600" />,
  Documentary: <Film className="w-4 h-4 inline mr-1 text-gray-600" />,
  Series: <Tv className="w-4 h-4 inline mr-1 text-gray-600" />,
  Anime: <Tv className="w-4 h-4 inline mr-1 text-gray-600" />,
  Podcast: <Mic className="w-4 h-4 inline mr-1 text-gray-600" />,
  Audiobook: <Headphones className="w-4 h-4 inline mr-1 text-gray-600" />,
  Lecture: <GraduationCap className="w-4 h-4 inline mr-1 text-gray-600" />,
  Course: <Layers className="w-4 h-4 inline mr-1 text-gray-600" />,
  Manga: <BookOpen className="w-4 h-4 inline mr-1 text-gray-600" />,
  Webtoon: <Book className="w-4 h-4 inline mr-1 text-gray-600" />,
  Other: <FileText className="w-4 h-4 inline mr-1 text-gray-600" />,
};

export default function Dashboard() {
  usePageTitle("Dashboard");

  const { openModal, closeModal } = useModal();
  const [items, setItems] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const { showLoading, hideLoading } = useLoading();
  const isLoggedIn = useAuthStore(selectIsLoggedIn);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (!isLoggedIn) navigate("/login");
  };

  // ✅ Fetch items on mount
  useEffect(() => {
    handleGetStarted();
    // debugger;
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
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this item?
        </p>
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
      </div>
    );
  };

  const groupItemsByType = (items) => {
    return items.reduce((acc, item) => {
      if (!acc[item.type]) acc[item.type] = [];
      acc[item.type].push(item);
      return acc;
    }, {});
  };


  const handleExport = async () => {
    setIsExporting(true);
    await downloadItemsAsJSON();
    setIsExporting(false);
  };

  const groupedItems = groupItemsByType(items);

  return (
    <div className="min-h-screen px-4 bg-gray-50">
      <div className="bg-gray-100 text-gray-800 p-6 shadow-sm flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Your Watchlist</h1>
          <p className="text-gray-600">Track your shows, movies, and more.</p>
        </div>
        <button
          className="bg-gray-600 text-white p-2 rounded-lg font-medium shadow-md hover:bg-gray-800 hover:shadow-lg transform transition-all duration-200 ease-in hover:scale-110"
          onClick={() => openModal(<ItemForm onItemAdded={handleItemAdded} />)}
        >
          Add New Entry
        </button>
      </div>

      <div className="m-3">
        <ActionMenu onDownload={handleExport} onReload={reloadItemsFromCloud} />
        {isInitialLoad ? (
          Array.from({ length: 6 }).map((_, index) => (
            <ItemSkeleton key={index} />
          ))
        ) : Object.keys(groupedItems).length > 0 ? (
          Object.keys(groupedItems).map((type) => (
            <div key={type} className="mb-8">
              {/* Section Header */}
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                {typeIcons[type] || (
                  <PlayCircle className="w-4 h-4 inline mr-1 text-gray-500" />
                )}
                {type}
              </h2>

              {/* Items Row (always horizontal scroll) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupedItems[type].map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    onItemUpdated={handleItemUpdated}
                    onUpdateItem={handleUpdateItem}
                    onDeleteItem={handleDeleteItem}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500 italic">
              No items found in your watchlist.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
