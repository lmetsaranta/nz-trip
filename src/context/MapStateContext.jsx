import { createContext, useContext, useState, useCallback } from "react";

const MapStateContext = createContext(null);

const DEFAULT_STATE = {
  currentDay: 1,
  isPlaying: false,
  speedMultiplier: 1,
  theme: "dark",
  showStats: false,
  showWeather: true,  // Weather panel open by default
  showGallery: false,
  mapView: null, // { center: [lat, lng], zoom: number }
  initialZoomDone: false,
  showOnboarding: false,
};

export function MapStateProvider({ children }) {
  const [state, setState] = useState(DEFAULT_STATE);

  const updateState = useCallback((updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const saveMapView = useCallback((center, zoom) => {
    setState((prev) => ({ ...prev, mapView: { center, zoom } }));
  }, []);

  return (
    <MapStateContext.Provider value={{ state, updateState, saveMapView }}>
      {children}
    </MapStateContext.Provider>
  );
}

export function useMapState() {
  const context = useContext(MapStateContext);
  if (!context) {
    throw new Error("useMapState must be used within a MapStateProvider");
  }
  return context;
}
