type Props = {
  languages: string[];
  languagesData: any;
  selectedLanguage: string;
  onSelect: (language: string) => void;
};

function Tabs({ languages, languagesData, selectedLanguage, onSelect }: Props) {
  return (
    <div>
      {languages.map((lang) => {
        const totalKeys = Object.keys(
          languagesData[lang]?.micro_copies || {},
        ).length;
        return (
          <button
            key={lang}
            className={selectedLanguage === lang ? "activeTab" : "tab"}
            onClick={() => onSelect(lang)}
          >
            {lang}
            <span className="tabBadge">{totalKeys}</span>
          </button>
        );
      })}
    </div>
  );
}

export default Tabs;
