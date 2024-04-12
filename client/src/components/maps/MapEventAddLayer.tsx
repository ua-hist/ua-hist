import { useMap, useMapEvent } from "react-leaflet";
import { useCoordinatesStore } from "../../store/coordinates";
import { useEffect, useRef } from "react";
import L from "leaflet";

export function MapEventAddLayer() {
  const setCoordinates = useCoordinatesStore((state) => state.setCoordinates);
  const coordinates = useCoordinatesStore((state) => state.coordinates);
  const isActive = useCoordinatesStore((state) => state.isActive);
  const setIsActive = useCoordinatesStore((state) => state.setIsActive);
  const map = useMap();
  const layerRef = useRef<L.Marker>();

  useMapEvent("click", (e) => {
    if (!isActive) {
      return;
    }
    setCoordinates({
      lat: e.latlng.lat,
      lng: e.latlng.lng,
    });
  });

  useEffect(() => {
    if (layerRef.current) {
      map.removeLayer(layerRef.current);
    }

    if (coordinates.lat === 0 && coordinates.lng === 0) {
      return;
    }
    const cir = L.marker({
      lat: coordinates.lat,
      lng: coordinates.lng,
    });

    layerRef.current = cir;

    cir.bindPopup("foo");

    cir.bindTooltip("bar", {
      className: "leaflet_tooltip",
      direction: "right",
      offset: [5, 8],
      opacity: 1,
      permanent: true,
    });

    cir.addTo(map);
  }, [map, coordinates]);

  return <></>;
}
