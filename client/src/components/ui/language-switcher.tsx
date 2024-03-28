import React from 'react';
import { useTranslation } from 'react-i18next';
import UKFlag from '../../assets/united-kingdom.png'; // Import SVG for UK flag
import UAFlag from '../../assets/ua_icon.png'; // Import SVG for Ukraine flag

const LanguageSwitcher: React.FC = () => {
  
    const { t, i18n } = useTranslation();
  
    const changeLanguage = (language: string) => {
      i18n.changeLanguage(language);
    };
  
    return (
      <div className="language-switcher">
        <select
          value={i18n.language}
          onChange={(e) => changeLanguage(e.target.value)}
        >
          <option value="en" style={{ backgroundImage: `url(${UKFlag})`, paddingLeft: '30px', backgroundRepeat: 'no-repeat' }}>{t('languageSwitcher.english.title')}</option>
          <option value="ua" style={{ backgroundImage: `url(${UAFlag})`, paddingLeft: '30px', backgroundRepeat: 'no-repeat' }}>{t('languageSwitcher.ukrainian.title')}</option>
        </select>
      </div>
    );
  };
export { LanguageSwitcher };
