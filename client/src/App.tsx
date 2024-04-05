import "leaflet/dist/leaflet.css";
import "leaflet";
import "./App.scss";
import { Main } from "./components/Main";
import { DateProvider } from "./components/date/DateProvider";
import { SettingsProvider } from "./components/settings/SettingsProvider";
import { AuthProvider } from "./components/auth/AuthProvider";
import { Toaster } from "@/components/ui/sonner";

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
      <Toaster />
    </div>
  );
}

export default App;
