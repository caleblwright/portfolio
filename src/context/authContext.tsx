import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../lib/firebase.ts";

// 1️⃣ Define the shape of our context
interface AuthContextType {
  user: User | null;
  loading: boolean;
}

// 2️⃣ Create context (default is null user)
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

// 3️⃣ Context provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Firebase listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// 4️⃣ Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
