import "../styles/Home.css";
import ItemCard from "../components/ItemCard";
import { tempItems } from "../data/tempItems";

export default function Home() {
  return (
    <div className="home-container">
      <div className="items-grid">
        {tempItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
  