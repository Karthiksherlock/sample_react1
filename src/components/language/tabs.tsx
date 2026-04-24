type Language = {
  code: string;
  name: string;
};

type TabsProps = {
  languages: Language[];
  selectedLanguage: string;
  onSelect: (code: string) => void;
};

function Tabs({ languages, selectedLanguage, onSelect }: TabsProps) {
  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onSelect(lang.code)}
          style={{
            padding: "8px 16px",
            background:
              selectedLanguage === lang.code ? "#ff6b00" : "#eee",
            color: selectedLanguage === lang.code ? "#fff" : "#000",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {lang.name}
        </button>
      ))}
    </div>
  );
}

export default Tabs;