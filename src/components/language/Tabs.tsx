type TabsProps = {
  languages: string[];
  selected: string;
  onChange: (lang: string) => void;
};

function Tabs({ languages, selected, onChange }: TabsProps) {
  return (
    <div>
      {languages.map((lang) => (
        <button key={lang} onClick={() => onChange(lang)}>
          {lang} {selected === lang ? "(Active)" : ""}
        </button>
      ))}
    </div>
  );
}

export default Tabs;