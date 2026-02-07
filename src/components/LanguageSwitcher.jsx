import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "fi" ? "en" : "fi";
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      className="trip-nav__btn trip-nav__lang"
      onClick={toggleLanguage}
      title={i18n.language === "fi" ? "Switch to English" : "Vaihda suomeksi"}
    >
      {i18n.language === "fi" ? "EN" : "FI"}
    </button>
  );
}

export default LanguageSwitcher;
