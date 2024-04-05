import "leaflet/dist/leaflet.css";
import "leaflet";
import "./App.scss";
import { Main } from "./components/Main";
import { DateProvider } from "./components/date/DateProvider";
import { SettingsProvider } from "./components/settings/SettingsProvider";
import { AuthProvider } from "./components/auth/AuthProvider";

function App() {
  return (
    <div>
      <SettingsProvider>
        <AuthProvider>
          <DateProvider>
            <Main />
          </DateProvider>
        </AuthProvider>
      </SettingsProvider>
    </div>
  );
}

export default App;
