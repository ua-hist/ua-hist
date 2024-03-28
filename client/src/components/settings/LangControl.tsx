import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useSettingsContext } from "./SettingsContext";

const locales = ["en", "ua"];

const localeDict: Record<string, string> = {
  en: "English",
  ua: "Ukrainian",
};

export function LangControl() {
  const { settings, setSetting } = useSettingsContext();

  return (
    <div className="flex flex-row justify-between align-center">
      <div className="flex flex-row justify-center items-center">
        <div className="font-medium">Language</div>
      </div>

      <Select
        defaultValue={settings.locale}
        onValueChange={(v) => setSetting("locale", v)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {locales.map((locale) => (
            <SelectItem key={locale} value={locale}>
              {localeDict[locale]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
