import "leaflet/dist/leaflet.css";
import "leaflet";
import "./App.scss";
import { Main } from "./components/Main";
import { DateProvider } from "./components/date/DateProvider";
import { SettingsProvider } from "./components/settings/SettingsProvider";

function App() {
  return (
    <div>
      <SettingsProvider>
        <DateProvider>
          <Main />
        </DateProvider>
      </SettingsProvider>
    </div>
  );
}

export default App;
