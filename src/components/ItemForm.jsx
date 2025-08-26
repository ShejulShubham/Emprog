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
    season: "1",
    episode: "1",
    videoNumber: "",
  });
  const [errors, setErrors] = useState({});
  const { showLoading, hideLoading } = useLoading();

  // Pre-fill form when editing
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

  // Validate fields
  const validateFields = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!type.trim()) newErrors.type = "Type is required";

    if (type === "Movie" && !progress.time.trim()) {
      newErrors.progress = "Time progress is required";
    }
    if (type === "Series" && (!progress.season || !progress.episode)) {
      newErrors.progress = "Season and Episode are required";
    }
    if (type === "Other" && (!progress.videoNumber || !progress.time.trim())) {
      newErrors.progress = "Video number and time are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit for Add or Update
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

        const savedItem = await addNewItem(newItem); // savedItem includes Firestore `id`
        if (onItemAdded) onItemAdded(savedItem);
      }

      // Reset form if adding
      if (!isEditMode) {
        setTitle("");
        setType("");
        setProgress({
          time: "00:00:00",
          season: "1",
          episode: "1",
          videoNumber: "",
        });
        setErrors({});
      }
    } catch (error) {
      console.error("Error saving item:", error);
    } finally {
      hideLoading();
    }
  };

  // Dynamic fields
  const renderDynamicFields = () => {
    switch (type) {
      case "Movie":
        return (
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Time Progress (HH:MM:SS)
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
                Time in Episode (optional)
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

      {/* Title */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter show title"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      {/* Type */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Type of Entry
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isEditMode} // prevent changing type during update
        >
          <option value="">Select type</option>
          <option value="Movie">Movie</option>
          <option value="Series">Series</option>
          <option value="Other">Other</option>
        </select>
        {errors.type && (
          <p className="text-red-500 text-sm mt-1">{errors.type}</p>
        )}
      </div>

      {/* Dynamic Fields */}
      {renderDynamicFields()}
      {errors.progress && (
        <p className="text-red-500 text-sm mt-1">{errors.progress}</p>
      )}

      {/* Submit Button */}
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
