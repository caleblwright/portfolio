// src/pages/Dashboard.tsx
import { useAuth } from "../context/authContext";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  useEffect(() => {
    document.title = "Caleb Wright's Portfolio | Dashboard";
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-20 text-center">
      <h1 className="mb-4 text-3xl font-bold text-blue-700">
        Welcome to your Dashboard!
      </h1>
      <p className="mb-6 text-lg text-gray-700">
        Logged in as: <span className="font-semibold">{user?.email}</span>
      </p>
      <button
        onClick={handleLogout}
        className="px-4 py-2 text-white transition bg-red-600 rounded-md hover:bg-red-700"
      >
        Log Out
      </button>
    </div>
  );
}
