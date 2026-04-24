import { useState } from "react";
import Header from "../components/language/header";
import Tabs from "../components/language/tabs";
import MicroCopyItem from "../components/language/MicroCopyItem";
import AddLanguageModal from "../components/language/AddLanguageModal";
import "./LanguagePage.css";

type LanguageConfig = {
  name: string;
  iana_code: string;
  iso_code: string;
  font_family: string;
  font_url: string;
  micro_copies: Record<string, string>;
};

type LanguageRecord = Record<string, LanguageConfig>;

function LanguagePage() {
  const [languages, setLanguages] = useState<LanguageRecord>({
    English: {
      name: "English",
      iana_code: "en",
      iso_code: "en",
      font_family: "Noto Sans",
      font_url: "https://fonts.googleapis.com/css?family=Noto+Sans",
      micro_copies: {
        WelcomeText: "Welcome",
        GeneralContinue: "Continue",
      },
    },
  });

  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [showDetails, setShowDetails] = useState(true);

  const currentLanguage = languages[selectedLanguage];

  const handleMicroCopyChange = (
    oldKey: string,
    newKey: string,
    newValue: string
  ) => {
    setLanguages((prev) => {
      const language = prev[selectedLanguage];
      const updated = { ...language.micro_copies };

      if (oldKey !== newKey) delete updated[oldKey];
      updated[newKey] = newValue;

      return {
        ...prev,
        [selectedLanguage]: {
          ...language,
          micro_copies: updated,
        },
      };
    });
  };

  const handleAdd = () => {
    const tempKey = "key_" + Date.now();

    setLanguages((prev) => {
      const language = prev[selectedLanguage];

      return {
        ...prev,
        [selectedLanguage]: {
          ...language,
          micro_copies: {
            ...language.micro_copies,
            [tempKey]: "",
          },
        },
      };
    });
  };

  const handleDelete = (key: string) => {
    setLanguages((prev) => {
      const language = prev[selectedLanguage];
      const updated = { ...language.micro_copies };
      delete updated[key];

      return {
        ...prev,
        [selectedLanguage]: {
          ...language,
          micro_copies: updated,
        },
      };
    });
  };

  const handleAddLanguage = (lang: Omit<LanguageConfig, "micro_copies">) => {
    setLanguages((prev) => ({
      ...prev,
      [lang.name]: {
        ...lang,
        micro_copies: {},
      },
    }));

    setSelectedLanguage(lang.name);
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(languages, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "languages.json";
    a.click();
  };

  const handleSave = () => {
    localStorage.setItem("languages", JSON.stringify(languages));
    alert("Saved locally");
  };

  return (
    <div className="page">
      <Header
        onAddLanguage={() => setShowModal(true)}
        onExport={handleExport}
        onSave={handleSave}
      />

      <Tabs
        languages={Object.values(languages).map((lang) => ({
          code: lang.name,
          name: lang.name,
        }))}
        selectedLanguage={selectedLanguage}
        onSelect={setSelectedLanguage}
      />

      <div className="details">
        <div className="details-header" onClick={() => setShowDetails(!showDetails)}>
          <h3>Language details</h3>
          <span>{showDetails ? "▲" : "▼"}</span>
        </div>

        {showDetails && (
          <div className="details-box">
            <input value={currentLanguage.name} readOnly />
            <input value={currentLanguage.iana_code} readOnly />
            <input value={currentLanguage.iso_code} readOnly />
            <input value={currentLanguage.font_family} readOnly />
            <input value={currentLanguage.font_url} readOnly />
          </div>
        )}
      </div>

      <div className="micro-header">
        <h3>
          Micro-copies
          <span className="badge">
            {Object.keys(currentLanguage.micro_copies).length} keys
          </span>
        </h3>

        <div className="micro-actions">
          <input
            placeholder="Search keys..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button onClick={handleAdd}>+ Add micro-copy</button>
        </div>
      </div>

      <div className="list">
        {Object.entries(currentLanguage.micro_copies)
          .filter(([key]) =>
            key.toLowerCase().includes(search.toLowerCase())
          )
          .map(([key, value]) => (
            <MicroCopyItem
              key={key}
              item={{ key, value }}
              onChange={handleMicroCopyChange}
              onDelete={handleDelete}
            />
          ))}
      </div>

      {showModal && (
        <AddLanguageModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddLanguage}
        />
      )}
    </div>
  );
}

export default LanguagePage;