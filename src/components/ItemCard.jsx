import React from "react";
import { updateExistingItem } from "../utils/itemHandlers";
import { formatTime } from "../utils/timeFormatter";
import { useLoading } from "../context/loadingContext";

export default function ItemCard({
  item,
  onItemUpdated,
  onUpdateItem,
  onDeleteItem,
}) {
  const { title, type, progress } = item;

  const { showLoading, hideLoading } = useLoading();

  const hasValidTime = progress.time && progress.time !== "00:00:00";

  async function updateOnDoubleClick() {
    //TODO: Make this function work for other categories too

    const now = new Date().toISOString();
    showLoading();
    try {
      const updatedEpisode = String(Number(progress.episode) + 1);

      const updatedData = {
        title,
        type,
        progress: {
          season: progress.season,
          time: progress.time,
          episode: updatedEpisode,
          videoNumber: progress.videoNumber,
        },
        update_date: now,
      };

      // console.log("existing item: ", item);
      // console.log("updated item ", updatedData);

      await updateExistingItem(item.id, updatedData);

      if (onItemUpdated) {
        onItemUpdated({ ...updatedData, id: item.id });
      }
    } catch (error) {
      console.error("Error saving item:", error);
    } finally {
      hideLoading();
    }
  }

  const showInfoByType = () => {
    switch (type) {
      case "Movie":
      case "Documentary":
        return (
          <p className="text-gray-600 text-sm">
            Progress:{" "}
            <span className="font-semibold text-blue-600">
              {formatTime(progress.time)}
            </span>
          </p>
        );

      case "Series":
      case "Anime":
        return (
          <p className="text-gray-600 text-sm flex flex-wrap gap-2">
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-semibold">
              Season {progress.season}
            </span>
            <span
              className="
                  bg-purple-100 
                  text-purple-800 
                  px-3 py-1 
                  rounded-full 
                  text-sm font-semibold 
                  cursor-pointer select-none 
                  border border-transparent
                  hover:bg-purple-200
                  hover:ring-2 
                  hover:ring-purple-400 
                  hover:ring-offset-1
                  transition-all duration-200
                "
              onDoubleClick={updateOnDoubleClick}
              title="Double-click to increase episode"
            >
              Episode {progress.episode}
            </span>
            {hasValidTime && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-semibold">
                {formatTime(progress.time)}
              </span>
            )}
          </p>
        );

      case "Podcast":
        return (
          <p className="text-gray-600 text-sm flex flex-wrap gap-2">
            <span
              className="
                  bg-purple-100 
                  text-purple-800 
                  px-3 py-1 
                  rounded-full 
                  text-sm font-semibold 
                  cursor-pointer select-none 
                  border border-transparent
                  hover:bg-purple-200
                  hover:ring-2 
                  hover:ring-purple-400 
                  hover:ring-offset-1
                  transition-all duration-200
                "
              onDoubleClick={updateOnDoubleClick}
              title="Double-click to increase episode"
            >
              Episode {progress.episode}
            </span>
            {hasValidTime && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-semibold">
                {formatTime(progress.time)}
              </span>
            )}
          </p>
        );

      case "Audiobook":
        return (
          <p className="text-gray-600 text-sm flex flex-wrap gap-2">
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-semibold">
              Track {progress.track}
            </span>
            {hasValidTime && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-semibold">
                {formatTime(progress.time)}
              </span>
            )}
          </p>
        );

      case "Lecture":
      case "Other":
        return (
          <p className="text-gray-600 text-sm flex flex-wrap gap-2">
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-semibold">
              Video #{progress.videoNumber}
            </span>
            {hasValidTime && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-semibold">
                {formatTime(progress.time)}
              </span>
            )}
          </p>
        );

      case "Course":
        return (
          <p className="text-gray-600 text-sm flex flex-wrap gap-2">
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-semibold">
              Module {progress.module}
            </span>
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-semibold">
              Lesson {progress.lesson}
            </span>
          </p>
        );

      case "Manga":
      case "Webtoon":
        return (
          <p className="text-gray-600 text-sm flex flex-wrap gap-2">
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-semibold">
              Chapter {progress.chapter}
            </span>
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-semibold">
              Page {progress.page}
            </span>
          </p>
        );

      default:
        return null;
    }
  };

  return (
    <div
      id={item.id}
      className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gray-50"
    >
      <h2 className="text-lg font-semibold text-gray-800 flex items-center">
        {title}
      </h2>
      <p className="text-gray-600 text-sm mb-2">Type: {type}</p>
      <div>{showInfoByType()}</div>
      <div className="flex justify-between mt-9 gap-2">
        <button
          onClick={() => onUpdateItem(item)}
          className="px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transform transition-all duration-200 hover:scale-105"
        >
          Update
        </button>
        <button
          onClick={() => onDeleteItem(item.id)}
          className="px-5 py-2 bg-red-600 text-white text-sm font-semibold rounded-full shadow-md hover:bg-red-700 hover:shadow-lg transform transition-all duration-200 hover:scale-105"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
