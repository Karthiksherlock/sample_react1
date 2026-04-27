import { Globe } from "lucide-react";

type Language = {
  name: string;
  iana_code: string;
  iso_code: string;
  font_family: string;
  font_url: string;
};

export interface TabItem {
  iana: string;
  name: string;
  count: number;
}

interface TabsProps {
  languages: Language[];
  selectedLanguage: string;
  onSelect: (name: string) => void;
}

export default function Tabs({ languages, selectedLanguage, onSelect }: TabsProps) {
  return (
    <div className="lp-tabs" role="tablist">
      {languages.map((lang) => {
        const active = lang.name === selectedLanguage;
        return (
          <button
            key={lang.iana_code}
            role="tab"
            aria-selected={active}
            className={`lp-tab ${active ? "lp-tab--active" : ""}`}
            onClick={() => onSelect(lang.name)}
          >
            <Globe size={16} />
            <span>{lang.name}</span>
            <span className="lp-tab__badge">0</span>
          </button>
        );
      })}
    </div>
  );
}
