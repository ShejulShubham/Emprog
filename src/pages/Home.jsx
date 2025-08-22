import "../styles/Home.css";
import ItemCard from "../components/ItemCard";
import { tempItems } from "../data/tempItems";
import { usePageTitle } from "../hooks/usePageTitle"

export default function Home() {

  usePageTitle("Home");
  
  return (
    <div className="home-container">
      <div className="bg-gray-100 text-gray-800 p-6 shadow-sm">
        <h1 className="text-2xl font-bold">Your Watchlist</h1>
        <p className="text-gray-600">Track your shows, movies, and more.</p>
      </div>
      <div className="items-grid">
        {tempItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
