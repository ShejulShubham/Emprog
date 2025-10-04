import React, { useState, useEffect } from "react";
import { addNewItem, updateExistingItem } from "../utils/itemHandlers";
import { normalizeTime } from "../utils/timeFormatter";
import { useLoading } from "../context/loadingContext";

const ItemForm = ({ existingItem = null, onItemAdded, onItemUpdated }) => {
  const isEditMode = !!existingItem;

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [progress, setProgress] = useState({
    time: "00:00:00",
    season: "",
    episode: "",
    videoNumber: "",
    module: "",
    lesson: "",
    track: "",
    chapter: "",
    page: "",
  });
  const [errors, setErrors] = useState({});
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    if (isEditMode) {
      setTitle(existingItem.title);
      setType(existingItem.type);
      setProgress(existingItem.progress);
    }
  }, [existingItem, isEditMode]);

  const handleProgressChange = (field, value) => {
    setProgress((prev) => ({
      ...prev,
      [field]: field === "time" ? normalizeTime(value) : value,
    }));
  };

  const validateFields = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!type.trim()) newErrors.type = "Type is required";

    switch (type) {
      case "Movie":
        if (!progress.time.trim())
          newErrors.progress = "Time progress is required";
        break;
      case "Series":
      case "Anime":
        if (!progress.season || !progress.episode) {
          newErrors.progress = "Season and Episode are required";
        }
        break;
      case "Podcast":
        if (!progress.episode || !progress.time.trim()) {
          newErrors.progress = "Episode number and time are required";
        }
        break;
      case "Audiobook":
        if (!progress.track || !progress.time.trim()) {
          newErrors.progress = "Track number and time are required";
        }
        break;
      case "Documentary":
        if (!progress.time.trim()) {
          newErrors.progress = "Time progress is required";
        }
        break;
      case "Lecture":
        if (!progress.videoNumber || !progress.time.trim()) {
          newErrors.progress = "Video number and time are required";
        }
        break;
      case "Course":
        if (!progress.module || !progress.lesson) {
          newErrors.progress = "Module and Lesson are required";
        }
        break;
      case "Manga":
      case "Webtoon":
        if (!progress.chapter || !progress.page) {
          newErrors.progress = "Chapter and Page are required";
        }
        break;
      case "Other":
        if (!progress.videoNumber || !progress.time.trim()) {
          newErrors.progress = "Video number and time are required";
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    const now = new Date().toISOString();
    showLoading();
    try {
      if (isEditMode) {
        const updatedData = {
          title,
          type,
          progress,
          update_date: now,
        };
        await updateExistingItem(existingItem.id, updatedData);
        if (onItemUpdated)
          onItemUpdated({ ...updatedData, id: existingItem.id });
      } else {
        const newItem = {
          title,
          type,
          progress,
          create_date: now,
          update_date: now,
        };
        const savedItem = await addNewItem(newItem);
        if (onItemAdded) onItemAdded(savedItem);
      }

      if (!isEditMode) {
        setTitle("");
        setType("");
        setProgress({
          time: "00:00:00",
          season: "",
          episode: "",
          videoNumber: "",
          module: "",
          lesson: "",
          track: "",
          chapter: "",
          page: "",
        });
        setErrors({});
      }
    } catch (error) {
      console.error("Error saving item:", error);
    } finally {
      hideLoading();
    }
  };

  const renderDynamicFields = () => {
    switch (type) {
      case "Movie":
      case "Documentary":
        return (
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Time Progress
            </label>
            <input
              type="text"
              value={progress.time}
              onChange={(e) => handleProgressChange("time", e.target.value)}
              placeholder="e.g., 01:45:23"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        );
      case "Series":
      case "Anime":
        return (
          <>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Season
              </label>
              <input
                type="number"
                value={progress.season}
                onChange={(e) => handleProgressChange("season", e.target.value)}
                placeholder="Enter season number"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Episode
              </label>
              <input
                type="number"
                value={progress.episode}
                onChange={(e) =>
                  handleProgressChange("episode", e.target.value)
                }
                placeholder="Enter episode number"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Time in Episode
              </label>
              <input
                type="text"
                value={progress.time}
                onChange={(e) => handleProgressChange("time", e.target.value)}
                placeholder="e.g., 00:23:15"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        );
      case "Podcast":
        return (
          <>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Episode Number
              </label>
              <input
                type="number"
                value={progress.episode}
                onChange={(e) =>
                  handleProgressChange("episode", e.target.value)
                }
                placeholder="Enter episode number"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Time Progress
              </label>
              <input
                type="text"
                value={progress.time}
                onChange={(e) => handleProgressChange("time", e.target.value)}
                placeholder="e.g., 00:15:30"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        );
      case "Audiobook":
        return (
          <>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Track Number
              </label>
              <input
                type="number"
                value={progress.track}
                onChange={(e) => handleProgressChange("track", e.target.value)}
                placeholder="Enter track number"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Time Progress
              </label>
              <input
                type="text"
                value={progress.time}
                onChange={(e) => handleProgressChange("time", e.target.value)}
                placeholder="e.g., 00:30:15"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        );
      case "Lecture":
      case "Other":
        return (
          <>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Video Number
              </label>
              <input
                type="number"
                value={progress.videoNumber}
                onChange={(e) =>
                  handleProgressChange("videoNumber", e.target.value)
                }
                placeholder="Enter video number"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Time Progress
              </label>
              <input
                type="text"
                value={progress.time}
                onChange={(e) => handleProgressChange("time", e.target.value)}
                placeholder="e.g., 00:10:05"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        );
      case "Course":
        return (
          <>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Module
              </label>
              <input
                type="number"
                value={progress.module}
                onChange={(e) => handleProgressChange("module", e.target.value)}
                placeholder="Enter module number"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Lesson
              </label>
              <input
                type="number"
                value={progress.lesson}
                onChange={(e) => handleProgressChange("lesson", e.target.value)}
                placeholder="Enter lesson number"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        );
      case "Manga":
      case "Webtoon":
        return (
          <>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Chapter
              </label>
              <input
                type="number"
                value={progress.chapter}
                onChange={(e) =>
                  handleProgressChange("chapter", e.target.value)
                }
                placeholder="Enter chapter number"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Page
              </label>
              <input
                type="number"
                value={progress.page}
                onChange={(e) => handleProgressChange("page", e.target.value)}
                placeholder="Enter page number"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-3 rounded-xl shadow-lg max-w-md mx-auto space-y-5"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        {isEditMode ? "Update Entry" : "Add New Entry"}
      </h2>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      {!isEditMode && (
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Type of Entry
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select type</option>
            <option value="Movie">Movie</option>
            <option value="Series">Series</option>
            <option value="Anime">Anime</option>
            <option value="Podcast">Podcast</option>
            <option value="Audiobook">Audiobook</option>
            <option value="Documentary">Documentary</option>
            <option value="Lecture">Lecture</option>
            <option value="Course">Course</option>
            <option value="Manga">Manga</option>
            <option value="Webtoon">Webtoon</option>
            <option value="Other">Other</option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-sm mt-1">{errors.type}</p>
          )}
        </div>
      )}

      {renderDynamicFields()}
      {errors.progress && (
        <p className="text-red-500 text-sm mt-1">{errors.progress}</p>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        {isEditMode ? "Update" : "Submit"}
      </button>
    </form>
  );
};

export default ItemForm;
