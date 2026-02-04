import { Polyline } from "react-leaflet";
import StopMarker from "./StopMarker";

function RoutePolyline({ route }) {
  return (
    <>
      <Polyline
        positions={route.waypoints}
        pathOptions={{
          color: "#3b82f6",
          weight: 3,
          dashArray: "10, 8",
          opacity: 0.8,
        }}
      />
      {route.vehicleMarker && <StopMarker stop={route.vehicleMarker} />}
    </>
  );
}

export default RoutePolyline;
