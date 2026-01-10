import React, { useState, useEffect } from "react";
import { addNewItem, updateExistingItem } from "../utils/watchlistHandler";
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
  const { showLoading, hideLoading, isLoading } = useLoading();

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
    showLoading();

    const now = new Date().toISOString();
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
      console.error("Error saving item:", error.message);
    } finally {
      hideLoading();
    }
  };

  const renderDynamicFields = () => {
    // Reusable component for form fields to keep code dry
    const InputField = ({ label, type = "text", value, placeholder, field }) => (
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
          {label}
        </label>
        <input
          type={type}
          value={value}
          onChange={(e) => handleProgressChange(field, e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
        />
      </div>
    );

    switch (type) {
      case "Movie":
      case "Documentary":
        return (
          <InputField
            label="Time Progress"
            value={progress.time}
            field="time"
            placeholder="e.g., 01:45:23"
          />
        );

      case "Series":
      case "Anime":
        return (
          <div className="space-y-4">
            <InputField label="Season" type="number" value={progress.season} field="season" placeholder="Enter season number" />
            <InputField label="Episode" type="number" value={progress.episode} field="episode" placeholder="Enter episode number" />
            <InputField label="Time in Episode" value={progress.time} field="time" placeholder="e.g., 00:23:15" />
          </div>
        );

      case "Podcast":
        return (
          <div className="space-y-4">
            <InputField label="Episode Number" type="number" value={progress.episode} field="episode" placeholder="Enter episode number" />
            <InputField label="Time Progress" value={progress.time} field="time" placeholder="e.g., 00:15:30" />
          </div>
        );

      case "Audiobook":
        return (
          <div className="space-y-4">
            <InputField label="Track Number" type="number" value={progress.track} field="track" placeholder="Enter track number" />
            <InputField label="Time Progress" value={progress.time} field="time" placeholder="e.g., 00:30:15" />
          </div>
        );

      case "Lecture":
      case "Other":
        return (
          <div className="space-y-4">
            <InputField label="Video Number" type="number" value={progress.videoNumber} field="videoNumber" placeholder="Enter video number" />
            <InputField label="Time Progress" value={progress.time} field="time" placeholder="e.g., 00:10:05" />
          </div>
        );

      case "Course":
        return (
          <div className="space-y-4">
            <InputField label="Module" type="number" value={progress.module} field="module" placeholder="Enter module number" />
            <InputField label="Lesson" type="number" value={progress.lesson} field="lesson" placeholder="Enter lesson number" />
          </div>
        );

      case "Manga":
      case "Webtoon":
        return (
          <div className="space-y-4">
            <InputField label="Chapter" type="number" value={progress.chapter} field="chapter" placeholder="Enter chapter number" />
            <InputField label="Page" type="number" value={progress.page} field="page" placeholder="Enter page number" />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-lg max-w-md mx-auto space-y-5 border border-transparent dark:border-slate-800 transition-colors duration-300"
    >
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white text-center">
        {isEditMode ? "Update Entry" : "Add New Entry"}
      </h2>

      {/* Title Input */}
      <div>
        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
          className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
        />
        {errors.title && (
          <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      {/* Type Selector */}
      {!isEditMode && (
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
            Type of Entry
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-all"
          >
            <option value="" className="dark:bg-slate-800">Select type</option>
            <option value="Movie" className="dark:bg-slate-800">Movie</option>
            <option value="Series" className="dark:bg-slate-800">Series</option>
            <option value="Anime" className="dark:bg-slate-800">Anime</option>
            <option value="Podcast" className="dark:bg-slate-800">Podcast</option>
            <option value="Audiobook" className="dark:bg-slate-800">Audiobook</option>
            <option value="Documentary" className="dark:bg-slate-800">Documentary</option>
            <option value="Lecture" className="dark:bg-slate-800">Lecture</option>
            <option value="Course" className="dark:bg-slate-800">Course</option>
            <option value="Manga" className="dark:bg-slate-800">Manga</option>
            <option value="Webtoon" className="dark:bg-slate-800">Webtoon</option>
            <option value="Other" className="dark:bg-slate-800">Other</option>
          </select>
          {errors.type && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.type}</p>
          )}
        </div>
      )}

      {/* Dynamic Fields Container */}
      <div className="dark:text-gray-200">
        {renderDynamicFields()}
      </div>

      {errors.progress && (
        <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.progress}</p>
      )}

      {/* Submit/Loading Button */}
      {isLoading ? (
        <button
          className="w-full bg-blue-800 dark:bg-blue-900 text-white py-2 rounded-lg font-medium transition-colors cursor-not-allowed opacity-70"
          disabled
        >
          {isEditMode ? "Updating..." : "Submitting..."}
        </button>
      ) : (
        <button
          type="submit"
          className="w-full bg-blue-600 dark:bg-blue-700 text-white py-2 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-all active:scale-[0.98]"
        >
          {isEditMode ? "Update" : "Submit"}
        </button>
      )}
    </form>
  );
};

export default ItemForm;
