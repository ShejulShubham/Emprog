import { formatTime } from "../utils/timeFormatter";

export default function ItemCard({ item, onUpdateItem, onDeleteItem }) {
  const { title, type, progress } = item;

  const hasValidTime = progress.time && progress.time !== "00:00:00";

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
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-semibold">
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
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-semibold">
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
      <p className="text-gray-600 text-sm">Type: {type}</p>
      <div>{showInfoByType()}</div>
      <div className="flex justify-between mt-3 gap-2">
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
