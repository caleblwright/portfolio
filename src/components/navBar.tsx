import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function NavBar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-blue-600 text-white">
      <Link to="/" className="text-xl font-bold">
        Caleb Wright
      </Link>
      {user && (
        <div className="flex gap-4 items-center">
          <Link to="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <div className="relative group">
            <span className="hover:underline cursor-pointer">Projects</span>
            <div className="absolute hidden bg-white text-black p-2 rounded shadow group-hover:block top-6 left-0 z-10">
              <Link to="/projects/foreclosure" className="block px-2 py-1 hover:bg-gray-100">
                Foreclosure Scraper
              </Link>
              {/* More projects later! */}
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-red-500 rounded hover:bg-red-600"
          >
            Log Out
          </button>
        </div>
      )}
    </nav>
  );
}
