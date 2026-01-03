import { updateExistingItem } from "../utils/watchlistHandler";
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
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Progress:{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {formatTime(progress.time)}
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
      className="bg-white dark:bg-slate-900 rounded-lg shadow-md p-4 transition-all transform hover:scale-105 hover:shadow-xl dark:shadow-black/20 hover:bg-gray-50 dark:hover:bg-slate-800 border border-transparent dark:border-slate-800"
    >
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
        {title}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Type: {type}</p>

      <div className="mb-6">{showInfoByType()}</div>

      <div className="flex justify-between gap-2">
        <button
          onClick={() => onUpdateItem(item)}
          className="flex-1 px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white text-sm font-semibold rounded-full shadow-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-all active:scale-95"
        >
          Update
        </button>
        <button
          onClick={() => onDeleteItem(item.id)}
          className="flex-1 px-4 py-2 bg-red-600 dark:bg-red-900/40 text-white dark:text-red-400 text-sm font-semibold rounded-full shadow-md hover:bg-red-700 dark:hover:bg-red-900/60 transition-all active:scale-95 border border-transparent dark:border-red-900/50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
