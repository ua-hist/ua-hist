import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const locales = ["en", "ua"];

const localeDict: Record<string, string> = {
  en: "languageSwitcher.english.title",
  ua: "languageSwitcher.ukrainian.title",
};

export function LangControl() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="flex flex-row justify-between align-center">
      <div className="flex flex-row justify-center items-center">
        <div className="font-medium">Language</div>
      </div>

      <Select
        defaultValue={i18n.language}
        onValueChange={(v) => changeLanguage(v)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {locales.map((locale) => (
            <SelectItem key={locale} value={locale}>
              {t(localeDict[locale])}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
