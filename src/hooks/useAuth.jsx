import { useCallback, useEffect, useState } from "react";
import { getToken, removeToken } from "../lib/lib";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check token on mount
  useEffect(() => {
    setIsAuthenticated(!!getToken());
  }, []);
  console.log(!!getToken);

  const logout = useCallback(() => {
    removeToken();
    setIsAuthenticated(false);
  }, []);

  return {
    isAuthenticated,
    logout,
  };
}
