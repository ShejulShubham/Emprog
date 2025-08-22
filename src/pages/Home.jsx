import "../styles/Home.css";
import ItemCard from "../components/ItemCard";
import { tempItems } from "../data/tempItems";
import { usePageTitle } from "../hooks/usePageTitle";
import { useModal } from "../context/modalContext";
import AddItemForm from "../components/AddItem";

export default function Home() {
  usePageTitle("Home");

  const { openModal } = useModal();

  return (
    <div className="home-container">
      <div className="bg-gray-100 text-gray-800 p-6 shadow-sm flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Your Watchlist</h1>
          <p className="text-gray-600">Track your shows, movies, and more.</p>
        </div>
        <button
          className="bg-gray-600 text-white p-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          onClick={() => openModal(<AddItemForm />)}
        >
          Add Item
        </button>
      </div>
      <div className="items-grid">
        {tempItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
