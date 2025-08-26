import { formatTime } from "../utils/timeFormatter";

export default function ItemCard({ item, onUpdateItem }) {
  const { title, type, progress } = item;

  const showInfoByType = () => {
    switch (type) {
      case "Movie":
        return (
          <p className="text-gray-600 text-sm">
            Progress: {formatTime(progress.time)}
          </p>
        );
      case "Series":
        return (
          <p className="text-gray-600 text-sm">
            Season {progress.season}, Episode {progress.episode}
            {progress.time && ` | Time: ${formatTime(progress.time)}`}
          </p>
        );
      case "Other":
        return (
          <p className="text-gray-600 text-sm">
            Video #{progress.videoNumber}
            {progress.time && ` | Time: ${formatTime(progress.time)}`}
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <div
      id={item.id}
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
    >
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-600 text-sm">Type: {type}</p>
      <div>{showInfoByType()}</div>
      <button
        className="mt-3 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
        onClick={() => onUpdateItem(item)}
      >
        Update Progress
      </button>
    </div>
  );
}
