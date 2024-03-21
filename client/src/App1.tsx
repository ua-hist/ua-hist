import App from "./App";
import { SettingsProvider } from "./components/settings/SettingsProvider";

export function App1() {
  return (
    <SettingsProvider>
      <App />
    </SettingsProvider>
  );
}
