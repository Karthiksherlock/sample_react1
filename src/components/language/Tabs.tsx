type Props = {
  languages: string[];
  selectedLanguage: string;
  onSelect: (lang: string) => void;
};

function Tabs({ languages, selectedLanguage, onSelect }: Props) {
  return (
    <div>
      {languages.map((lang) => (
        <button
          key={lang}
          className={selectedLanguage === lang ? "active-tab" : "tab"}
          onClick={() => onSelect(lang)}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}

export default Tabs;