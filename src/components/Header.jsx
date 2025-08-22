import NavBar from "./NavBar";

export default function Header() {
  return (
    <header>
      <NavBar />
      <div className="bg-gray-100 text-gray-800 p-6 shadow-sm">
        <h1 className="text-2xl font-bold">Your Watchlist</h1>
        <p className="text-gray-600">Track your shows, movies, and more.</p>
      </div>
    </header>
  );
}
