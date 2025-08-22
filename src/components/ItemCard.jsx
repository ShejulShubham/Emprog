export default function ItemCard({ item }) {
  const { title, type, progress } = item;
  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "10px",
      width: "200px",
      backgroundColor: "#f9f9f9"
    }}>
      <h2 style={{ fontSize: "18px", margin: "0 0 5px" }}>{title}</h2>
      <p style={{ margin: "5px 0" }}>Type: {type}</p>
      <p style={{ margin: "5px 0" }}>Progress: {progress}</p>
    </div>
  );
}
