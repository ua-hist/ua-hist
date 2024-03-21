import App from "./App";
import { DateProvider } from "./components/date/DateProvider";
import { SettingsProvider } from "./components/settings/SettingsProvider";

export function App1() {
  return (
    <SettingsProvider>
      <DateProvider>
        <App />
      </DateProvider>
    </SettingsProvider>
  );
}
