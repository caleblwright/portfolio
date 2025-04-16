// src/pages/Login.tsx
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";
import Input from "../components/input";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Caleb Wright's Portfolio | Login";
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md p-8 mx-auto mt-20 bg-white shadow-md rounded-xl">
      <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">
        Login / Register
      </h2>
      <Input
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      <div className="flex flex-col gap-3">
        <button
          onClick={handleLogin}
          disabled={loading}
          className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </div>
      <p className="mt-4 text-sm text-center text-gray-600">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-600 underline">
          Sign up here
        </Link>
      </p>
    </div>
  );
}
