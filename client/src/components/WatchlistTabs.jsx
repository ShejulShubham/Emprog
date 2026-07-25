import React, { useEffect, useRef, useState } from 'react';
import ItemSkeleton from './skeletons/ItemSkeleton';
import ActionMenu from './ActionMenu';
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
  Search,
  RotateCcw,
  RefreshCcw,
} from "lucide-react";
import ItemCard from './ItemCard';

const tabs = ['Ongoing', 'Watchlist', 'Completed'];

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

export default function WatchlistTabs({ categorized, handleUpdateItem, handleItemUpdated, handleDeleteItem, isInitialLoad, reloadItemsFromCloud }) {

  const [activeTab, setActiveTab] = useState('Ongoing');
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const itemsCopy = categorized['ongoing'];
  const completedItems = categorized['completed'];

  const tabSwitchedRef = useRef([tabs[0]]);
  const inputRef = useRef(null);

  let onSearch = false;
  let sortedGroupedItems = [];
  let searchedItems = [];

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        setIsExpanded(false);
        inputRef.current?.blur(); // Remove focus
      }

      if (event.key === "/") {
        event.preventDefault();
        setIsExpanded(true);
        setTimeout(() => {
          inputRef.current?.focus();
        }, 100);
      }

    };
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);


  function handleTabSwitch(event) {
    const tabName = event.target.value.trim();
    setActiveTab(tabName);

    if(tabName != "ongoing" && !tabSwitchedRef.current.includes(tabName)){
      tabSwitchedRef.current.push(tabName);
    }
  }

  const handleExport = async () => {
    setIsExporting(true);
    await downloadItemsAsJSON();
    setIsExporting(false);
  };

  const groupItemsByType = (items) => {
    return items.reduce((acc, item) => {
      if (!acc[item.type]) acc[item.type] = [];
      acc[item.type].push(item);
      return acc;
    }, {});
  };

  function handleSearch(text) {
    const search = text.trim().toLowerCase();

    if (text.length > 0) {
      onSearch = true;
      const keywords = search.split(/\s+/); // Split by spaces

      searchedItems = itemsCopy.filter((item) => {
        const itemTitle = item.title.toLowerCase();

        // Check if EVERY keyword exists somewhere in the title
        return keywords.every(word => itemTitle.includes(word));
      });
    } else {
      onSearch = false;
      searchedItems = [];
    }
  }

  function triggerSortingGroup(filter) {

    switch (filter) {
      case "asc":
        return itemsCopy.sort((a, b) => a.title.localeCompare(b.title));

      case "des":
        return itemsCopy.sort((a, b) => b.title.localeCompare(a.title));

      case "created-time-asc":
        return itemsCopy.sort(
          (a, b) => new Date(a.create_date) - new Date(b.create_date)
        );

      case "created-time-des":
        return itemsCopy.sort(
          (a, b) => new Date(b.create_date) - new Date(a.create_date)
        );

      case "updated-time-asc":
        return itemsCopy.sort(
          (a, b) => new Date(a.update_date) - new Date(b.update_date)
        );

      case "updated-time-des":
        return itemsCopy.sort(
          (a, b) => new Date(b.update_date) - new Date(a.update_date)
        );

      default:
        return groupItemsByType(itemsCopy);
    }
  }

  function handleSorting(event) {
    setSortBy(event.target.value);
  }

  // Execute Functions
  if (itemsCopy) {
    sortedGroupedItems = triggerSortingGroup(sortBy);
    handleSearch(searchText);
  }

  return (
    <>
      <div className="m-3">

        <div className="flex justify-between border-lg border-gray-800 rounded-lg dark:text-white">
          <div className="my-auto w-5/6">
            <label>
              <>
                <input
                  className={`
                    outline-none transition-all duration-500 ease-in-out origin-right border rounded-lg bg-white dark:bg-gray-800 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                    ${isExpanded ? 'w-1/2 md:w-3/4 px-4 py-2 opacity-100' : 'w-0 p-0 opacity-0 border-none'}
                  `}
                  placeholder="Search"
                  ref={inputRef}
                  onChange={(e) => setSearchText(e.target.value)}
                  value={searchText} />
              </>

              {!onSearch ?
                (<Search className="inline-block w-8 h-8 ml-2 -mt-2" onClick={() => setIsExpanded(prev => !prev)} />)
                :
                (<RotateCcw className="inline-block w-7 h-7 ml-2 -mt-2" onClick={() => { setSearchText(""), setIsExpanded(prev => !prev) }} />)

              }
            </label>
            <div className="group relative inline">
              <RefreshCcw size={18} className="inline-block w-7 h-7 ml-2 -mt-2" onClick={reloadItemsFromCloud} />
              <span className="absolute -top-1 left-12 scale-0 transition-all rounded bg-gray-900 dark:bg-slate-800 p-2 text-xs text-white group-hover:scale-100 z-50 whitespace-nowrap shadow-lg">
                Sync Watchlist
              </span>
            </div>
          </div>
          <ActionMenu onDownload={handleExport} />
        </div>

        <div className="flex flex-col items-center gap-6 p-4">
          {/* Tab Container */}
          <div className="radio-inputs relative flex w-[300px] flex-wrap rounded-lg bg-gray-200 p-1 text-sm shadow-sm dark:bg-gray-800">

            {
              tabs.map((tab, index) => (
                <label key={index} className="flex-1 text-center cursor-pointer">
                  <input
                    type="radio"
                    name="watchlist-state"
                    className="hidden"
                    value={tab}
                    checked={activeTab === tab}
                    onChange={(event) => { handleTabSwitch(event) }}
                  />
                  <div className='relative' >
                    <span className={`flex items-center justify-center rounded-md py-2 transition-all duration-150 ease-in-out
              ${activeTab === tab
                        ? 'bg-white font-semibold text-slate-900 shadow dark:bg-gray-600 dark:text-white'
                        : 'text-slate-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-gray-200'
                      }`}>
                      {tab}
                    </span>
                    {!tabSwitchedRef.current.includes(tab) && <div className="absolute right-0 top-0 z-10">
                      <div className="flex h-2 w-2 items-center justify-center">
                        <span
                          className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"
                        ></span>
                        <span
                          className="relative inline-flex h-2 w-2 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white"
                        >
                        </span>
                      </div>
                    </div>}
                  </div>
                </label>

              ))
            }
          </div>

        </div>

        {/* Content Rendering */}
        {/* Tab Ongoing */}
        {activeTab == tabs[0] && (
          <>
            {!onSearch ?
              (isInitialLoad ? (
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
                      className="outline-none block max-w-fit appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 pr-8 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 transition-colors duration-200 cursor-pointer"
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
              )) :
              Object.keys(searchedItems).length > 0 ? (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
                {searchedItems.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    onItemUpdated={handleItemUpdated}
                    onUpdateItem={handleUpdateItem}
                    onDeleteItem={handleDeleteItem}
                  />
                ))}
              </div>) : (
                <div className="text-center py-20">
                  <p className="text-gray-500 dark:text-gray-400 italic text-lg">
                    No items found!
                  </p>
                </div>
              )}
          </>
        )}
        {/* Tab Watchlist */}
        {activeTab == tabs[1] && (
          <>
            <h2 className="text-lg dark:text-white text-center">Great Things Come to Those Who Wait.</h2>
          </>
        )}
        {/* Tab Completed */}
        {activeTab == tabs[2] && (
          <>
            {completedItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedItems.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    onItemUpdated={handleItemUpdated}
                    onUpdateItem={handleUpdateItem}
                    onDeleteItem={handleDeleteItem}
                  />
                ))}
              </div>
            ) : (
              <h2 className="text-lg dark:text-white text-center">Great Things Come to Those Who Wait.</h2>
            )}

          </>
        )}
      </div>
    </>

  );
};