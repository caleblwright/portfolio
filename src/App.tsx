import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import { useAuth } from "./context/authContext";
import NavBar from "./components/navBar";
import ForeclosureProject from "./pages/foreclosure";
import Register from "./pages/register";

export default function App() {
  const { user, loading } = useAuth();

  // Wait for Firebase to load user state
  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={<Navigate to={user ? "/dashboard" : "/login"} />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/projects/foreclosure"
          element={user ? <ForeclosureProject /> : <Navigate to="/login" />}
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}
