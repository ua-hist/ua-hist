import "leaflet/dist/leaflet.css";
import "leaflet";
import "./App.scss";
import { Navbar } from "./components/Navbar";
import { Main } from "./components/Main";

function App() {
  return (
    <div>
      <Navbar />
      <Main />
    </div>
  );
}

export default App;
