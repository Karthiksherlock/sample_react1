type Props = {
  languages: any[];
  selectedLanguage: string;
  onSelect: (name: string) => void;
};

function Tabs({ languages, selectedLanguage, onSelect }: Props) {
  return (
    <div className="tabs">
      {languages.map((lang) => (
        <div
          key={lang.name}
          className={`tab ${selectedLanguage === lang.name ? "active" : ""}`}
          onClick={() => onSelect(lang.name)}
        >
          {lang.name}
        </div>
      ))}
    </div>
  );
}

export default Tabs;