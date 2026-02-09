import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const AccessContext = createContext(null);
const BUILD_ACCESS_MODE = import.meta.env.VITE_ACCESS_MODE || "full";
const UNLOCK_SECRET = "family2024";
const UNLOCK_STORAGE_KEY = "nz-trip-unlocked";

export function AccessProvider({ children }) {
  const [searchParams] = useSearchParams();
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const unlockParam = searchParams.get("unlock");
    if (unlockParam === UNLOCK_SECRET) {
      setIsUnlocked(true);
      localStorage.setItem(UNLOCK_STORAGE_KEY, "true");
      return;
    }
    if (localStorage.getItem(UNLOCK_STORAGE_KEY) === "true") {
      setIsUnlocked(true);
    }
  }, [searchParams]);

  const value = useMemo(() => ({
    hasFullAccess: BUILD_ACCESS_MODE === "full" || isUnlocked,
    isPublicBuild: BUILD_ACCESS_MODE === "public",
  }), [isUnlocked]);

  return (
    <AccessContext.Provider value={value}>
      {children}
    </AccessContext.Provider>
  );
}

export function useAccess() {
  const context = useContext(AccessContext);
  if (!context) throw new Error("useAccess must be used within AccessProvider");
  return context;
}
