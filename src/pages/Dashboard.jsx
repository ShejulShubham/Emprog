import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";
import ItemCard from "../components/ItemCard";
import ItemForm from "../components/ItemForm";
import ItemSkeleton from "../components/skeletons/ItemSkeleton";
import ActionMenu from "../components/ActionMenu";
import { useModal } from "../context/modalContext";
import {
  downloadItemsAsJSON,
  fetchItems,
  deleteExistingItem,
} from "../utils/watchlistHandler";
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
} from "lucide-react";

const typeIcons = {
  Movie: <Film className="w-4 h-4 inline mr-1 text-gray-600 dark:text-white" />,
  Documentary: (
    <Film className="w-4 h-4 inline mr-1 text-gray-600 dark:text-white" />
  ),
  Series: <Tv className="w-4 h-4 inline mr-1 text-gray-600 dark:text-white" />,
  Anime: <Tv className="w-4 h-4 inline mr-1 text-gray-600 dark:text-white" />,
  Podcast: (
    <Mic className="w-4 h-4 inline mr-1 text-gray-600 dark:text-white" />
  ),
  Audiobook: (
    <Headphones className="w-4 h-4 inline mr-1 text-gray-600 dark:text-white" />
  ),
  Lecture: (
    <GraduationCap className="w-4 h-4 inline mr-1 text-gray-600 dark:text-white" />
  ),
  Course: (
    <Layers className="w-4 h-4 inline mr-1 text-gray-600 dark:text-white" />
  ),
  Manga: (
    <BookOpen className="w-4 h-4 inline mr-1 text-gray-600 dark:text-white" />
  ),
  Webtoon: (
    <Book className="w-4 h-4 inline mr-1 text-gray-600 dark:text-white" />
  ),
  Other: (
    <FileText className="w-4 h-4 inline mr-1 text-gray-600 dark:text-white" />
  ),
};

export default function Dashboard() {
  usePageTitle("Dashboard");

  const { openModal, closeModal } = useModal();
  const [items, setItems] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [sortBy, setSortBy] = useState("default");

  const { showLoading, hideLoading } = useLoading();
  const isLoggedIn = useAuthStore(selectIsLoggedIn);
  const navigate = useNavigate();

  let sortedGroupedItems = [];

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
      <div className="p-6 bg-white dark:bg-slate-900 rounded-lg shadow-xl max-w-md w-full text-center border border-transparent dark:border-slate-800 transition-all">
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

  function triggerSortingGroup(filter) {

    switch (filter) {
      case "asc":
        return items.sort((a, b) => a.title.localeCompare(b.title));

      case "des":
        return items.sort((a, b) => b.title.localeCompare(a.title));

      case "created-time-asc":
        return items.sort(
          (a, b) => new Date(a.create_date) - new Date(b.create_date)
        );

      case "created-time-des":
        return items.sort(
          (a, b) => new Date(b.create_date) - new Date(a.create_date)
        );

      case "updated-time-asc":
        return items.sort(
          (a, b) => new Date(a.update_date) - new Date(b.update_date)
        );

      case "updated-time-des":
        return items.sort(
          (a, b) => new Date(b.update_date) - new Date(a.update_date)
        );

      default:
        return groupItemsByType(items);
    }
  }

  function handleSorting(event) {
    setSortBy(event.target.value);
  }

  sortedGroupedItems = triggerSortingGroup(sortBy);

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

      <div className="m-3">
        {/* Action Menu (Ensure this component also has dark: classes inside it) */}
        <ActionMenu onDownload={handleExport} onReload={reloadItemsFromCloud} />

        {isInitialLoad ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <ItemSkeleton key={index} />
            ))}
          </div>
        ) : Object.keys(sortedGroupedItems).length > 0 ? (
          <>
            {/* Sort Group By */}
            <div className="flex gap-2 my-4">
              <label
                htmlFor="sort-select"
                className="text-sm font-medium my-auto text-gray-700 dark:text-gray-300"
              >
                Sort:
              </label>

              <select
                id="sort-select"
                onChange={handleSorting}
                className="block max-w-fit appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 pr-8 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 transition-colors duration-200 cursor-pointer"
              >
                <option value="default">Default</option>
                <option value="asc">A to Z</option>
                <option value="des">Z to A</option>
                <option value="created-time-asc">First Created First</option>
                <option value="created-time-des">Last Created First</option>
                <option value="updated-time-asc">First Updated First </option>
                <option value="updated-time-des">Last Updated First</option>
              </select>
            </div>

            {sortBy == "default" ? (
              Object.keys(sortedGroupedItems).map((type) => (
                <div key={type} className="mb-8">
                  {/* Section Header */}
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                    {typeIcons[type] || (
                      <PlayCircle className="w-5 h-5 inline mr-1 text-gray-500 dark:text-gray-400" />
                    )}
                    {type}
                  </h2>

                  {/* Items Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedGroupedItems[type].map((item) => (
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedGroupedItems.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    onItemUpdated={handleItemUpdated}
                    onUpdateItem={handleUpdateItem}
                    onDeleteItem={handleDeleteItem}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400 italic text-lg">
              No items found in your watchlist.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
