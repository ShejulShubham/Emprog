import { updateExistingItem } from "../utils/watchlistHandler";
import { formatTime } from "../utils/timeFormatter";
import { useLoading } from "../context/loadingContext";
import { SquareCheckBig, SquarePen, Trash } from "lucide-react";
import { useModal } from "../context/modalContext";

export default function ItemCard({
  item,
  onItemUpdated,
  onUpdateItem,
  onDeleteItem
}) {
  const { title, type, progress } = item;

  const { showLoading, hideLoading } = useLoading();
  const { openModal, closeModal } = useModal();

  const hasValidTime = progress.time && progress.time !== "00:00:00";

  // ✅ Mark item as Completed with confirmation popup
  function handleCompleteItem(id) {
    openModal(
      <div className="p-6 bg-white dark:bg-slate-900 rounded-lg shadow-xl max-w-md w-full text-center border border-transparent transition-all">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Confirmation
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Mark this item as completed?
        </p>

        <div className="flex justify-center gap-4">
          {/* Cancel Button */}
          <button
            className="bg-gray-200 dark:bg-slate-800 text-gray-800 dark:text-gray-200 px-5 py-2 rounded hover:bg-gray-300 dark:hover:bg-slate-700 transition-colors"
            onClick={closeModal}
          >
            Cancel
          </button>

          {/* Complete Button */}
          <button
            className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 dark:hover:bg-green-500 shadow-md shadow-green-500/20 transition-colors"
            onClick={async () => {
              try {
                updateItemField("status");
                closeModal();
              } catch (error) {
                console.error("Failed to update item:", error);
                closeModal();
              }
            }}
          >
            Complete
          </button>
        </div>
      </div>,
      false
    );
  }

  async function updateItemField(updateField) {

    const now = new Date().toISOString();
    showLoading();
    try {
      // Update Field
      const updatedEpisode = updateField == "episode" ? String(Number(progress.episode) + 1) : progress.episode;
      const updatedSeason = updateField == "season" ? String(Number(progress.season) + 1) : progress.season;
      const updatedItemStatus = updateField == "status" ? "completed" : "ongoing";

      const updatedData = {
        title,
        type,
        progress: {
          season: updatedSeason,
          episode: updatedEpisode,
          time: progress.time,
          videoNumber: progress.videoNumber,
        },
        status: updatedItemStatus,
        update_date: now,
      };

      await updateExistingItem(item.id, updatedData);

      if (onItemUpdated) {
        onItemUpdated({ ...updatedData, id: item.id });
      }
    } catch (error) {
      console.error(`Error updating ${updateField}:`, error);
    } finally {
      hideLoading();
    }

  }

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
    // Helper for consistent badge styling
    const Badge = ({ children, color = "purple", onDoubleClick, title }) => {
      const colorClasses = {
        purple: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
        blue: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      };

      return (
        <span
          onDoubleClick={onDoubleClick}
          title={title}
          className={`${colorClasses[color]} px-2 py-1 rounded-full text-sm font-semibold transition-all duration-200 
          ${onDoubleClick ? 'cursor-pointer select-none hover:ring-2 hover:ring-purple-400 dark:hover:ring-purple-500 hover:ring-offset-1 dark:ring-offset-slate-900' : ''}`}
        >
          {children}
        </span>
      );
    };

    const progressContainerClass = "text-gray-600 dark:text-gray-400 text-sm flex flex-wrap gap-2";

    switch (type) {
      case "Movie":
      case "Documentary":
        return (
          <p className={progressContainerClass}>
            Progress:{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              <Badge color="blue">{formatTime(progress.time)}</Badge>
            </span>
          </p>
        );

      case "Series":
      case "Anime":
      case "Podcast":
        return (
          <p className={progressContainerClass}>
            {progress.season && <Badge>Season {progress.season}</Badge>}
            <Badge
              onDoubleClick={updateOnDoubleClick}
              title="Double-click to increase episode"
            >
              Episode {progress.episode}
            </Badge>
            {hasValidTime && <Badge color="blue">{formatTime(progress.time)}</Badge>}
          </p>
        );

      case "Audiobook":
        return (
          <p className={progressContainerClass}>
            <Badge>Track {progress.track}</Badge>
            {hasValidTime && <Badge color="blue">{formatTime(progress.time)}</Badge>}
          </p>
        );

      case "Lecture":
      case "Other":
        return (
          <p className={progressContainerClass}>
            <Badge>Video #{progress.videoNumber}</Badge>
            {hasValidTime && <Badge color="blue">{formatTime(progress.time)}</Badge>}
          </p>
        );

      case "Course":
        return (
          <p className={progressContainerClass}>
            <Badge>Module {progress.module}</Badge>
            <Badge>Lesson {progress.lesson}</Badge>
          </p>
        );

      case "Manga":
      case "Webtoon":
        return (
          <p className={progressContainerClass}>
            <Badge>Chapter {progress.chapter}</Badge>
            <Badge>Page {progress.page}</Badge>
          </p>
        );

      default:
        return null;
    }
  };

  return (
    <div
      id={item.id}
      className="relative bg-white dark:bg-slate-900 rounded-lg shadow-md p-4 transition-all transform hover:shadow-xl dark:shadow-black/20 hover:bg-gray-50 dark:hover:bg-slate-800 border border-transparent dark:border-slate-800"
    >
      <SquareCheckBig className="w-5 h-5 float-right text-green-400" title="Mark as Completed" onClick={() => handleCompleteItem(item.id)} />
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
        {title}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-sm text-left mb-4">Type: {type}</p>

      <div className="mb-6">
        {showInfoByType()}
      </div>
      <SquarePen className="w-5 h-5 float-left text-yellow-400" title="Update Item" onClick={() => { onUpdateItem(item) }} />
      <Trash className="float-right text-red-400" title="Delete Item" onClick={() => onDeleteItem(item.id)} />

    </div>
  );
}
