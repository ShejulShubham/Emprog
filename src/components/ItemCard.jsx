export default function ItemCard({ item }) {
  const { title, type, progress } = item;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-600 text-sm">Type: {type}</p>
      <p className="text-gray-700 mt-1 font-medium">Progress: {progress}</p>
      <button className="mt-3 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
        Update Progress
      </button>
    </div>
  );
}
