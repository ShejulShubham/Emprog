import { BookmarkCheck } from "lucide-react";
import { formatTime } from "../utils/timeFormatter";
import { updateExistingItem } from "../utils/watchlistHandler";
import { useState } from "react";

export default function Item({ item, onUpdateItem, onDeleteItem, onCompletedItem }) {
    const { id, title, type, progress, is_completed } = item;

    const [isCompleted, setIsCompleted] = useState(is_completed);

    const hasValidTime = progress.time && progress.time !== "00:00:00";

    // TODO: Display created at and updated at fields

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

    async function setItemAsCompleted() {
        try {
            setIsCompleted(prev=>!prev);
            const updatedItem = {
                ...item,
                is_completed: !isCompleted,
                completed_date: new Date().toISOString()
            }

            await updateExistingItem(id, updatedItem);
            if (onCompletedItem) { onCompletedItem(updatedItem) };
        } catch (error) {
            console.error("Error: ", error.message);
        }
    }


    return (
        <div
            id={item.id}
            className="bg-white rounded-lg shadow-md p-4 transition-transform transform"
        >
            <button onClick={setItemAsCompleted} className={`group relative float-right ${isCompleted ? "text-green-500" : ""}`} >
                <BookmarkCheck />
                <span className="absolute -left-5 top-10 scale-0 transition-all rounded bg-gray-700 p-2 text-xs text-white group-hover:scale-100 z-50">
                    Set as Completed
                </span>
            </button>
            <h2 className="inline text-lg font-semibold text-gray-800 flex items-center">
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
    )
}