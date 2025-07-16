import { useEffect, useState } from "react";
import axios from "axios";


export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:2707/auth/check", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200 && res.data.authenticated) {
          setIsAuthenticated(true);
          setUser(res.data.user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      })
      .catch((err) => {
        // 👇 Handle 401 or connection issues gracefully
        console.warn("auth check failed:", err?.response?.status);
        setIsAuthenticated(false);
        setUser(null);
      })
      .finally(() => {
        setLoading(false); // ✅ Important: set loading to false when done
      });
  }, []);

  return {isAuthenticated, user, loading};
}
