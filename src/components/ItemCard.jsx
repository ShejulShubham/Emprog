import { formatTime } from "../utils/timeFormatter";

export default function ItemCard({ item, onUpdateItem, onDeleteItem }) {
  const { title, type, progress } = item;

  const showInfoByType = () => {
    switch (type) {
      case "Movie":
      case "Documentary":
        return <p className="text-gray-600 text-sm">Progress: {formatTime(progress.time)}</p>;
      case "Series":
      case "Anime":
        return (
          <p className="text-gray-600 text-sm">
            Season {progress.season}, Episode {progress.episode}
            {progress.time && ` | Time: ${formatTime(progress.time)}`}
          </p>
        );
      case "Podcast":
        return (
          <p className="text-gray-600 text-sm">
            Episode {progress.episode}
            {progress.time && ` | Time: ${formatTime(progress.time)}`}
          </p>
        );
      case "Audiobook":
        return (
          <p className="text-gray-600 text-sm">
            Track {progress.track}
            {progress.time && ` | Time: ${formatTime(progress.time)}`}
          </p>
        );
      case "Lecture":
      case "Other":
        return (
          <p className="text-gray-600 text-sm">
            Video #{progress.videoNumber}
            {progress.time && ` | Time: ${formatTime(progress.time)}`}
          </p>
        );
      case "Course":
        return <p className="text-gray-600 text-sm">Module {progress.module}, Lesson {progress.lesson}</p>;
      case "Manga":
      case "Webtoon":
        return <p className="text-gray-600 text-sm">Chapter {progress.chapter}, Page {progress.page}</p>;
      default:
        return null;
    }
  };

  return (
    <div
      id={item.id}
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
    >
      <h2 className="text-lg font-semibold text-gray-800 flex items-center">
        {title}
      </h2>
      <p className="text-gray-600 text-sm">Type: {type}</p>
      <div>{showInfoByType()}</div>
      <div className="flex justify-between">
        <button
          className="mt-3 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
          onClick={() => onUpdateItem(item)}
        >
          Update
        </button>
        <button
          onClick={() => onDeleteItem(item.id)}
          className="mt-3 px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
