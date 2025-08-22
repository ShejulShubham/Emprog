import ItemCard from "../components/ItemCard";

const items = [
  { id: 1, title: "Breaking Bad", type: "Show", progress: "S2E3" },
  { id: 2, title: "Avengers Endgame", type: "Movie", progress: "01:45:00" }
];

export default function Home() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>Your Watchlist</h1>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
