import { MapContainer, TileLayer } from "react-leaflet";

export function MapSection() {
  return (
    <div className="map_wrapper" style={{ height: "100vh" }}>
      <MapContainer
        style={{ height: "100vh" }}
        center={[50.4504, 30.5245]}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}
