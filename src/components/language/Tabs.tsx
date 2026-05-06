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
          onClick={() => onSelect(lang)}
        >
          {lang} {selectedLanguage === lang ? "(Selected)" : ""}
        </button>
      ))}
    </div>
  );
}

export default Tabs;