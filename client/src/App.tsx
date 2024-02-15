import "leaflet/dist/leaflet.css";
import "leaflet";
import "./App.scss";
import { MapSection } from "./components/MapSection";

function App() {
  return (
    <div className="main">
      <div className="map">
        <MapSection />
      </div>
    </div>
  );
}

export default App;
