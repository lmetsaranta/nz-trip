import { Polyline } from "react-leaflet";
import { getTrailPositions } from "../utils/interpolate";

const ROUTE_STYLES = {
  fly: { color: "#10B981", weight: 3, dashArray: null, opacity: 0.9 },
  drive: { color: "#34D399", weight: 3, dashArray: "10, 8", opacity: 0.85 },
  hike: { color: "#6EE7B7", weight: 2.5, dashArray: "4, 6", opacity: 0.85 },
  ferry: { color: "#0ea5e9", weight: 2.5, dashArray: null, opacity: 0.8 },
  bike: { color: "#f59e0b", weight: 2.5, dashArray: "6, 4", opacity: 0.85 },
  canoeing: { color: "#14b8a6", weight: 2.5, dashArray: "5, 5", opacity: 0.85 },
  rafting: { color: "#8b5cf6", weight: 2.5, dashArray: "6, 4", opacity: 0.85 },
  surfing: { color: "#ec4899", weight: 2.5, dashArray: "3, 3", opacity: 0.85 },
  spa: { color: "#f472b6", weight: 2, dashArray: "2, 4", opacity: 0.8 },
};

function RoutePolyline({ route, trailProgress }) {
  if (!route.waypoints || route.waypoints.length < 2) return null;

  const style = ROUTE_STYLES[route.mode] || ROUTE_STYLES.drive;

  if (trailProgress !== undefined) {
    const positions = getTrailPositions(route.waypoints, trailProgress);
    if (positions.length < 2) return null;
    return <Polyline positions={positions} pathOptions={style} />;
  }

  return <Polyline positions={route.waypoints} pathOptions={style} />;
}

export default RoutePolyline;
